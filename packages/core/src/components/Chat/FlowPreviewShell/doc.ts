import type { ComponentDoc } from '../../../docs/types'

/** FlowPreviewShell 文档 */
export const FlowPreviewShellDoc: ComponentDoc = {
  name: 'FlowPreviewShell',
  description: '流程预览卡片壳：header / badge / fit / actions，画布由 slot 注入',
  props: [
    { name: 'title', type: 'string', description: '卡片标题', required: true },
    { name: 'badge', type: 'string', description: '右侧徽章，如「3 节点 / 2 连线」' },
    { name: 'primaryAction', type: 'string', description: '主操作按钮文案' },
    { name: 'secondaryAction', type: 'string', description: '次操作按钮文案' },
    { name: 'compact', type: 'boolean', description: '紧凑模式', default: 'false' },
    { name: 'showFitButton', type: 'boolean', description: '是否显示适配画布按钮', default: 'true' },
  ],
  emits: [
    { name: 'primary-action', description: '点击主操作' },
    { name: 'secondary-action', description: '点击次操作' },
    { name: 'fit-view', description: '点击适配画布' },
  ],
  slots: [
    { name: 'default', description: '画布内容（如 VueFlow）' },
    { name: 'icon', description: '可选头部图标，默认 connection' },
  ],
}
