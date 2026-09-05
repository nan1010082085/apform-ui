/**
 * HintText 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** HintText 文档 */
export const HintTextDoc: ComponentDoc = {
  name: 'HintText',
  description: 'HintText 组件。',
  props: [
    { name: 'width', type: 'number | string', description: 'width' },
  ],
  emits: [
  ],
  slots: [
    { name: 'default', description: 'default' },
  ],
}
