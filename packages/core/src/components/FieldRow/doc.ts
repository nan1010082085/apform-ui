/**
 * FieldRow 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** FieldRow 文档 */
export const FieldRowDoc: ComponentDoc = {
  name: 'FieldRow',
  titleZh: '属性行',
  description:
    '属性面板单行：左侧 label（可截断 + tooltip）+ 右侧控件插槽。对齐 editor PropertyField 视觉基准。',
  props: [
    { name: 'label', type: 'string', required: true, description: '字段标签' },
    {
      name: 'textarea',
      type: 'boolean',
      default: 'false',
      description: '多行控件时顶对齐 label',
    },
    { name: 'hint', type: 'string', description: '提示文案，拼进 label 的 tooltip' },
    { name: 'required', type: 'boolean', default: 'false', description: '显示必填星号' },
  ],
  slots: [{ name: 'default', description: '右侧控件（input / select / 自定义）' }],
}
