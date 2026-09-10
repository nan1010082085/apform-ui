/**
 * useClientPagination 文档元数据
 */
import type { ComponentDoc } from '../docs/types'

/** useClientPagination 文档 */
export const useClientPaginationDoc: ComponentDoc = {
  name: 'useClientPagination',
  titleZh: '客户端分页',
  kind: 'composable',
  description: '对已全量加载的列表做前端切片分页。',
  params: [
    { name: 'source', type: 'Ref<T[]> | ComputedRef<T[]>', required: true, description: '完整列表' },
    { name: 'options.initialPageSize', type: 'number', description: '初始每页条数' },
    { name: 'options.resetOn', type: 'Array<Ref | ComputedRef>', description: '依赖变化时重置到第 1 页' },
  ],
  returns: [
    { name: 'currentPage', type: 'Ref<number>', description: '当前页（可写）' },
    { name: 'pageSize', type: 'Ref<number>', description: '每页条数（可写）' },
    { name: 'pagedItems', type: 'ComputedRef<T[]>', description: '当前页数据' },
    { name: 'total', type: 'ComputedRef<number>', description: '总条数' },
    { name: 'resetPage', type: '() => void', description: '重置到第 1 页' },
  ],
}
