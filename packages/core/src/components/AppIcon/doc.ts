/**
 * AppIcon 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** AppIcon 文档 */
export const AppIconDoc: ComponentDoc = {
  name: 'AppIcon',
  description: 'AppIcon 组件。',
  props: [
    { name: 'name', type: 'string', required: true, description: 'name' },
    { name: 'size', type: 'number | string', description: 'size' },
    { name: 'color', type: 'string', description: 'color' },
  ],
  emits: [
  ],
  slots: [
  ],
}
