/**
 * SectionToggle 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** SectionToggle 文档 */
export const SectionToggleDoc: ComponentDoc = {
  name: 'SectionToggle',
  description: 'SectionToggle 组件。',
  props: [
    { name: 'title', type: 'string', required: true, description: 'title' },
    { name: 'count', type: 'number', description: 'count' },
    { name: 'defaultOpen', type: 'boolean', description: 'defaultOpen' },
  ],
  emits: [
  ],
  slots: [
    { name: 'default', description: 'default' },
  ],
}
