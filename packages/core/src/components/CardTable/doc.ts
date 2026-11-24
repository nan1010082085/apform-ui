/**
 * CardTable 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** CardTable 文档 */
export const CardTableDoc: ComponentDoc = {
  name: 'CardTable',
  titleZh: '卡片表格容器',
  description:
    '卡片式内容容器（loading / 边框 / 内边距），不是 el-table 的替代品。列定义、排序、筛选请在默认插槽内自组 el-table，或配合 FilterBar + AppPagination。与 el-table 边界：本组件不提供 columns API。',
  props: [
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      description: '加载态（依赖 Element Plus v-loading）',
    },
    {
      name: 'padding',
      type: 'string',
      default: 'var(--spacing-sm, 8px)',
      description: '内边距',
    },
    {
      name: 'borderless',
      type: 'boolean',
      default: 'false',
      description: '无边框',
    },
  ],
  slots: [
    {
      name: 'default',
      description: '内容区：通常放 el-table + 空态；空数据时嵌 EmptyState',
    },
  ],
}
