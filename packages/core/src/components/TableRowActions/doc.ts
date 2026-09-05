/**
 * TableRowActions 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** TableRowActions 文档 */
export const TableRowActionsDoc: ComponentDoc = {
  name: 'TableRowActions',
  description: 'TableRowActions 组件。',
  props: [
    { name: 'actions', type: 'TableRowAction[]', required: true, description: 'actions' },
    { name: 'collapseAt', type: 'number', description: 'collapseAt' },
    { name: 'visibleCount', type: 'number', description: 'visibleCount' },
  ],
  emits: [
  ],
  slots: [
  ],
}
