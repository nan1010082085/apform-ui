import type { ComponentDoc } from '../../../docs/types'

/** SchemaFormPreview 文档 */
export const SchemaFormPreviewDoc: ComponentDoc = {
  name: 'SchemaFormPreview',
  description: 'Schema 表单完整预览卡：按字段类型渲染 Element Plus 控件',
  props: [
    { name: 'fields', type: 'SchemaFormPreviewField[]', required: true, description: '预览字段列表' },
    { name: 'title', type: 'string', default: '生成的表单', description: '标题' },
    { name: 'compact', type: 'boolean', default: 'false', description: '紧凑模式' },
    { name: 'labelWidth', type: 'string', default: '100px', description: 'label 宽度' },
    { name: 'labelPosition', type: "'left' | 'right' | 'top'", default: 'right', description: 'label 位置' },
    { name: 'primaryActionLabel', type: 'string', default: '确认发布', description: '主操作文案' },
    { name: 'showPrimaryAction', type: 'boolean', description: '是否显示主操作（默认 !compact）' },
  ],
  emits: [
    { name: 'click', description: '点击卡片' },
    { name: 'primary-action', description: '点击主操作' },
  ],
  slots: [],
}
