/**
 * TableRowActions 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** TableRowActions 文档 */
export const TableRowActionsDoc: ComponentDoc = {
  name: 'TableRowActions',
  titleZh: '表格行操作',
  description:
    '表格操作列：操作数达到 collapseAt 时折叠为「可见按钮 + 更多」下拉，避免操作列过宽。',
  props: [
    {
      name: 'actions',
      type: 'TableRowAction[]',
      required: true,
      description: '操作项（含 key / label / onClick；下拉项可带 icon）',
    },
    {
      name: 'collapseAt',
      type: 'number',
      default: '5',
      description: '达到该数量时开始折叠',
    },
    {
      name: 'visibleCount',
      type: 'number',
      default: '2',
      description: '折叠时直接展示的按钮数',
    },
  ],
}
