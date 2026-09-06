<script setup lang="ts">
/**
 * LogStream — 日志/事件流（自实现虚拟滚动）
 *
 * 列表约定：新到旧（index 0 = 最新）。
 * - autoScroll=true：新日志 unshift 后滚到顶部
 * - autoScroll=false：unshift 时补偿 scrollTop 保持视觉位置
 * - 加载更早：滚到底部触发 reach-bottom（历史在尾部）
 * - 展开：侧边抽屉展示 JSON，不改变虚拟行高
 */
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { EmptyState } from '../EmptyState'

/** 日志条目 */
export interface LogEntry {
  id: string | number
  timestamp: string
  level: 'debug' | 'info' | 'warn' | 'error'
  service: string
  message: string
  payload?: Record<string, unknown>
}

const props = withDefaults(
  defineProps<{
    /** 日志列表（新到旧） */
    logs: LogEntry[]
    /** 容器高度 */
    height: number
    /** 单行高度 */
    rowHeight?: number
    /** 高亮关键词 */
    highlight?: string
    /** 新数据滚到顶部（最新） */
    autoScroll?: boolean
    /** 加载态 */
    loading?: boolean
  }>(),
  {
    rowHeight: 36,
    autoScroll: false,
    loading: false,
  },
)

const emit = defineEmits<{
  'log-click': [log: LogEntry]
  /** @deprecated 兼容旧名；语义等同滚顶（最新区），请优先用 reach-bottom 加载更早 */
  'reach-top': []
  /** 滚到底部（更早历史区）时触发，用于加载更早日志 */
  'reach-bottom': []
}>()

const scrollerRef = ref<HTMLElement | null>(null)
const scrollTop = ref(0)
const expandedId = ref<string | number | null>(null)
const BUFFER = 5
let reachBottomArmed = true
let reachBottomTimer: ReturnType<typeof setTimeout> | null = null

const visibleCount = computed(
  () => Math.ceil(props.height / props.rowHeight) + BUFFER * 2,
)

const startIndex = computed(() =>
  Math.max(0, Math.floor(scrollTop.value / props.rowHeight) - BUFFER),
)

const endIndex = computed(() =>
  Math.min(props.logs.length, startIndex.value + visibleCount.value),
)

const visibleLogs = computed(() =>
  props.logs.slice(startIndex.value, endIndex.value),
)

const totalHeight = computed(() => props.logs.length * props.rowHeight)

const offsetY = computed(() => startIndex.value * props.rowHeight)

const expandedLog = computed(
  () => props.logs.find((l) => l.id === expandedId.value) ?? null,
)

const payloadText = computed(() => {
  if (!expandedLog.value?.payload) return ''
  try {
    return JSON.stringify(expandedLog.value.payload, null, 2)
  } catch {
    return String(expandedLog.value.payload)
  }
})

/**
 * 格式化时间戳列
 */
function formatTs(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

/**
 * 高亮关键词（先 escape 再 wrap，防 XSS）
 */
function highlightText(text: string): string {
  if (!props.highlight?.trim()) return escapeHtml(text)
  const q = props.highlight.trim()
  const escaped = escapeHtml(text)
  const re = new RegExp(`(${escapeRegExp(q)})`, 'gi')
  return escaped.replace(re, '<mark class="apf-log-stream__mark">$1</mark>')
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * 触发 reach-bottom（防抖 + 需离开底部再重新武装）
 */
function maybeEmitReachBottom(el: HTMLElement) {
  const distBottom = el.scrollHeight - el.scrollTop - el.clientHeight
  if (distBottom > 24) {
    reachBottomArmed = true
    return
  }
  if (!reachBottomArmed) return
  reachBottomArmed = false
  if (reachBottomTimer) clearTimeout(reachBottomTimer)
  reachBottomTimer = setTimeout(() => {
    emit('reach-bottom')
  }, 120)
}

/**
 * 滚动处理
 */
function onScroll() {
  const el = scrollerRef.value
  if (!el) return
  scrollTop.value = el.scrollTop
  if (el.scrollTop <= 4) emit('reach-top')
  maybeEmitReachBottom(el)
}

/**
 * 行点击：展开侧栏看 payload，不改变虚拟行高
 */
function onRowClick(log: LogEntry) {
  expandedId.value = expandedId.value === log.id ? null : log.id
  emit('log-click', log)
}

/**
 * 关闭展开抽屉
 */
function closeExpanded() {
  expandedId.value = null
}

watch(
  () => props.logs.length,
  async (len, prevLen) => {
    const prev = prevLen ?? 0
    const delta = len - prev
    const el = scrollerRef.value
    if (!el || delta === 0) return

    if (delta > 0) {
      // unshift 新日志在顶部
      if (props.autoScroll) {
        await nextTick()
        el.scrollTop = 0
        scrollTop.value = 0
      } else {
        // 保持当前可视内容位置
        const nextTop = el.scrollTop + delta * props.rowHeight
        el.scrollTop = nextTop
        scrollTop.value = nextTop
      }
      return
    }

    // 尾部追加更早历史：保持相对视口
    await nextTick()
    scrollTop.value = el.scrollTop
  },
)

watch(expandedId, (id) => {
  if (id == null) return
  // 若展开项滚出缓存区，仍可通过 expandedLog 从全量 logs 取 payload
})

onMounted(() => {
  scrollerRef.value?.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  scrollerRef.value?.removeEventListener('scroll', onScroll)
  if (reachBottomTimer) clearTimeout(reachBottomTimer)
})
</script>

<template>
  <div class="apf-log-stream-wrap" :style="{ height: `${height}px` }">
    <div
      ref="scrollerRef"
      class="apf-log-stream"
      :class="{ 'apf-log-stream--with-panel': !!expandedLog }"
    >
      <div v-if="loading" class="apf-log-stream__loading">加载中…</div>
      <EmptyState
        v-else-if="!logs.length"
        title="暂无日志"
        description="等待事件推送或调整筛选"
      />
      <div
        v-else
        class="apf-log-stream__phantom"
        :style="{ height: `${totalHeight}px` }"
      >
        <div
          class="apf-log-stream__window"
          :style="{ transform: `translateY(${offsetY}px)` }"
        >
          <div
            v-for="log in visibleLogs"
            :key="log.id"
            class="apf-log-stream__row"
            :class="{ 'is-active': expandedId === log.id }"
            :style="{ height: `${rowHeight}px` }"
            @click="onRowClick(log)"
          >
            <i
              class="apf-log-stream__bar"
              :class="`apf-log-stream__bar--${log.level}`"
              aria-hidden="true"
            />
            <span class="apf-log-stream__ts">{{ formatTs(log.timestamp) }}</span>
            <span
              class="apf-log-stream__level"
              :class="`apf-log-stream__level--${log.level}`"
            >
              {{ log.level }}
            </span>
            <span class="apf-log-stream__service">{{ log.service }}</span>
            <span
              class="apf-log-stream__msg"
              v-html="highlightText(log.message)"
            />
          </div>
        </div>
      </div>
    </div>

    <aside v-if="expandedLog" class="apf-log-stream__panel">
      <header class="apf-log-stream__panel-head">
        <span>Payload · {{ expandedLog.service }}</span>
        <button type="button" class="apf-log-stream__panel-close" @click="closeExpanded">
          关闭
        </button>
      </header>
      <pre v-if="payloadText" class="apf-log-stream__panel-body">{{ payloadText }}</pre>
      <div v-else class="apf-log-stream__panel-empty">无 payload</div>
    </aside>
  </div>
</template>

<style scoped>
.apf-log-stream-wrap {
  display: flex;
  gap: 0;
  border: 1px solid var(--border-color-light);
  border-radius: var(--border-radius-8);
  overflow: hidden;
  background: var(--bg-color-white);
}

.apf-log-stream {
  position: relative;
  flex: 1;
  min-width: 0;
  height: 100%;
  overflow: auto;
}

.apf-log-stream__loading {
  padding: var(--spacing-md);
  color: var(--text-color-muted);
  font-size: var(--font-size-13);
}

.apf-log-stream__phantom {
  position: relative;
  width: 100%;
}

.apf-log-stream__window {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  will-change: transform;
}

.apf-log-stream__row {
  display: grid;
  grid-template-columns: 3px 140px 50px 120px 1fr;
  align-items: center;
  gap: 8px;
  padding: 0 12px 0 0;
  border-bottom: 1px solid var(--border-color-light);
  cursor: pointer;
  box-sizing: border-box;
  overflow: hidden;
}

.apf-log-stream__row:hover,
.apf-log-stream__row.is-active {
  background: var(--bg-color-hover);
}

.apf-log-stream__bar {
  align-self: stretch;
  width: 3px;
}

.apf-log-stream__bar--debug {
  background: var(--text-color-muted);
}

.apf-log-stream__bar--info {
  background: var(--color-info);
}

.apf-log-stream__bar--warn {
  background: var(--color-warning);
}

.apf-log-stream__bar--error {
  background: var(--color-danger);
}

.apf-log-stream__ts {
  font-size: var(--font-size-12);
  font-family: var(--font-family-mono);
  color: var(--text-color-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.apf-log-stream__level {
  font-size: var(--font-size-12);
  text-transform: uppercase;
}

.apf-log-stream__level--debug {
  color: var(--text-color-muted);
}

.apf-log-stream__level--info {
  color: var(--color-info);
}

.apf-log-stream__level--warn {
  color: var(--color-warning);
}

.apf-log-stream__level--error {
  color: var(--color-danger);
}

.apf-log-stream__service {
  font-size: var(--font-size-12);
  color: var(--text-color-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.apf-log-stream__msg {
  font-size: var(--font-size-13);
  color: var(--text-color-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}

.apf-log-stream__panel {
  width: 320px;
  flex-shrink: 0;
  border-left: 1px solid var(--border-color-light);
  display: flex;
  flex-direction: column;
  background: var(--bg-color-surface);
  min-height: 0;
}

.apf-log-stream__panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 12px;
  font-size: var(--font-size-12);
  color: var(--text-color-secondary);
  border-bottom: 1px solid var(--border-color-light);
}

.apf-log-stream__panel-close {
  border: none;
  background: transparent;
  color: var(--color-primary);
  cursor: pointer;
  font-size: var(--font-size-12);
  padding: 0;
}

.apf-log-stream__panel-body {
  margin: 0;
  padding: 12px;
  overflow: auto;
  flex: 1;
  font-family: var(--font-family-mono);
  font-size: var(--font-size-12);
  line-height: 1.5;
  color: var(--text-color-primary);
  white-space: pre-wrap;
  word-break: break-word;
}

.apf-log-stream__panel-empty {
  padding: 12px;
  font-size: var(--font-size-12);
  color: var(--text-color-muted);
}

.apf-log-stream :deep(.apf-log-stream__mark) {
  background: var(--color-warning-bg);
  color: inherit;
  padding: 0 2px;
  border-radius: 2px;
}
</style>
