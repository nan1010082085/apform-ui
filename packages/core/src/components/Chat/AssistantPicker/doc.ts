/**
 * AssistantPicker 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** AssistantPicker 文档 — 入口 `@apform-ui/core/chat` */
export const AssistantPickerDoc: ComponentDoc = {
  name: 'AssistantPicker',
  titleZh: '智能体选择器',
  description:
    '对话侧智能体列表选择（纯 props，无 Pinia）。能力标签展示文本/文件/图片/需要确认。入口：`@apform-ui/core/chat`。',
  props: [
    {
      name: 'items',
      type: 'AssistantPickerItem[]',
      required: true,
      description: '智能体列表',
    },
    {
      name: 'modelValue',
      type: 'string | null',
      required: true,
      description: '当前选中 id',
    },
    { name: 'loading', type: 'boolean', default: 'false', description: '列表加载中' },
    {
      name: 'error',
      type: 'string | null',
      default: 'null',
      description: '错误信息',
    },
  ],
  emits: [
    {
      name: 'update:modelValue',
      payload: 'value: string',
      description: '选中 id 变化',
    },
    {
      name: 'select',
      payload: 'item: AssistantPickerItem',
      description: '选中整项',
    },
  ],
}
