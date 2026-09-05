/**
 * EmptyState 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** EmptyState 文档 */
export const EmptyStateDoc: ComponentDoc = {
  name: 'EmptyState',
  titleZh: '空状态',
  description: '列表或页面无数据时的占位展示。',
  props: [
    { name: 'icon', type: 'string', description: 'icon' },
    { name: 'iconSize', type: 'number', description: 'iconSize' },
    { name: 'title', type: 'string', description: 'title' },
    { name: 'description', type: 'string', description: 'description' },
    { name: 'compact', type: 'boolean', description: 'compact' },
    { name: 'actionText', type: 'string', description: 'actionText' },
  ],
  emits: [
  ],
  slots: [
    { name: 'default', description: 'default' },
  ],
}
