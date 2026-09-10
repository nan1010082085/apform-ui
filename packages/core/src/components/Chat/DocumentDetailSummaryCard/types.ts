/**
 * 结构化文档摘要（含要点与章节）
 */
export interface DocumentDetailSummaryBody {
  title: string
  summary: string
  keyPoints: string[]
  sections: Array<{ heading: string; content: string }>
}

/** DocumentDetailSummaryCard 入参 */
export interface DocumentDetailSummaryItem {
  documentId?: string
  filename: string
  summary: DocumentDetailSummaryBody
}
