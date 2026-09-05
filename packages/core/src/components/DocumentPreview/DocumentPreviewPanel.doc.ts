/**
 * DocumentPreviewPanel 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** DocumentPreviewPanel 文档 */
export const DocumentPreviewPanelDoc: ComponentDoc = {
  name: 'DocumentPreviewPanel',
  description: 'DocumentPreviewPanel 组件。',
  props: [
    { name: 'filename', type: 'string', required: true, description: 'filename' },
    { name: 'mimetype', type: 'string', description: 'mimetype' },
    { name: 'size', type: 'number', description: 'size' },
    { name: 'chunks', type: 'DocumentPreviewChunk[]', description: 'chunks' },
    { name: 'extractionMethod', type: 'string', description: 'extractionMethod' },
    { name: 'hasOriginalFile', type: 'boolean', description: 'hasOriginalFile' },
    { name: 'pdfUrl', type: 'string', description: 'pdfUrl' },
    { name: 'excelUrl', type: 'string', description: 'excelUrl' },
    { name: 'loading', type: 'boolean', description: 'loading' },
    { name: 'error', type: 'string | null', description: 'error' },
  ],
  emits: [
  ],
  slots: [
    { name: 'pdf', description: 'pdf' },
    { name: 'excel', description: 'excel' },
  ],
}
