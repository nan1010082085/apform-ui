/**
 * FilterBar 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** FilterBar 文档 */
export const FilterBarDoc: ComponentDoc = {
  name: 'FilterBar',
  description: 'FilterBar 组件。',
  props: [
    { name: 'title', type: 'string', description: 'title' },
  ],
  emits: [
  ],
  slots: [
    { name: 'default', description: 'default' },
    { name: 'actions', description: 'actions' },
  ],
}
