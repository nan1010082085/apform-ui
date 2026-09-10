/**
 * 清单拟办卡 — 通用行动项与方案形状（不绑定业务 ActionItem 语义）
 */

/** 优先级 */
export type ChecklistItemPriority = 'high' | 'medium' | 'low'

/** 展示用类型（可扩展字符串） */
export type ChecklistItemKind = 'todo' | 'approval' | 'review' | 'decision' | (string & {})

/** 单条拟办项 */
export interface ChecklistProposalItem {
  id: string
  title: string
  description?: string
  type?: ChecklistItemKind
  priority?: ChecklistItemPriority | string
  assignee?: string
  deadline?: string
}

/** 拟办方案 */
export interface ChecklistProposal {
  id?: string
  title?: string
  /** 摘要文案 */
  summary?: string
  /** 来源文档标题 */
  documentTitle?: string
  /** 审批链人名 */
  approvalChain?: string[]
  actionItems: ChecklistProposalItem[]
  status?: 'pending' | 'approved' | 'rejected'
}
