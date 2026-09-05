/**
 * PdfPreviewCard 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** PdfPreviewCard 文档 */
export const PdfPreviewCardDoc: ComponentDoc = {
  name: 'PdfPreviewCard',
  description: 'PdfPreviewCard 组件。',
  props: [
    { name: 'url', type: 'string', required: true, description: 'url' },
    { name: 'title', type: 'string', description: 'title' },
    { name: 'loading', type: 'boolean', description: 'loading' },
    { name: 'error', type: 'string | null', description: 'error' },
    { name: 'minHeight', type: 'string', description: 'minHeight' },
  ],
  emits: [
  ],
  slots: [
    { name: 'default', description: 'default' },
  ],
}
