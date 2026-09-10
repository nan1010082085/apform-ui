/** 流程条节点 */
export interface FlowStripNode {
  label: string
  type: 'start' | 'task' | 'end' | string
}
