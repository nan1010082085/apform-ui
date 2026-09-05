/**
 * FilterTabs 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** FilterTabs 文档 */
export const FilterTabsDoc: ComponentDoc = {
  name: 'FilterTabs',
  titleZh: '筛选标签',
  description: '按钮组样式的筛选标签栏，用于列表页状态筛选。',
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
