/**
 * CardTable 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** CardTable 文档 */
export const CardTableDoc: ComponentDoc = {
  name: 'CardTable',
  description: 'CardTable 组件。',
  props: [
    { name: 'loading', type: 'boolean', description: 'loading' },
    { name: 'padding', type: 'string', description: 'padding' },
    { name: 'borderless', type: 'boolean', description: 'borderless' },
  ],
  emits: [
  ],
  slots: [
    { name: 'default', description: 'default' },
  ],
}
