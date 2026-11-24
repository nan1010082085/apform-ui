/**
 * MessageBubble 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** MessageBubble 文档 */
export const MessageBubbleDoc: ComponentDoc = {
  name: 'MessageBubble',
  titleZh: '消息气泡',
  description:
    '单条消息气泡。消息体 Message：id / role / content / status / attachments / parts 等。流式更新：保持同一 id，递增 content 或更新 status。',
  props: [
    { name: 'message', type: 'Message', required: true, description: '消息数据' },
    { name: 'run', type: 'RunStatusView | null', required: true, description: '当前运行态' },
    { name: 'sending', type: 'boolean', required: true, description: '发送中' },
    { name: 'brandMark', type: 'Component', description: '品牌标识组件' },
    {
      name: 'sessionMessages',
      type: 'Message[]',
      description: '会话列表，用于合并用户附件摘要',
    },
  ],
  emits: [
    { name: 'resume', payload: 'action, payload?', description: 'HITL 继续' },
    { name: 'cancel', description: '取消' },
    { name: 'retry', description: '重试' },
    { name: 'open-process', description: '打开过程面板' },
    { name: 'preview', payload: 'MessageAttachment', description: '预览附件' },
  ],
  slots: [
    { name: 'default / content', description: '自定义正文，覆盖默认 MessageParts' },
  ],
}
