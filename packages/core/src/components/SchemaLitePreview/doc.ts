/**
 * SchemaLitePreview 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** SchemaLitePreview 文档 */
export const SchemaLitePreviewDoc: ComponentDoc = {
  name: 'SchemaLitePreview',
  description: 'SchemaLitePreview 组件。',
  props: [
    { name: 'fields', type: 'SchemaLiteField[]', required: true, description: 'fields' },
    { name: 'modelValue', type: 'Record<string, unknown>', description: 'modelValue' },
    { name: 'labelWidth', type: 'string', description: 'labelWidth' },
  ],
  emits: [
    { name: 'update:modelValue', payload: 'Record<string, unknown>', description: 'update:modelValue' },
  ],
  slots: [
  ],
}
