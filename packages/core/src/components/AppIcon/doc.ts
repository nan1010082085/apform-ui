/**
 * AppIcon 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** AppIcon 文档 */
export const AppIconDoc: ComponentDoc = {
  name: 'AppIcon',
  titleZh: '图标',
  description: '统一图标组件。name 必须在 iconRegistry 注册，禁止编造或使用 ep: 前缀。',
  props: [
    { name: 'name', type: 'string', required: true, description: '已注册图标名（kebab-case）' },
    { name: 'size', type: 'number | string', default: "'1em'", description: '图标大小' },
    { name: 'color', type: 'string', description: '图标颜色' },
  ],
  emits: [],
  slots: [],
}
