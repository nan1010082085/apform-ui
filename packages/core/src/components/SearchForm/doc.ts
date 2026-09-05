/**
 * SearchForm 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** SearchForm 文档 */
export const SearchFormDoc: ComponentDoc = {
  name: 'SearchForm',
  description: 'SearchForm 组件。',
  props: [
    { name: 'fields', type: 'SearchFieldConfig[]', required: true, description: 'fields' },
    { name: 'modelValue', type: 'Record<string, unknown>', description: 'modelValue' },
    { name: 'collapsible', type: 'boolean', description: 'collapsible' },
    { name: 'defaultCollapsed', type: 'boolean', description: 'defaultCollapsed' },
    { name: 'defaultVisibleCount', type: 'number', description: 'defaultVisibleCount' },
  ],
  emits: [
    { name: 'update:modelValue', payload: 'Record<string, unknown>', description: 'update:modelValue' },
  ],
  slots: [
  ],
}
