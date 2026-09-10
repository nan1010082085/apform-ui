/**
 * CollapsibleStepCard 文档
 */
import type { ComponentDoc } from '../../../docs/types'

/** CollapsibleStepCard 文档 */
export const CollapsibleStepCardDoc: ComponentDoc = {
  name: 'CollapsibleStepCard',
  description: '对话步骤可折叠壳：标题、徽章、状态、正文槽。',
  props: [
    { name: 'title', type: 'string', required: true, description: '标题' },
    { name: 'subtitle', type: 'string', description: '副标题' },
    { name: 'badge', type: 'string', description: '徽章' },
    { name: 'statusLabel', type: 'string', description: '状态文案' },
    { name: 'tone', type: "'default' | 'success' | 'error' | 'running'", description: '色调' },
    { name: 'timestamp', type: 'string', description: '时间' },
    { name: 'defaultCollapsed', type: 'boolean', description: '默认折叠' },
    { name: 'collapsed', type: 'boolean', description: '受控折叠' },
  ],
  emits: [
    { name: 'update:collapsed', payload: 'value: boolean', description: '折叠变化' },
  ],
  slots: [
    { name: 'default', description: '展开正文' },
    { name: 'icon', description: '自定义图标' },
  ],
}
