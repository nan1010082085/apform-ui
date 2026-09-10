/**
 * TipBanner 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** TipBanner 文档 */
export const TipBannerDoc: ComponentDoc = {
  name: 'TipBanner',
  titleZh: '提示条',
  description: '消息区提示条（纯 UI），左侧图标 + 文案。',
  props: [
    { name: 'text', type: 'string', required: true, description: '提示文案' },
    { name: 'icon', type: 'string', default: "'info-filled'", description: 'AppIcon 名称' },
  ],
}
