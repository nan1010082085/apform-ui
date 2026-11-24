/**
 * LogStream 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** LogStream 文档 */
export const LogStreamDoc: ComponentDoc = {
  name: 'LogStream',
  titleZh: '日志流',
  description:
    '虚拟高度日志列表。logs: LogEntry[]（新到旧）。大数据量注意 height/rowHeight；触底加载更早用 reach-bottom。实时推送可配合 useRealtime。',
  props: [
    { name: 'logs', type: 'LogEntry[]', required: true, description: '日志（新到旧）' },
    { name: 'height', type: 'number', required: true, description: '容器高度' },
    { name: 'rowHeight', type: 'number', default: '36', description: '行高' },
    { name: 'highlight', type: 'string', description: '高亮关键词' },
    { name: 'autoScroll', type: 'boolean', default: 'false', description: '新数据滚到最新' },
    { name: 'loading', type: 'boolean', default: 'false', description: '加载态' },
  ],
  emits: [
    { name: 'log-click', payload: 'LogEntry', description: '点击行' },
    { name: 'reach-bottom', description: '滚到更早历史区，加载更多' },
    { name: 'reach-top', description: '已废弃，语义等同最新区' },
  ],
}
