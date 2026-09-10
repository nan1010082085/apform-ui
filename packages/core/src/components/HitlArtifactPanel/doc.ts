/**
 * HitlArtifactPanel 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** HitlArtifactPanel 文档 */
export const HitlArtifactPanelDoc: ComponentDoc = {
  name: 'HitlArtifactPanel',
  titleZh: 'HITL 产物面板',
  description: 'HITL / 详情侧栏产物面板，default 尺寸 Gallery。',
  props: [
    { name: 'items', type: 'ArtifactItem[]', required: true, description: '产物列表' },
    { name: 'title', type: 'string', default: "'节点产物'", description: '面板标题' },
    { name: 'max', type: 'number', default: '24', description: '最多展示条数' },
  ],
  emits: [{ name: 'preview', payload: 'ArtifactItem', description: '文件类点击' }],
  slots: [],
}
