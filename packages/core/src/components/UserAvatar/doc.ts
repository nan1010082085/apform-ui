/**
 * UserAvatar 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** UserAvatar 文档 */
export const UserAvatarDoc: ComponentDoc = {
  name: 'UserAvatar',
  titleZh: '用户头像',
  description:
    '统一头像：有 src 显示图片，否则取 name 首字母；支持圆形 / 方形与自定义尺寸。',
  props: [
    { name: 'name', type: 'string', default: "''", description: '用户名（fallback 首字母）' },
    { name: 'src', type: 'string', default: "''", description: '头像图片 URL' },
    {
      name: 'size',
      type: 'number',
      default: '32',
      description: '边长 px（默认对齐 --avatar-size-md）',
    },
    {
      name: 'shape',
      type: "'circle' | 'square'",
      default: "'circle'",
      description: '形状',
    },
  ],
}
