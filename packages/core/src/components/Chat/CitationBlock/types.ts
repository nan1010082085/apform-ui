/** 单条引用/出处（法律条文、医疗指南、RAG 命中等） */
export interface CitationItem {
  /** 主标题：法规全称 / 指南名 / 文档名 */
  title: string
  /** 副标题：条号、章节、年份等 */
  subtitle?: string
  /** 时效或状态：有效 / 已废止 / 指南年份 等 */
  status?: string
  /** 摘录原文 */
  excerpt?: string
  /** 官方回链 */
  url?: string
  /** 可选稳定 id */
  id?: string
}
