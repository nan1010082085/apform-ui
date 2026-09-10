/**
 * PropertyField 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** PropertyField 文档 */
export const PropertyFieldDoc: ComponentDoc = {
  name: 'PropertyField',
  description: '类型驱动单行属性控件，布局基于 FieldRow。',
  props: [
    { name: 'keyName', type: 'string', required: true, description: '字段键' },
    { name: 'label', type: 'string', required: true, description: '标签' },
    { name: 'type', type: 'PropertyFieldType', required: true, description: '控件类型' },
    { name: 'value', type: 'unknown', required: true, description: '当前值' },
    { name: 'desc', type: 'string', description: '提示' },
    { name: 'options', type: 'PropertySelectOption[]', description: 'select 选项' },
    { name: 'arrayMode', type: "'string' | 'label-value'", description: 'array-editor 行模式' },
  ],
  emits: [
    { name: 'update', description: '值变更' },
  ],
  slots: [
    { name: 'default', description: '完全自定义控件' },
  ],
}
