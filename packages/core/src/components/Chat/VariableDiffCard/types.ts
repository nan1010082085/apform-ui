/** 变量变更项 */
export interface VariableDiffChange {
  type: string
  name: string
  oldValue?: unknown
  newValue?: unknown
}
