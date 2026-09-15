import type { ComponentDoc } from '../../../docs/types'

/** GeneratingPlaceholder 文档 */
export const GeneratingPlaceholderDoc: ComponentDoc = {
  name: 'GeneratingPlaceholder',
  description: '对话气泡「生成中」占位：图片 shimmer / 文本骨架 + 三点动画，避免进度文案当正文',
  props: [
    { name: 'variant', type: "'image' | 'text' | 'generic'", default: 'generic', description: '占位形态' },
    { name: 'label', type: 'string', default: '正在生成…', description: '主状态文案' },
    { name: 'detail', type: 'string', description: '副文案（如「仍在生成…」）' },
    { name: 'count', type: 'number', description: '出图张数提示（variant=image）' },
    { name: 'aspectRatio', type: 'string', default: '4 / 3', description: '图片占位宽高比' },
  ],
  emits: [],
  slots: [],
}
