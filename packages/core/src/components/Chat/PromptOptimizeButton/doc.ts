/**
 * PromptOptimizeButton 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** PromptOptimizeButton 文档 */
export const PromptOptimizeButtonDoc: ComponentDoc = {
  name: 'PromptOptimizeButton',
  titleZh: '提示词优化按钮',
  description:
    'Composer 发送区旁的 ✨ 按钮（纯 UI）。配合 Composer.promptOptimize 注入 request，或自行放入 #actions / #optimize。模型与 URL 由业务注入（Schema Platform 使用 mimo-v2.6-flash）。',
  props: [
    { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
    { name: 'loading', type: 'boolean', default: 'false', description: '是否显示加载转圈' },
    { name: 'tooltip', type: 'string', default: '优化提示词', description: '悬停与 aria-label' },
    {
      name: 'shape',
      type: "'square' | 'round'",
      default: 'square',
      description: '按钮外形：平台方块 / 终端圆形',
    },
  ],
  emits: [{ name: 'click', payload: 'MouseEvent', description: '点击（loading/disabled 时不触发）' }],
  slots: [],
}
