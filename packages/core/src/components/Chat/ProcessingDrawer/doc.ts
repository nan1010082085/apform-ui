/**
 * ProcessingDrawer 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** ProcessingDrawer 文档 */
export const ProcessingDrawerDoc: ComponentDoc = {
  name: 'ProcessingDrawer',
  description: 'ProcessingDrawer 组件。',
  props: [
    { name: 'modelValue', type: 'boolean', required: true, description: 'modelValue' },
    { name: 'run', type: 'RunStatusView | null', description: 'run' },
    { name: 'title', type: 'string', description: 'title' },
    { name: 'subtitle', type: 'string', description: 'subtitle' },
    { name: 'sending', type: 'boolean', description: 'sending' },
  ],
  emits: [
    { name: 'update:modelValue', payload: 'boolean', description: 'update:modelValue' },
  ],
  slots: [
    { name: 'default', description: 'default' },
  ],
}
