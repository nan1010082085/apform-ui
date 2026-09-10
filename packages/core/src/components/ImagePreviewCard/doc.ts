/**
 * ImagePreviewCard 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** ImagePreviewCard 文档 */
export const ImagePreviewCardDoc: ComponentDoc = {
  name: 'ImagePreviewCard',
  titleZh: '图片预览卡',
  description: '图片缩略预览，点击打开 lightbox。支持单图 url 或多图 urls。',
  props: [
    { name: 'url', type: 'string', description: '单图 URL' },
    { name: 'urls', type: 'string[]', description: '多图 URL 列表' },
    {
      name: 'size',
      type: "'compact' | 'default'",
      default: "'default'",
      description: '尺寸',
    },
    { name: 'alt', type: 'string', default: "'预览图'", description: 'alt 文案' },
  ],
  emits: [],
  slots: [],
}
