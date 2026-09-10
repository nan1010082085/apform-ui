/**
 * 智能建议项
 */
export interface SuggestionItem {
  id: string
  type: 'action' | 'optimization' | 'reference' | (string & {})
  title: string
  description: string
  priority: 'high' | 'medium' | 'low' | (string & {})
  targetId?: string
  targetName?: string
}
