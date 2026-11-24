/**
 * FilterBar 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** FilterBar 文档 */
export const FilterBarDoc: ComponentDoc = {
  name: 'FilterBar',
  titleZh: '筛选条',
  description:
    '列表页筛选条：默认插槽放表单项，查询/重置触发事件。筛选 schema 由业务自行维护；与 AppPagination / SearchForm 配合见场景指南。',
  props: [{ name: 'title', type: 'string', description: '可选区块标题' }],
  emits: [
    { name: 'search', description: '点击查询' },
    { name: 'reset', description: '点击重置' },
  ],
  slots: [
    { name: 'default', description: '筛选项（建议 el-form-item）' },
    { name: 'actions', description: '覆盖默认查询/重置按钮' },
  ],
}
