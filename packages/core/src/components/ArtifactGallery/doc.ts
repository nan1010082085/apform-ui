/**
 * ArtifactGallery 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** ArtifactGallery 文档 */
export const ArtifactGalleryDoc: ComponentDoc = {
  name: 'ArtifactGallery',
  titleZh: '产物画廊',
  description:
    '统一产物画廊（图/视频/JSON/文本/文件）。items: ArtifactItem[]（kind/url/text/documentId…）。PDF/Office 点击抛 preview，由宿主打开 DocumentPreview。不含 audio/3D/PPT。',
  props: [
    { name: 'items', type: 'ArtifactItem[]', required: true, description: '产物列表' },
    { name: 'size', type: 'ArtifactGallerySize', default: 'default', description: '展示尺寸' },
    { name: 'max', type: 'number', default: '12', description: '最多展示条数' },
  ],
  emits: [
    {
      name: 'preview',
      payload: 'ArtifactItem',
      description: 'pdf / office / file 点击，宿主打开抽屉',
    },
  ],
}
