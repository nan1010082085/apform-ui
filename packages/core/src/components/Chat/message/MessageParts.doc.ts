/**
 * MessageParts 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** MessageParts 文档 */
export const MessagePartsDoc: ComponentDoc = {
  name: 'MessageParts',
  description: 'MessageParts 组件。',
  props: [
    { name: 'content', type: 'string', required: true, description: 'content' },
  ],
  emits: [
  ],
  slots: [
  ],
}
