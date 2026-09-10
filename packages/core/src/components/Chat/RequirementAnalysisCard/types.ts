/**
 * 需求分析确认卡 — 通用分析形状
 */

/** 确认问题 */
export interface RequirementConfirmQuestion {
  id: string
  question: string
  options?: string[]
  required: boolean
}

/** 需求分析结果 */
export interface RequirementAnalysis {
  intent: string
  type: string
  complexity: string
  completeness: {
    score: number
    missing: string[]
    assumptions: string[]
  }
  confirmQuestions: RequirementConfirmQuestion[]
  suggestedChain: Array<{
    agent: string
    description: string
  }>
}
