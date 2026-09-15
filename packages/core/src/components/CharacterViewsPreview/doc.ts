/**
 * CharacterViewsPreview 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** CharacterViewsPreview 文档 */
export const CharacterViewsPreviewDoc: ComponentDoc = {
  name: 'CharacterViewsPreview',
  titleZh: '角色三视图',
  description:
    '按角色名分组展示正 / 侧 / 背缩略图。通常由 resolveResultBlocks 产出 character-views 块后，经 NodeResultPreview 渲染；也可直接传入 CharacterViewGroup[]。',
  props: [
    {
      name: 'groups',
      type: 'CharacterViewGroup[]',
      required: true,
      description: '角色分组：{ name, artifacts }；artifacts 建议带 label（正/侧/背）与 url',
    },
    {
      name: 'title',
      type: 'string',
      description: '可选区块标题（如「角色三视图」）',
    },
  ],
  emits: [
    {
      name: 'preview',
      payload: 'ArtifactItem',
      description: '无 url、仅有 documentId 的项点击时抛出，由宿主打开文档抽屉',
    },
  ],
  slots: [],
}
