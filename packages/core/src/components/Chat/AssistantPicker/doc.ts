/**
 * AssistantPicker 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** AssistantPicker 文档 */
export const AssistantPickerDoc: ComponentDoc = {
  name: 'AssistantPicker',
  description: 'AssistantPicker 组件。',
  props: [
    { name: 'items', type: 'AssistantPickerItem[]', required: true, description: 'items' },
    { name: 'modelValue', type: 'string | null', required: true, description: 'modelValue' },
    { name: 'loading', type: 'boolean', description: 'loading' },
    { name: 'error', type: 'string | null', description: 'error' },
  ],
  emits: [
    { name: 'update:modelValue', payload: 'value: string', description: 'update:modelValue' },
  ],
  slots: [
  ],
}
