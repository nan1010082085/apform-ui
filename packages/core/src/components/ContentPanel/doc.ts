/**
 * ContentPanel 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** ContentPanel 文档 */
export const ContentPanelDoc: ComponentDoc = {
  name: 'ContentPanel',
  description: 'ContentPanel 组件。',
  props: [
    { name: 'title', type: 'string', description: 'title' },
    { name: 'flush', type: 'boolean', description: 'flush' },
    { name: 'fill', type: 'boolean', description: 'fill' },
  ],
  emits: [
  ],
  slots: [
    { name: 'extra', description: 'extra' },
    { name: 'default', description: 'default' },
  ],
}
