/**
 * ConversationHeader 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** ConversationHeader 文档 */
export const ConversationHeaderDoc: ComponentDoc = {
  name: 'ConversationHeader',
  description: 'ConversationHeader 组件。',
  props: [
    { name: 'title', type: 'string', description: 'title' },
    { name: 'label', type: 'string', description: 'label' },
    { name: 'hasMessages', type: 'boolean', description: 'hasMessages' },
    { name: 'processing', type: 'boolean', description: 'processing' },
  ],
  emits: [
  ],
  slots: [
  ],
}
