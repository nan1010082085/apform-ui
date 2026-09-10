/**
 * MessageList 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** MessageList 文档 */
export const MessageListDoc: ComponentDoc = {
  name: 'MessageList',
  description: '消息列表壳：默认 MessageBubble；可用 #body 注入虚拟列表。',
  props: [
    { name: 'messages', type: 'Message[]', required: true, description: '消息列表' },
    { name: 'loading', type: 'boolean', required: true, description: '加载中' },
    { name: 'currentRun', type: 'RunStatusView | null', required: true, description: '当前 run' },
    { name: 'sending', type: 'boolean', description: '发送中' },
    { name: 'brandMark', type: 'any', description: '品牌标识组件' },
  ],
  emits: [
    { name: 'resume', payload: 'action: string, payload?: string', description: 'resume' },
    { name: 'cancel', description: 'cancel' },
    { name: 'retry', description: 'retry' },
    { name: 'open-process', payload: 'message: Message', description: 'open-process' },
    { name: 'preview', payload: 'attachment: any', description: 'preview' },
  ],
  slots: [
    { name: 'empty', description: '无消息空态' },
    { name: 'body', description: '自定义列表体（如虚拟滚动）' },
  ],
}
