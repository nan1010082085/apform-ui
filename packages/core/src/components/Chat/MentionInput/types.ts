/**
 * MentionInput 公开类型
 */

/** 分类 Tab */
export interface MentionTab {
  key: string
  label: string
}

/** 搜索结果项 */
export interface MentionResultItem {
  id: string
  type: string
  name: string
  description?: string
}

/** 已选引用 chip */
export interface MentionChip {
  id: string
  type: string
  label: string
}

/**
 * 业务注入的搜索函数
 * @param query - @ 后关键字
 * @param tab - 当前分类 key
 */
export type MentionSearchFn = (query: string, tab: string) => Promise<MentionResultItem[]>
