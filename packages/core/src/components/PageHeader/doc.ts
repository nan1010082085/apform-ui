/**
 * PageHeader 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** PageHeader 文档 */
export const PageHeaderDoc: ComponentDoc = {
  name: 'PageHeader',
  description: 'PageHeader 组件。',
  props: [
    { name: 'title', type: 'string', required: true, description: 'title' },
    { name: 'subtitle', type: 'string', description: 'subtitle' },
  ],
  emits: [
  ],
  slots: [
    { name: 'default', description: 'default' },
    { name: 'actions', description: 'actions' },
    { name: 'extra', description: 'extra' },
  ],
}
