/**
 * TextPreviewCard 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** TextPreviewCard 文档 */
export const TextPreviewCardDoc: ComponentDoc = {
  name: 'TextPreviewCard',
  titleZh: '文本预览卡',
  description: '文本 / JSON 预览，支持复制；compact 模式截断一行。',
  props: [
    { name: 'text', type: 'string', required: true, description: '文本内容' },
    { name: 'label', type: 'string', description: '标题' },
    {
      name: 'size',
      type: "'compact' | 'default'",
      default: "'default'",
      description: '尺寸',
    },
    { name: 'maxHeight', type: 'string', default: "'240px'", description: '正文最大高度' },
  ],
  emits: [],
  slots: [],
}
