/**
 * ConversationHeader 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** ConversationHeader 文档 */
export const ConversationHeaderDoc: ComponentDoc = {
  name: 'ConversationHeader',
  description: '对话顶栏：标题 / 状态 / 操作；业务可通过槽扩展。',
  props: [
    { name: 'title', type: 'string', description: '主标题（会话名）' },
    { name: 'label', type: 'string', description: '副文案' },
    { name: 'hasMessages', type: 'boolean', description: '是否已有消息' },
    { name: 'processing', type: 'boolean', description: '处理中指示' },
    { name: 'hideDefaultActions', type: 'boolean', description: '隐藏默认操作按钮' },
  ],
  emits: [
    { name: 'create', payload: '', description: '新建对话' },
    { name: 'changeAssistant', payload: '', description: '选择智能体' },
    { name: 'toggleDetails', payload: '', description: '处理详情' },
  ],
  slots: [
    { name: 'identity', description: '整块左侧身份区' },
    { name: 'meta', description: '标题旁元信息（徽章 / 连接状态）' },
    { name: 'actions', description: '右侧操作区（替换默认按钮）' },
  ],
}
