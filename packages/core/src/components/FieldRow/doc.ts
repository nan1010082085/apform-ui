/**
 * FieldRow 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** FieldRow 文档 */
export const FieldRowDoc: ComponentDoc = {
  name: 'FieldRow',
  description: 'FieldRow 组件。',
  props: [
    { name: 'label', type: 'string', required: true, description: 'label' },
    { name: 'textarea', type: 'boolean', description: 'textarea' },
    { name: 'hint', type: 'string', description: 'hint' },
    { name: 'required', type: 'boolean', description: 'required' },
  ],
  emits: [
  ],
  slots: [
    { name: 'default', description: 'default' },
  ],
}
