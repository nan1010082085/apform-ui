/**
 * ExcelPreviewCard 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** ExcelPreviewCard 文档 */
export const ExcelPreviewCardDoc: ComponentDoc = {
  name: 'ExcelPreviewCard',
  description: 'ExcelPreviewCard 组件。',
  props: [
    { name: 'sheetNames', type: 'string[]', description: 'sheetNames' },
    { name: 'modelValue', type: 'string', description: 'modelValue' },
    { name: 'headers', type: 'string[]', description: 'headers' },
    { name: 'rows', type: 'string[][]', description: 'rows' },
    { name: 'totalRows', type: 'number', description: 'totalRows' },
    { name: 'maxPreviewRows', type: 'number', description: 'maxPreviewRows' },
    { name: 'loading', type: 'boolean', description: 'loading' },
    { name: 'error', type: 'string | null', description: 'error' },
  ],
  emits: [
    { name: 'update:modelValue', payload: 'value: string', description: 'update:modelValue' },
  ],
  slots: [
  ],
}
