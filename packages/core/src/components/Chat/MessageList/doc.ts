/**
 * MessageList 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** MessageList 文档 */
export const MessageListDoc: ComponentDoc = {
  name: 'MessageList',
  titleZh: '消息列表',
  description:
    '消息列表壳：默认渲染 MessageBubble；#body 可注入虚拟列表；#empty 空态。默认模式会在消息变化时滚到底。',
  props: [
    { name: 'messages', type: 'Message[]', required: true, description: '消息数组' },
    { name: 'loading', type: 'boolean', required: true, description: '首屏加载' },
    { name: 'currentRun', type: 'RunStatusView | null', required: true, description: '当前 run' },
    { name: 'sending', type: 'boolean', description: '发送中，传给气泡' },
    { name: 'brandMark', type: 'Component', description: '品牌标识' },
  ],
  emits: [
    { name: 'resume', payload: 'action, payload?', description: '透传气泡' },
    { name: 'cancel', description: '取消' },
    { name: 'retry', description: '重试' },
    { name: 'open-process', payload: 'Message', description: '打开过程' },
    { name: 'preview', payload: 'attachment', description: '预览附件' },
  ],
  slots: [
    { name: 'body', description: '自定义列表实现（虚拟滚动等）' },
    { name: 'empty', description: '空态' },
  ],
}
