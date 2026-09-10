import type { ComponentDoc } from '../../../docs/types'

/** Model3dPreviewCard 文档 */
export const Model3dPreviewCardDoc: ComponentDoc = {
  name: 'Model3dPreviewCard',
  description: '3D 模型预览卡（model-viewer）；需业务侧引入 @google/model-viewer',
  props: [
    { name: 'url', type: 'string', description: '模型资源 URL', required: true },
    { name: 'filename', type: 'string', description: '文件名，用于格式徽章' },
    { name: 'mimeType', type: 'string', description: 'MIME 类型（预留）' },
    { name: 'poster', type: 'string', description: '加载前 poster 图' },
  ],
  emits: [],
  slots: [],
}
