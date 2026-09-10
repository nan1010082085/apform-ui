/**
 * PendingAttachmentChip 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** PendingAttachmentChip 文档 */
export const PendingAttachmentChipDoc: ComponentDoc = {
  name: 'PendingAttachmentChip',
  description: '待发送附件 chip：上传中 / 完成可预览 / 失败可移除。',
  props: [
    { name: 'attachment', type: 'PendingAttachment', required: true, description: '待发送附件' },
  ],
  emits: [
    { name: 'preview', payload: 'attachment: PendingAttachment', description: '点击预览' },
    { name: 'remove', payload: 'id: string', description: '移除附件' },
  ],
  slots: [],
}
