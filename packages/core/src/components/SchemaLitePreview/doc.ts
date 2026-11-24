/**
 * SchemaLitePreview 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** SchemaLitePreview 文档 */
export const SchemaLitePreviewDoc: ComponentDoc = {
  name: 'SchemaLitePreview',
  titleZh: '轻量 Schema 预览',
  description:
    '轻量字段表单预览（input/textarea/number/select/switch/date），不依赖 editor WidgetRenderer。',
  props: [
    {
      name: 'fields',
      type: 'SchemaLiteField[]',
      required: true,
      description: '字段定义列表',
    },
    {
      name: 'modelValue',
      type: 'Record<string, unknown>',
      default: '{}',
      description: '受控表单值',
    },
    {
      name: 'labelWidth',
      type: 'string',
      default: "'100px'",
      description: '标签宽度',
    },
  ],
  emits: [
    {
      name: 'update:modelValue',
      payload: 'Record<string, unknown>',
      description: '字段变更',
    },
  ],
}
