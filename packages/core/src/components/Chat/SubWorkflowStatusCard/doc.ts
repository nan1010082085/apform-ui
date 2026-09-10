import type { ComponentDoc } from '../../../docs/types'

/** SubWorkflowStatusCard 文档 */
export const SubWorkflowStatusCardDoc: ComponentDoc = {
  name: 'SubWorkflowStatusCard',
  description: '子工作流执行状态卡：状态、耗时、节点进度与详情/重试',
  props: [
    { name: 'workflowName', type: 'string', required: true, description: '子工作流名称' },
    { name: 'status', type: 'string', required: true, description: '执行状态' },
    { name: 'durationMs', type: 'number', description: '耗时（毫秒）' },
    { name: 'error', type: 'string', description: '错误信息' },
    { name: 'nodeCount', type: 'number', description: '节点总数' },
    { name: 'completedNodes', type: 'number', description: '已完成节点数' },
  ],
  emits: [
    { name: 'detail', description: '点击查看详情' },
    { name: 'retry', description: '失败时点击重试' },
  ],
  slots: [],
}
