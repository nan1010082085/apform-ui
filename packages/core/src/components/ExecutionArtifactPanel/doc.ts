/**
 * ExecutionArtifactPanel 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** ExecutionArtifactPanel 文档 */
export const ExecutionArtifactPanelDoc: ComponentDoc = {
  name: 'ExecutionArtifactPanel',
  titleZh: '执行产物面板',
  description:
    '执行级统一产物面板：汇总文本 / 图片 / 视频 / JSON / 文件，支持类型筛选与按节点分组。',
  props: [
    { name: 'items', type: 'ArtifactItem[]', default: '[]', description: '扁平产物列表' },
    {
      name: 'groups',
      type: 'ArtifactGroup[]',
      description: '按节点分组；优先于 items',
    },
    { name: 'title', type: 'string', default: "'产物'", description: '面板标题' },
    { name: 'max', type: 'number', default: '48', description: 'Gallery 最多展示条数' },
    {
      name: 'showFilters',
      type: 'boolean',
      default: 'true',
      description: '是否显示类型筛选',
    },
  ],
  emits: [{ name: 'preview', payload: 'ArtifactItem', description: '文件类点击，宿主打开文档抽屉' }],
  slots: [],
}
