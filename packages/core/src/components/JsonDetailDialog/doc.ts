/**
 * JsonDetailDialog 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** JsonDetailDialog 文档 */
export const JsonDetailDialogDoc: ComponentDoc = {
  name: 'JsonDetailDialog',
  description: 'JsonDetailDialog 组件。',
  props: [
    { name: 'modelValue', type: 'boolean', required: true, description: 'modelValue' },
    { name: 'title', type: 'string', description: 'title' },
    { name: 'data', type: 'unknown', description: 'data' },
    { name: 'content', type: 'string', description: 'content' },
  ],
  emits: [
    { name: 'update:modelValue', payload: 'boolean', description: 'update:modelValue' },
  ],
  slots: [
  ],
}
