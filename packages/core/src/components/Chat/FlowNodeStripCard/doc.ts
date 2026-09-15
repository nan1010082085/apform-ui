import type { ComponentDoc } from '../../../docs/types'

/** FlowNodeStripCard 文档 */
export const FlowNodeStripCardDoc: ComponentDoc = {
  name: 'FlowNodeStripCard',
  titleZh: '流程节点条',
  description: '流程节点条结果卡：横向节点条 + 可选主/次操作。',
  props: [
    { name: 'title', type: 'string', required: true, description: '卡片标题' },
    { name: 'nodes', type: 'FlowStripNode[]', required: true, description: '节点列表（label / type：start | task | end | string）' },
    { name: 'badgeLabel', type: 'string', description: '右上角徽标；默认「{n} 个节点」' },
    { name: 'primaryAction', type: 'string', description: '主按钮文案；有值时展示' },
    { name: 'secondaryAction', type: 'string', description: '次按钮文案；有值时展示' },
    { name: 'compact', type: 'boolean', default: 'false', description: '紧凑模式（隐藏底部操作区）' },
  ],
  emits: [
    { name: 'primary-action', description: '点击主按钮' },
    { name: 'secondary-action', description: '点击次按钮' },
  ],
  slots: [],
}
