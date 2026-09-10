import type { ComponentDoc } from '../../../docs/types'

/** WorkflowRunTimeline 文档 */
export const WorkflowRunTimelineDoc: ComponentDoc = {
  name: 'WorkflowRunTimeline',
  description: '工作流执行时间线：标题、进度、节点状态；#step 插槽注入业务内容',
  props: [
    { name: 'title', type: 'string', required: true, description: '头部标题' },
    { name: 'status', type: 'string', required: true, description: '整体执行状态' },
    { name: 'progressText', type: 'string', description: '进度文案' },
    { name: 'steps', type: 'WorkflowRunStep[]', required: true, description: '步骤列表' },
    { name: 'defaultCollapsed', type: 'boolean', default: 'false', description: '初始是否折叠' },
    { name: 'emptyText', type: 'string', default: '等待首个节点开始…', description: '无步骤提示' },
  ],
  emits: [],
  slots: [{ name: 'step', description: '步骤额外内容，作用域 { step }' }],
}
