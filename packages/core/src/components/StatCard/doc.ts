/**
 * StatCard 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** StatCard 文档 */
export const StatCardDoc: ComponentDoc = {
  name: 'StatCard',
  titleZh: '统计卡',
  description: '监控大盘统计卡：标签、数值、环比、sparkline、状态色点。',
  props: [
    { name: 'label', type: 'string', required: true, description: '标签' },
    { name: 'value', type: 'number | string', required: true, description: '数值' },
    { name: 'unit', type: 'string', description: '单位后缀' },
    { name: 'trend', type: 'StatTrend', description: '环比' },
    { name: 'sparkline', type: 'number[]', description: '趋势点' },
    {
      name: 'status',
      type: "'healthy'|'warning'|'error'|'unknown'",
      description: '标签旁状态色点（不再使用左侧色条）',
    },
    { name: 'to', type: 'string', description: '跳转链接' },
    { name: 'loading', type: 'boolean', default: 'false', description: '骨架屏' },
  ],
  emits: [{ name: 'click', payload: 'MouseEvent', description: '点击卡片' }],
}
