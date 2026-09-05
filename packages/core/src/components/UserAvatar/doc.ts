/**
 * UserAvatar 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** UserAvatar 文档 */
export const UserAvatarDoc: ComponentDoc = {
  name: 'UserAvatar',
  description: 'UserAvatar 组件。',
  props: [
    { name: 'name', type: 'string', description: 'name' },
    { name: 'src', type: 'string', description: 'src' },
    { name: 'size', type: 'number', description: 'size' },
    { name: 'shape', type: '\'circle\' | \'square\'', description: 'shape' },
  ],
  emits: [
  ],
  slots: [
  ],
}
