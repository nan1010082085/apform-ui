/**
 * ApprovalCard 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** ApprovalCard 文档 */
export const ApprovalCardDoc: ComponentDoc = {
  name: 'ApprovalCard',
  titleZh: '审批卡片',
  description:
    'HITL 等待用户确认的操作卡。waiting 含 prompt / actions / fields；@resume 回传 action 与可选 payload。危险态仅微染底边，无左侧彩条。',
  props: [
    {
      name: 'waiting',
      type: 'WaitingPayload | null',
      required: true,
      description: '待确认载荷；null 时不渲染',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: true,
      description: '禁用全部操作按钮',
    },
  ],
  emits: [
    {
      name: 'resume',
      payload: 'action: string, payload?: string',
      description: '用户选择动作；有字段时附带输入值',
    },
  ],
}
