/**
 * SeverityBadge 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** SeverityBadge 文档 */
export const SeverityBadgeDoc: ComponentDoc = {
  name: 'SeverityBadge',
  titleZh: '告警级别徽章',
  description: '告警严重级别徽章（critical / warning / info），critical 默认脉冲动画。',
  props: [
    {
      name: 'severity',
      type: "'critical' | 'warning' | 'info'",
      required: true,
      description: '严重级别',
    },
    {
      name: 'pulse',
      type: 'boolean',
      default: "severity==='critical'",
      description: '脉冲动画',
    },
    {
      name: 'size',
      type: "'small' | 'default' | 'large'",
      default: "'default'",
      description: '尺寸',
    },
  ],
  emits: [],
  slots: [],
}
