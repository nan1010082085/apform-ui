/**
 * StatCard 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** StatCard 文档 */
export const StatCardDoc: ComponentDoc = {
  name: 'StatCard',
  titleZh: '统计卡片',
  description: '监控统计卡片，支持状态色条、环比趋势与 sparkline。',
  props: [
    { name: 'label', type: 'string', required: true, description: '标签' },
    { name: 'value', type: 'number | string', required: true, description: '数值' },
    { name: 'unit', type: 'string', description: '单位后缀' },
    { name: 'trend', type: 'StatTrend', description: '环比趋势' },
    { name: 'sparkline', type: 'number[]', description: '趋势线数据' },
    {
      name: 'status',
      type: "'healthy' | 'warning' | 'error' | 'unknown'",
      description: '左侧色条状态',
    },
    { name: 'to', type: 'string', description: '跳转链接' },
    { name: 'loading', type: 'boolean', default: 'false', description: '骨架屏' },
  ],
  emits: [{ name: 'click', payload: 'MouseEvent', description: '点击' }],
  slots: [],
}
