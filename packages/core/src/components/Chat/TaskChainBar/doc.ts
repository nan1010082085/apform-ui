/**
 * TaskChainBar 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** TaskChainBar 文档 */
export const TaskChainBarDoc: ComponentDoc = {
  name: 'TaskChainBar',
  titleZh: '任务链',
  description: '多代理任务链进度条（纯 UI）；currentIndex 变化时滚动到当前步。',
  props: [
    { name: 'steps', type: 'TaskChainStepItem[]', required: true, description: '步骤列表（agent/description/status）' },
    { name: 'currentIndex', type: 'number', required: true, description: '当前步骤下标' },
    { name: 'label', type: 'string', default: "'任务链'", description: '左侧标签文案' },
  ],
}
