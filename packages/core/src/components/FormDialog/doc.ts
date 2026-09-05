/**
 * FormDialog 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** FormDialog 文档 */
export const FormDialogDoc: ComponentDoc = {
  name: 'FormDialog',
  description: 'FormDialog 组件。',
  props: [
    { name: 'modelValue', type: 'boolean', required: true, description: 'modelValue' },
    { name: 'title', type: 'string', required: true, description: 'title' },
    { name: 'width', type: 'string', description: 'width' },
    { name: 'loading', type: 'boolean', description: 'loading' },
    { name: 'labelWidth', type: 'string', description: 'labelWidth' },
    { name: 'formData', type: 'Record<string, unknown>', required: true, description: 'formData' },
    { name: 'rules', type: 'FormRules', description: 'rules' },
    { name: 'showFullscreenBtn', type: 'boolean', description: 'showFullscreenBtn' },
    { name: 'cancelText', type: 'string', description: 'cancelText' },
    { name: 'confirmText', type: 'string', description: 'confirmText' },
  ],
  emits: [
    { name: 'update:modelValue', payload: 'value: boolean', description: 'update:modelValue' },
  ],
  slots: [
    { name: 'default', description: 'default' },
  ],
}
