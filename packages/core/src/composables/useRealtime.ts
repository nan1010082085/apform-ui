/**
 * useRealtime — WebSocket 连接管理（监控实时推送）
 *
 * 同 URL 复用单连接；指数退避重连；心跳。
 * 每个调用方有独立 subscription（projectId + handlers），卸载时清理。
 */
import { onUnmounted, ref, toValue, watch, type MaybeRefOrGetter, type Ref } from 'vue'

/** 实时事件类型 */
export type RealtimeEventType =
  | 'event:new'
  | 'alert:triggered'
  | 'alert:resolved'
  | 'health:change'

/** 实时消息 */
export interface RealtimeMessage {
  type: RealtimeEventType
  project_id: number
  data: unknown
  ts: string
}

/** useRealtime 选项 */
export interface UseRealtimeOptions {
  /** WebSocket 地址 */
  url: string
  /** 订阅鉴权 token；函数形式可在重连时重新读取 */
  token?: string | (() => string | undefined)
  /** 订阅项目，空则全部 */
  projectId?: MaybeRefOrGetter<number | null | undefined>
  /** 初始重连间隔 ms */
  reconnectInterval?: number
  /** 最大重试次数 */
  maxRetries?: number
}

/** useRealtime 返回值 */
export interface UseRealtimeReturn {
  status: Ref<'connecting' | 'open' | 'closed' | 'error'>
  connect: () => void
  disconnect: () => void
  on: <T = unknown>(type: RealtimeEventType, handler: (data: T) => void) => () => void
}

type HandlerEntry = {
  getProjectId: () => number | null | undefined
  handler: (data: unknown) => void
}

type SharedSocket = {
  ws: WebSocket | null
  status: Ref<'connecting' | 'open' | 'closed' | 'error'>
  refCount: number
  /** type → 带 project 过滤的订阅集合 */
  handlers: Map<RealtimeEventType, Set<HandlerEntry>>
  /** 本连接已向服务端 subscribe 的 projectId 集合 */
  subscribedProjects: Set<number | null>
  reconnectTimer: ReturnType<typeof setTimeout> | null
  pingTimer: ReturnType<typeof setInterval> | null
  pongTimer: ReturnType<typeof setTimeout> | null
  retries: number
  reconnectInterval: number
  maxRetries: number
  intentionalClose: boolean
  token?: string | (() => string | undefined)
}

const sockets = new Map<string, SharedSocket>()

/**
 * 创建 / 复用 WebSocket 连接
 */
export function useRealtime(options: UseRealtimeOptions): UseRealtimeReturn {
  const {
    url,
    token,
    projectId,
    reconnectInterval = 3000,
    maxRetries = Infinity,
  } = options

  let shared = sockets.get(url)
  if (!shared) {
    shared = {
      ws: null,
      status: ref('closed'),
      refCount: 0,
      handlers: new Map(),
      subscribedProjects: new Set(),
      reconnectTimer: null,
      pingTimer: null,
      pongTimer: null,
      retries: 0,
      reconnectInterval,
      maxRetries,
      intentionalClose: false,
      token,
    }
    sockets.set(url, shared)
  }
  shared.refCount += 1
  shared.reconnectInterval = reconnectInterval
  shared.maxRetries = maxRetries
  shared.token = token

  /** 本实例注册的 handler，卸载时全部移除 */
  const localEntries: HandlerEntry[] = []
  const status = shared.status
  const currentProjectId = () => toValue(projectId)

  /**
   * 清理心跳
   */
  function clearHeartbeat() {
    if (!shared) return
    if (shared.pingTimer) clearInterval(shared.pingTimer)
    if (shared.pongTimer) clearTimeout(shared.pongTimer)
    shared.pingTimer = null
    shared.pongTimer = null
  }

  /**
   * 启动心跳：30s ping，60s 无 pong 断线
   */
  function startHeartbeat() {
    if (!shared) return
    clearHeartbeat()
    shared.pingTimer = setInterval(() => {
      if (!shared?.ws || shared.ws.readyState !== WebSocket.OPEN) return
      shared.ws.send(JSON.stringify({ action: 'ping' }))
      if (shared.pongTimer) clearTimeout(shared.pongTimer)
      shared.pongTimer = setTimeout(() => {
        shared?.ws?.close()
      }, 60_000)
    }, 30_000)
  }

  /**
   * 安排重连（指数退避 3→6→12→30s 封顶）
   */
  function scheduleReconnect() {
    if (!shared || shared.intentionalClose) return
    if (shared.retries >= shared.maxRetries) {
      shared.status.value = 'error'
      return
    }
    const delay = Math.min(
      shared.reconnectInterval * 2 ** shared.retries,
      30_000,
    )
    shared.retries += 1
    if (shared.reconnectTimer) clearTimeout(shared.reconnectTimer)
    shared.reconnectTimer = setTimeout(() => {
      connect()
    }, delay)
  }

  /**
   * 向服务端订阅本实例 project（可多 project 并存）
   */
  function sendSubscribe(pid?: number | null) {
    if (!shared?.ws || shared.ws.readyState !== WebSocket.OPEN) return
    const payload: { action: string; project_id: number | null; token?: string } = {
      action: 'subscribe',
      project_id: pid ?? null,
    }
    const authToken = typeof shared.token === 'function' ? shared.token() : shared.token
    if (authToken) payload.token = authToken
    if (shared.subscribedProjects.has(pid ?? null)) return
    if (pid == null) {
      shared.ws.send(JSON.stringify(payload))
      shared.subscribedProjects.add(null)
      return
    }
    shared.ws.send(JSON.stringify(payload))
    shared.subscribedProjects.add(pid)
  }

  /**
   * 重连后恢复全部已登记 project 订阅
   */
  function resubscribeAll() {
    if (!shared) return
    shared.subscribedProjects.clear()
    const pids = new Set<number>()
    let hasWildcard = false
    for (const set of shared.handlers.values()) {
      for (const entry of set) {
        const pid = entry.getProjectId()
        if (pid == null) hasWildcard = true
        else pids.add(pid)
      }
    }
    const currentPid = currentProjectId()
    if (currentPid == null) hasWildcard = true
    else pids.add(currentPid)
    if (hasWildcard) sendSubscribe(undefined)
    for (const pid of pids) sendSubscribe(pid)
  }

  /**
   * 分发：按订阅者各自的 projectId 过滤
   */
  function dispatch(msg: RealtimeMessage) {
    if (!shared) return
    const set = shared.handlers.get(msg.type)
    if (!set) return
    for (const entry of set) {
      const entryProjectId = entry.getProjectId()
      if (entryProjectId != null && entryProjectId !== msg.project_id) continue
      entry.handler(msg.data)
    }
  }

  /**
   * 连接
   */
  function connect() {
    if (!shared) return
    if (
      shared.ws &&
      (shared.ws.readyState === WebSocket.OPEN ||
        shared.ws.readyState === WebSocket.CONNECTING)
    ) {
      if (shared.ws.readyState === WebSocket.OPEN) {
        sendSubscribe(currentProjectId())
      }
      return
    }
    shared.intentionalClose = false
    shared.status.value = 'connecting'
    const ws = new WebSocket(url)
    shared.ws = ws

    ws.onopen = () => {
      if (!shared) return
      shared.status.value = 'open'
      shared.retries = 0
      startHeartbeat()
      resubscribeAll()
    }

    ws.onmessage = (ev) => {
      if (!shared) return
      try {
        const raw = JSON.parse(String(ev.data)) as Record<string, unknown>
        if (raw.action === 'pong' || raw.type === 'pong') {
          if (shared.pongTimer) clearTimeout(shared.pongTimer)
          shared.pongTimer = null
          return
        }
        if (typeof raw.type === 'string') {
          dispatch(raw as unknown as RealtimeMessage)
        }
      } catch {
        /* 忽略非 JSON */
      }
    }

    ws.onerror = () => {
      if (!shared) return
      shared.status.value = 'error'
    }

    ws.onclose = () => {
      if (!shared) return
      clearHeartbeat()
      shared.ws = null
      shared.subscribedProjects.clear()
      if (!shared.intentionalClose) {
        shared.status.value = 'closed'
        scheduleReconnect()
      } else {
        shared.status.value = 'closed'
      }
    }
  }

  /**
   * 清理本实例全部 handler
   */
  function clearLocalHandlers() {
    if (!shared) return
    for (const entry of localEntries) {
      for (const set of shared.handlers.values()) {
        set.delete(entry)
      }
    }
    localEntries.length = 0
  }

  /**
   * 断开（清理本实例订阅；无其它消费者时关闭连接）
   */
  function disconnect() {
    if (!shared) return
    clearLocalHandlers()
    shared.refCount = Math.max(0, shared.refCount - 1)
    if (shared.refCount > 0) return
    shared.intentionalClose = true
    if (shared.reconnectTimer) clearTimeout(shared.reconnectTimer)
    clearHeartbeat()
    shared.ws?.close()
    shared.ws = null
    shared.status.value = 'closed'
    sockets.delete(url)
    shared = undefined
  }

  /**
   * 订阅事件，返回取消函数
   */
  function on<T = unknown>(
    type: RealtimeEventType,
    handler: (data: T) => void,
  ): () => void {
    if (!shared) return () => {}
    let set = shared.handlers.get(type)
    if (!set) {
      set = new Set()
      shared.handlers.set(type, set)
    }
    const entry: HandlerEntry = {
      getProjectId: currentProjectId,
      handler: handler as (data: unknown) => void,
    }
    set.add(entry)
    localEntries.push(entry)
    if (shared.ws?.readyState === WebSocket.OPEN) {
      sendSubscribe(currentProjectId())
    }
    return () => {
      set?.delete(entry)
      const idx = localEntries.indexOf(entry)
      if (idx >= 0) localEntries.splice(idx, 1)
    }
  }

  connect()

  watch(currentProjectId, (projectId) => {
    if (shared?.ws?.readyState === WebSocket.OPEN) {
      sendSubscribe(projectId)
    }
  })

  onUnmounted(() => {
    disconnect()
  })

  return { status, connect, disconnect, on }
}
