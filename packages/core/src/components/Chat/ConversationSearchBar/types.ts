/**
 * 对话搜索结果项
 */
export interface ConversationSearchResult {
  id: string
  title: string
  updatedAt?: string | Date
  source?: string
}

/**
 * 来源筛选项
 */
export interface ConversationSearchSourceOption {
  value: string
  label: string
}
