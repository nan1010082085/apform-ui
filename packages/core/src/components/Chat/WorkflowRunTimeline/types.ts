/** 工作流执行时间线条目 */
export type WorkflowRunStep = {
  id: string
  label: string
  status: string
  hint?: string
  /** 是否为当前流式节点 */
  streaming?: boolean
}
