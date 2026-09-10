/**
 * useRealtime 文档元数据
 */
import type { ComponentDoc } from '../docs/types'

/** useRealtime 文档 */
export const useRealtimeDoc: ComponentDoc = {
  name: 'useRealtime',
  titleZh: '实时推送',
  kind: 'composable',
  description: '监控 WebSocket：同 URL 复用连接、指数退避重连、心跳；卸载时清理订阅。',
  params: [
    { name: 'options.url', type: 'string', required: true, description: 'WebSocket 地址' },
    { name: 'options.token', type: 'string | (() => string | undefined)', description: '订阅鉴权；函数可在重连时刷新' },
    { name: 'options.projectId', type: 'MaybeRefOrGetter<number | null>', description: '订阅项目；空则全部' },
    { name: 'options.reconnectInterval', type: 'number', default: '3000', description: '初始重连间隔 ms' },
    { name: 'options.maxRetries', type: 'number', default: 'Infinity', description: '最大重试次数' },
  ],
  returns: [
    { name: 'status', type: "Ref<'connecting' | 'open' | 'closed' | 'error'>", description: '连接状态' },
    { name: 'connect', type: '() => void', description: '手动连接' },
    { name: 'disconnect', type: '() => void', description: '断开并清理本实例订阅' },
    { name: 'on', type: '(type, handler) => () => void', description: '订阅事件，返回取消函数' },
  ],
}
