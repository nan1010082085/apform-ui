/**
 * TruncatedTooltipText 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** TruncatedTooltipText 文档 */
export const TruncatedTooltipTextDoc: ComponentDoc = {
  name: 'TruncatedTooltipText',
  description: 'TruncatedTooltipText 组件。',
  props: [
    { name: 'content', type: 'string', required: true, description: 'content' },
    { name: 'placement', type: '\'top\' | \'bottom\' | \'left\' | \'right\'', description: 'placement' },
    { name: 'maxWidth', type: 'number', description: 'maxWidth' },
  ],
  emits: [
  ],
  slots: [
    { name: 'default', description: 'default' },
  ],
}
