/**
 * VideoPreviewCard 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** VideoPreviewCard 文档 */
export const VideoPreviewCardDoc: ComponentDoc = {
  name: 'VideoPreviewCard',
  titleZh: '视频预览卡',
  description: '内嵌 video 控件预览。不含音频波形 / 3D / PPT。',
  props: [
    { name: 'url', type: 'string', required: true, description: '视频 URL' },
    {
      name: 'size',
      type: "'compact' | 'default'",
      default: "'default'",
      description: '尺寸',
    },
  ],
  emits: [],
  slots: [],
}
