/**
 * HintText 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** HintText 文档 */
export const HintTextDoc: ComponentDoc = {
  name: 'HintText',
  titleZh: '提示文案',
  description: '属性面板次级说明文字，字号与色值走设计令牌，避免业务里散落灰色小字样式。',
  props: [
    {
      name: 'width',
      type: 'number | string',
      description: '可选定宽（数字按 px）；默认撑满父级',
    },
  ],
  slots: [{ name: 'default', description: '提示内容' }],
}
