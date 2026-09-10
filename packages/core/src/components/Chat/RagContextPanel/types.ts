/** RAG / Schema 检索结果项（纯展示） */
export interface RagContextItem {
  id: string
  name: string
  score: number
  description?: string
  /** 标签（如 widgetTypes） */
  tags?: string[]
}
