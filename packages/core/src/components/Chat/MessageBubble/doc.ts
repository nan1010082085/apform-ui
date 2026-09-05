/**
 * MessageBubble 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** MessageBubble 文档 */
export const MessageBubbleDoc: ComponentDoc = {
  name: 'MessageBubble',
  description: 'MessageBubble 组件。',
  props: [
    { name: 'message', type: 'Message', required: true, description: 'message' },
    { name: 'run', type: 'RunStatusView | null', required: true, description: 'run' },
    { name: 'sending', type: 'boolean', required: true, description: 'sending' },
    { name: 'brandMark', type: 'any', description: 'brandMark' },
  ],
  emits: [
    { name: 'resume', payload: 'action: string, payload?: string', description: 'resume' },
    { name: 'cancel', description: 'cancel' },
    { name: 'retry', description: 'retry' },
    { name: 'open-process', description: 'open-process' },
    { name: 'preview', payload: 'attachment: any', description: 'preview' },
  ],
  slots: [
  ],
}
