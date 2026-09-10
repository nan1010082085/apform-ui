/**
 * StarterPromptGrid 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** StarterPromptGrid 文档 */
export const StarterPromptGridDoc: ComponentDoc = {
  name: 'StarterPromptGrid',
  titleZh: '快捷提示网格',
  description: '空态快捷提示卡片网格；点击触发 select。',
  props: [
    { name: 'prompts', type: 'StarterPromptItem[]', required: true, description: '{ text, icon?, agent? }' },
  ],
  emits: [
    { name: 'select', payload: 'prompt: StarterPromptItem', description: '点击某条快捷提示' },
  ],
}
