/**
 * AttachmentPreviewModal 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** AttachmentPreviewModal 文档 */
export const AttachmentPreviewModalDoc: ComponentDoc = {
  name: 'AttachmentPreviewModal',
  description: 'AttachmentPreviewModal 组件。',
  props: [
    { name: 'modelValue', type: 'boolean', required: true, description: 'modelValue' },
    { name: 'attachment', type: 'MessageAttachment | null', required: true, description: 'attachment' },
    { name: 'gallery', type: 'MessageAttachment[]', description: 'gallery' },
  ],
  emits: [
    { name: 'update:modelValue', payload: 'value: boolean', description: 'update:modelValue' },
    { name: 'update:attachment', payload: 'value: MessageAttachment', description: 'update:attachment' },
  ],
  slots: [
  ],
}
