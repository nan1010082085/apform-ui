/**
 * AppDialog 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** AppDialog 文档 */
export const AppDialogDoc: ComponentDoc = {
  name: 'AppDialog',
  description: '通用弹框，基于 Element Plus Dialog，支持全屏、拖拽与自定义页脚。',
  whenToUse: '需要统一标题栏、确认/取消操作的模态内容时使用。',
  props: [
    { name: 'modelValue', type: 'boolean', required: true, description: '是否显示（v-model）' },
    { name: 'title', type: 'string', required: true, description: '标题文案' },
    { name: 'width', type: 'string', default: "'580px'", description: '非全屏时的宽度' },
    { name: 'destroyOnClose', type: 'boolean', default: 'true', description: '关闭时销毁内容' },
    { name: 'loading', type: 'boolean', default: 'false', description: '确认按钮 loading' },
    { name: 'draggable', type: 'boolean', default: 'true', description: '是否可拖拽（全屏时禁用）' },
    { name: 'appendToBody', type: 'boolean', default: 'true', description: '是否挂载到 body' },
    { name: 'showFullscreenBtn', type: 'boolean', default: 'true', description: '是否显示全屏按钮' },
    { name: 'closeOnClickModal', type: 'boolean', default: 'false', description: '点击遮罩是否关闭' },
    { name: 'cancelText', type: 'string', default: "'取消'", description: '取消按钮文案' },
    { name: 'confirmText', type: 'string', default: "'确定'", description: '确认按钮文案' },
  ],
  emits: [
    { name: 'update:modelValue', payload: 'boolean', description: '显示状态变更' },
    { name: 'confirm', description: '点击确认' },
    { name: 'cancel', description: '点击取消' },
    { name: 'close', description: '弹框关闭回调' },
  ],
  slots: [
    { name: 'default', description: '弹框主体内容' },
    { name: 'footer', description: '自定义页脚（覆盖默认确认/取消）' },
  ],
}
