/**
 * Skeleton 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** Skeleton 文档 */
export const SkeletonDoc: ComponentDoc = {
  name: 'Skeleton',
  description: 'Skeleton 组件。',
  props: [
    { name: 'variant', type: '\'card\' | \'list\' | \'table\'', description: 'variant' },
    { name: 'count', type: 'number', description: 'count' },
    { name: 'rows', type: 'number', description: 'rows' },
    { name: 'animated', type: 'boolean', description: 'animated' },
  ],
  emits: [
  ],
  slots: [
  ],
}
