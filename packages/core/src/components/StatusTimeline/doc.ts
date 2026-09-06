/**
 * StatusTimeline 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** StatusTimeline 文档 */
export const StatusTimelineDoc: ComponentDoc = {
  name: 'StatusTimeline',
  titleZh: '状态时间线',
  description: '横向色块条，展示服务在时间范围内的健康变化。',
  props: [
    { name: 'segments', type: 'TimelineSegment[]', required: true, description: '状态段' },
    {
      name: 'range',
      type: '{ start: string; end: string }',
      description: '对齐范围，默认取 segments 首尾',
    },
    { name: 'height', type: 'number', default: '24', description: '高度' },
    { name: 'showTooltip', type: 'boolean', default: 'true', description: 'hover 提示' },
  ],
  emits: [],
  slots: [],
}
