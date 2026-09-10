/** 任务链步骤状态 */
export type TaskChainStepStatus = 'pending' | 'running' | 'done' | 'error' | 'skipped'

/** 任务链步骤（纯展示） */
export interface TaskChainStepItem {
  /** 代理/角色标识（如 editor / flow / page） */
  agent: string
  /** 步骤说明 */
  description: string
  /** 步骤状态 */
  status?: TaskChainStepStatus
}
