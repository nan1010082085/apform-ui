/**
 * ThinkingBlock 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** ThinkingBlock 文档 */
export const ThinkingBlockDoc: ComponentDoc = {
  name: 'ThinkingBlock',
  description: '可折叠的思考过程块（Markdown 正文）。',
  props: [
    { name: 'content', type: 'string', required: true, description: '思考内容 Markdown' },
    { name: 'title', type: 'string', description: '标题' },
    { name: 'badge', type: 'string', description: '标题旁徽章' },
    { name: 'defaultCollapsed', type: 'boolean', description: '默认折叠' },
    { name: 'statusLabel', type: 'string', description: '状态文案' },
  ],
  emits: [],
  slots: [],
}
