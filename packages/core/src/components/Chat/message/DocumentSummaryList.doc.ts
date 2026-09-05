/**
 * DocumentSummaryList 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** DocumentSummaryList 文档 */
export const DocumentSummaryListDoc: ComponentDoc = {
  name: 'DocumentSummaryList',
  description: 'DocumentSummaryList 组件。',
  props: [
    { name: 'summaries', type: 'MessageDocumentSummary[]', required: true, description: 'summaries' },
    { name: 'attachments', type: 'MessageAttachment[]', description: 'attachments' },
  ],
  emits: [
    { name: 'preview', payload: 'attachment: MessageAttachment', description: 'preview' },
  ],
  slots: [
  ],
}
