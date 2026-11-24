/**
 * SearchForm 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** SearchForm 文档 */
export const SearchFormDoc: ComponentDoc = {
  name: 'SearchForm',
  titleZh: '搜索表单',
  description:
    '可折叠通用搜索表单。fields 为配置数组：{ key, label, type: input|select|date|daterange, options?, placeholder? }。',
  props: [
    { name: 'fields', type: 'SearchFieldConfig[]', required: true, description: '字段配置' },
    { name: 'modelValue', type: 'Record<string, unknown>', default: '{}', description: '受控值' },
    { name: 'collapsible', type: 'boolean', default: 'true', description: '是否可折叠' },
    { name: 'defaultCollapsed', type: 'boolean', default: 'false', description: '默认折叠' },
    {
      name: 'defaultVisibleCount',
      type: 'number',
      default: '3',
      description: '折叠时可见字段数',
    },
  ],
  emits: [
    { name: 'update:modelValue', payload: 'Record<string, unknown>', description: '值变更' },
    { name: 'search', payload: 'Record<string, unknown>', description: '查询（回车/按钮）' },
    { name: 'reset', description: '重置' },
  ],
}
