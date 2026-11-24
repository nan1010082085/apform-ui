/**
 * TruncatedTooltipText 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** TruncatedTooltipText 文档 */
export const TruncatedTooltipTextDoc: ComponentDoc = {
  name: 'TruncatedTooltipText',
  titleZh: '截断文本提示',
  description:
    '单行省略展示；hover 用 el-tooltip 展示完整 content。默认插槽为可见文案，可透传 class。',
  props: [
    {
      name: 'content',
      type: 'string',
      required: true,
      description: 'tooltip 完整内容（可含换行）',
    },
    {
      name: 'placement',
      type: "'top' | 'bottom' | 'left' | 'right'",
      default: "'top'",
      description: '气泡方位',
    },
    {
      name: 'maxWidth',
      type: 'number',
      default: '360',
      description: '气泡最大宽度（px）',
    },
  ],
  slots: [{ name: 'default', description: '可见截断文案；默认等于 content' }],
}
