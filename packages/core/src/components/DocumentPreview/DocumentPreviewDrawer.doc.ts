/**
 * DocumentPreviewDrawer 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** DocumentPreviewDrawer 文档 */
export const DocumentPreviewDrawerDoc: ComponentDoc = {
  name: 'DocumentPreviewDrawer',
  description: 'DocumentPreviewDrawer 组件。',
  props: [
    { name: 'modelValue', type: 'boolean', required: true, description: 'modelValue' },
    { name: 'filename', type: 'string', description: 'filename' },
    { name: 'mimetype', type: 'string', description: 'mimetype' },
    { name: 'size', type: 'number', description: 'size' },
    { name: 'chunks', type: 'DocumentPreviewChunk[]', description: 'chunks' },
    { name: 'extractionMethod', type: 'string', description: 'extractionMethod' },
    { name: 'hasOriginalFile', type: 'boolean', description: 'hasOriginalFile' },
    { name: 'pdfUrl', type: 'string', description: 'pdfUrl' },
    { name: 'excelUrl', type: 'string', description: 'excelUrl' },
    { name: 'loading', type: 'boolean', description: 'loading' },
    { name: 'error', type: 'string | null', description: 'error' },
    { name: 'sizeDrawer', type: 'string | number', description: 'sizeDrawer' },
  ],
  emits: [
    { name: 'update:modelValue', payload: 'value: boolean', description: 'update:modelValue' },
  ],
  slots: [
    { name: 'pdf', description: 'pdf' },
    { name: 'excel', description: 'excel' },
  ],
}
