/**
 * LogStream 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** LogStream 文档 */
export const LogStreamDoc: ComponentDoc = {
  name: 'LogStream',
  titleZh: '日志流',
  description: '日志/事件流查看器：虚拟滚动、级别色条、关键词高亮、JSON 展开。',
  props: [
    { name: 'logs', type: 'LogEntry[]', required: true, description: '日志列表（新到旧）' },
    { name: 'height', type: 'number', required: true, description: '容器高度' },
    { name: 'rowHeight', type: 'number', default: '36', description: '单行高度' },
    { name: 'highlight', type: 'string', description: '高亮关键词' },
    { name: 'autoScroll', type: 'boolean', default: 'false', description: '新数据滚顶' },
    { name: 'loading', type: 'boolean', default: 'false', description: '加载态' },
  ],
  emits: [
    { name: 'log-click', payload: 'LogEntry', description: '点击行展开 payload 侧栏' },
    {
      name: 'reach-bottom',
      payload: '',
      description: '滚到底部（更早历史区），用于加载更早日志',
    },
    {
      name: 'reach-top',
      payload: '',
      description: '滚到顶部（最新区）；兼容保留，勿用于加载更早',
    },
  ],
  slots: [],
}
