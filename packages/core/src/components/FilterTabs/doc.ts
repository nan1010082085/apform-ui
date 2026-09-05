/**
 * FilterTabs 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** FilterTabs 文档 */
export const FilterTabsDoc: ComponentDoc = {
  name: 'FilterTabs',
  description: 'FilterTabs 组件。',
  props: [
    { name: 'options', type: '{ label: string; value: string; count?: number }[]', required: true, description: 'options' },
    { name: 'modelValue', type: 'string', required: true, description: 'modelValue' },
  ],
  emits: [
    { name: 'update:modelValue', payload: 'value: string', description: 'update:modelValue' },
  ],
  slots: [
  ],
}
