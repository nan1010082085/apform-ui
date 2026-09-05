/**
 * MessageAttachmentList 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** MessageAttachmentList 文档 */
export const MessageAttachmentListDoc: ComponentDoc = {
  name: 'MessageAttachmentList',
  description: 'MessageAttachmentList 组件。',
  props: [
    { name: 'attachments', type: 'MessageAttachment[]', required: true, description: 'attachments' },
  ],
  emits: [
    { name: 'preview', payload: 'attachment: MessageAttachment', description: 'preview' },
  ],
  slots: [
  ],
}
