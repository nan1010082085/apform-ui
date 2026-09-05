/**
 * ModelPicker 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** ModelPicker 文档 */
export const ModelPickerDoc: ComponentDoc = {
  name: 'ModelPicker',
  description: 'ModelPicker 组件。',
  props: [
    { name: 'models', type: 'ModelPickerItem[]', required: true, description: 'models' },
    { name: 'modelValue', type: 'string | null', required: true, description: 'modelValue' },
    { name: 'loading', type: 'boolean', description: 'loading' },
  ],
  emits: [
    { name: 'update:modelValue', payload: 'value: string', description: 'update:modelValue' },
  ],
  slots: [
  ],
}
