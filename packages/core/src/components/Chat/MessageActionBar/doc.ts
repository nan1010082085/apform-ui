/**
 * MessageActionBar 文档
 */
import type { ComponentDoc } from '../../../docs/types'

/** MessageActionBar 文档 */
export const MessageActionBarDoc: ComponentDoc = {
  name: 'MessageActionBar',
  description: '消息操作栏：复制、重新生成、点赞/点踩。',
  props: [
    { name: 'content', type: 'string', description: '复制用正文' },
    { name: 'feedback', type: "'positive' | 'negative' | null", description: '当前反馈' },
    { name: 'visible', type: 'boolean', description: 'hover 可见（延迟显示）' },
    { name: 'showCopy', type: 'boolean', description: '显示复制' },
    { name: 'showRegenerate', type: 'boolean', description: '显示重生成' },
    { name: 'showFeedback', type: 'boolean', description: '显示反馈' },
  ],
  emits: [
    { name: 'copy', payload: '', description: '复制' },
    { name: 'regenerate', payload: '', description: '重新生成' },
    { name: 'feedback', payload: "type: 'positive' | 'negative'", description: '反馈' },
  ],
  slots: [],
}
