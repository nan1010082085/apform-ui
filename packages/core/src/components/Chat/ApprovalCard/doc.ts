/**
 * ApprovalCard 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** ApprovalCard 文档 */
export const ApprovalCardDoc: ComponentDoc = {
  name: 'ApprovalCard',
  description: 'ApprovalCard 组件。',
  props: [
    { name: 'waiting', type: 'WaitingPayload | null; disabled: boolean', required: true, description: 'waiting' },
  ],
  emits: [
    { name: 'resume', payload: 'action: string, payload?: string', description: 'resume' },
  ],
  slots: [
  ],
}
