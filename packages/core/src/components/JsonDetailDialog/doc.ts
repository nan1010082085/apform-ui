/**
 * JsonDetailDialog 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** JsonDetailDialog 文档 */
export const JsonDetailDialogDoc: ComponentDoc = {
  name: 'JsonDetailDialog',
  titleZh: 'JSON 详情对话框',
  description:
    '详情弹框，一律走人读 NodeResultPreview，禁止整墙 JSON。支持 data / content / nodeType。',
  props: [
    { name: 'modelValue', type: 'boolean', required: true, description: '是否显示' },
    { name: 'title', type: 'string', description: '标题；缺省时按内容类型推断' },
    { name: 'data', type: 'unknown', description: '已解析数据' },
    {
      name: 'content',
      type: 'string',
      description: '文本；可内嵌 JSON，会尝试 extractEmbeddedJson',
    },
    {
      name: 'nodeType',
      type: 'string',
      description: '节点类型提示，传给预览器',
    },
  ],
  emits: [
    { name: 'update:modelValue', payload: 'boolean', description: '开关同步' },
  ],
}
