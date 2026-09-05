/**
 * AppPagination 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** AppPagination 文档 */
export const AppPaginationDoc: ComponentDoc = {
  name: 'AppPagination',
  description: 'AppPagination 组件。',
  props: [
    { name: 'currentPage', type: 'number', required: true, description: 'currentPage' },
    { name: 'pageSize', type: 'number', description: 'pageSize' },
    { name: 'total', type: 'number', required: true, description: 'total' },
    { name: 'size', type: '\'default\' | \'small\'', description: 'size' },
  ],
  emits: [
    { name: 'update:currentPage', payload: 'page: number', description: 'update:currentPage' },
    { name: 'update:pageSize', payload: 'size: number', description: 'update:pageSize' },
  ],
  slots: [
  ],
}
