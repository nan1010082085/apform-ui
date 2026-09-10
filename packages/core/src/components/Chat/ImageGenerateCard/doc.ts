import type { ComponentDoc } from '../../../docs/types'

/** ImageGenerateCard 文档 */
export const ImageGenerateCardDoc: ComponentDoc = {
  name: 'ImageGenerateCard',
  description: 'AI 图片生成预览卡：prompt / 模型 / 下载 / 重新生成（区别于缩略图 ImagePreviewCard）',
  props: [
    { name: 'imageUrl', type: 'string', description: '生成图片 URL' },
    { name: 'prompt', type: 'string', description: '生成 prompt' },
    { name: 'model', type: 'string', description: '模型名' },
    { name: 'size', type: 'string', description: '尺寸，如 1024x1024' },
    { name: 'style', type: 'string', description: '风格 vivid / natural 等' },
    { name: 'quality', type: 'string', description: '质量 standard / hd 等' },
    { name: 'loading', type: 'boolean', description: '生成中' },
    { name: 'error', type: 'string', description: '错误信息' },
  ],
  emits: [
    { name: 'download', description: '下载图片后通知' },
    { name: 'regenerate', description: '请求重新生成' },
  ],
  slots: [],
}
