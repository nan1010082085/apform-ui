/**
 * AgentTransferCard 文档
 */
import type { ComponentDoc } from '../../../docs/types'

/** AgentTransferCard 文档 */
export const AgentTransferCardDoc: ComponentDoc = {
  name: 'AgentTransferCard',
  description: '智能体移交提示：来源 → 目标 + 原因。',
  props: [
    { name: 'fromLabel', type: 'string', required: true, description: '来源' },
    { name: 'toLabel', type: 'string', required: true, description: '目标' },
    { name: 'reason', type: 'string', description: '移交原因' },
  ],
  emits: [],
  slots: [],
}
