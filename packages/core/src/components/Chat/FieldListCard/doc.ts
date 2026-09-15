import type { ComponentDoc } from '../../../docs/types'

/** FieldListCard 文档 */
export const FieldListCardDoc: ComponentDoc = {
  name: 'FieldListCard',
  titleZh: '字段列表卡',
  description: '字段列表结果卡（表单/Schema 摘要）：名称、类型、必填标记与可选操作。',
  props: [
    { name: 'title', type: 'string', required: true, description: '卡片标题' },
    { name: 'fields', type: 'FieldListItem[]', required: true, description: '字段列表（name / type / required / meta）' },
    { name: 'badgeLabel', type: 'string', description: '右上角徽标；默认「{n} 个字段」' },
    { name: 'primaryAction', type: 'string', description: '主按钮文案；有值时展示' },
    { name: 'secondaryAction', type: 'string', description: '次按钮文案；有值时展示' },
    { name: 'compact', type: 'boolean', default: 'false', description: '紧凑模式（隐藏底部操作区）' },
  ],
  emits: [
    { name: 'primary-action', description: '点击主按钮' },
    { name: 'secondary-action', description: '点击次按钮' },
  ],
  slots: [],
}
