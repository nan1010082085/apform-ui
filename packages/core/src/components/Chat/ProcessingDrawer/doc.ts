/**
 * ProcessingDrawer 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** ProcessingDrawer 文档 — 入口 `@apform-ui/core/chat` */
export const ProcessingDrawerDoc: ComponentDoc = {
  name: 'ProcessingDrawer',
  titleZh: '处理详情抽屉',
  description:
    '对话处理详情抽屉：内嵌 RunStatusBar + 默认插槽。入口：`@apform-ui/core/chat`。',
  props: [
    { name: 'modelValue', type: 'boolean', required: true, description: '是否打开' },
    {
      name: 'run',
      type: 'RunStatusView | null',
      description: '运行状态；有值时显示 RunStatusBar',
    },
    { name: 'title', type: 'string', default: "'处理详情'", description: '抽屉标题' },
    {
      name: 'subtitle',
      type: 'string',
      description: '副标题（模型名 / 智能体名等）',
    },
    {
      name: 'sending',
      type: 'boolean',
      default: 'false',
      description: '透传 RunStatusBar sending',
    },
  ],
  emits: [
    { name: 'update:modelValue', payload: 'boolean', description: '开关同步' },
    { name: 'cancel', description: '用户点击停止（来自 RunStatusBar）' },
  ],
  slots: [{ name: 'default', description: '抽屉正文（步骤 / 日志等）' }],
}
