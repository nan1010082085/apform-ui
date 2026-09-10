/**
 * ArtifactGallery 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** ArtifactGallery 文档 */
export const ArtifactGalleryDoc: ComponentDoc = {
  name: 'ArtifactGallery',
  titleZh: '产物画廊',
  description:
    '统一展示 image / video / text / pdf / office / file。不含 audio / 3D / PPT。文档抽屉由宿主处理 preview。',
  props: [
    { name: 'items', type: 'ArtifactItem[]', required: true, description: '产物列表' },
    {
      name: 'size',
      type: "'compact' | 'default'",
      default: "'default'",
      description: '尺寸',
    },
    { name: 'max', type: 'number', default: '12', description: '最多展示条数' },
  ],
  emits: [{ name: 'preview', payload: 'ArtifactItem', description: '文件类点击' }],
  slots: [],
}
