/**
 * MessageList 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** MessageList 文档 */
export const MessageListDoc: ComponentDoc = {
  name: 'MessageList',
  description: 'MessageList 组件。',
  props: [
    { name: 'messages', type: 'Message[]', required: true, description: 'messages' },
    { name: 'loading', type: 'boolean', required: true, description: 'loading' },
    { name: 'currentRun', type: 'RunStatusView | null', required: true, description: 'currentRun' },
    { name: 'sending', type: 'boolean', description: 'sending' },
    { name: 'brandMark', type: 'any', description: 'brandMark' },
  ],
  emits: [
    { name: 'resume', payload: 'action: string, payload?: string', description: 'resume' },
    { name: 'cancel', description: 'cancel' },
    { name: 'retry', description: 'retry' },
    { name: 'open-process', payload: 'message: Message', description: 'open-process' },
    { name: 'preview', payload: 'attachment: any', description: 'preview' },
  ],
  slots: [
  ],
}
