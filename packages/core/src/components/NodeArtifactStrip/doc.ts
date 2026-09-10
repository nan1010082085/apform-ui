/**
 * NodeArtifactStrip 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** NodeArtifactStrip 文档 */
export const NodeArtifactStripDoc: ComponentDoc = {
  name: 'NodeArtifactStrip',
  titleZh: '节点产物条',
  description: '流程图节点上的紧凑产物条（ArtifactGallery compact）。',
  props: [
    { name: 'items', type: 'ArtifactItem[]', required: true, description: '产物列表' },
    { name: 'max', type: 'number', default: '6', description: '最多展示条数' },
  ],
  emits: [{ name: 'preview', payload: 'ArtifactItem', description: '文件类点击' }],
  slots: [],
}
