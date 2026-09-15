import type { ComponentDoc } from '../../../docs/types'

/** SuggestionCard 文档 */
export const SuggestionCardDoc: ComponentDoc = {
  name: 'SuggestionCard',
  titleZh: '智能建议卡',
  description: '智能建议卡：展示类型/优先级，支持采纳与忽略。',
  props: [
    { name: 'suggestion', type: 'SuggestionItem', required: true, description: '建议内容（id / type / title / description / priority 等）' },
    { name: 'accepted', type: 'boolean', description: '是否已采纳（展示已采纳态并隐藏操作）' },
    { name: 'dismissed', type: 'boolean', description: '是否已忽略（展示已忽略态并隐藏操作）' },
  ],
  emits: [
    { name: 'accept', payload: 'id: string', description: '采纳建议' },
    { name: 'dismiss', payload: 'id: string', description: '忽略建议' },
  ],
  slots: [],
}
