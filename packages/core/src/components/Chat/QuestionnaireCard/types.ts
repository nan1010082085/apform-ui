/** 问卷问题 */
export interface QuestionnaireQuestion {
  id: string
  question: string
  required?: boolean
  options?: string[]
}
