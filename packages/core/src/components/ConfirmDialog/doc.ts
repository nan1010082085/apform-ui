/**
 * ConfirmDialog 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** ConfirmDialog 文档 */
export const ConfirmDialogDoc: ComponentDoc = {
  name: 'ConfirmDialog',
  description: 'ConfirmDialog 组件。',
  props: [
    { name: 'modelValue', type: 'boolean', required: true, description: 'modelValue' },
    { name: 'title', type: 'string', description: 'title' },
    { name: 'width', type: 'string', description: 'width' },
    { name: 'loading', type: 'boolean', description: 'loading' },
    { name: 'message', type: 'string', required: true, description: 'message' },
    { name: 'type', type: '\'info\' | \'warning\' | \'danger\'', description: 'type' },
    { name: 'cancelText', type: 'string', description: 'cancelText' },
    { name: 'confirmText', type: 'string', description: 'confirmText' },
  ],
  emits: [
    { name: 'update:modelValue', payload: 'value: boolean', description: 'update:modelValue' },
  ],
  slots: [
  ],
}
