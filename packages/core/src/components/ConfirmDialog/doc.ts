/**
 * ConfirmDialog 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** ConfirmDialog 文档 */
export const ConfirmDialogDoc: ComponentDoc = {
  name: 'ConfirmDialog',
  titleZh: '确认弹框',
  description:
    '基于 AppDialog 的确认操作弹框。支持 info / warning / danger；点击确定会触发 confirm 并自动关闭。',
  props: [
    { name: 'modelValue', type: 'boolean', required: true, description: '是否显示（v-model）' },
    { name: 'title', type: 'string', default: "'确认操作'", description: '标题' },
    { name: 'message', type: 'string', required: true, description: '确认说明文案' },
    {
      name: 'type',
      type: "'info' | 'warning' | 'danger'",
      default: "'warning'",
      description: '语义类型',
    },
    { name: 'width', type: 'string', default: "'400px'", description: '宽度' },
    { name: 'loading', type: 'boolean', default: 'false', description: '确定按钮 loading' },
    { name: 'cancelText', type: 'string', default: "'取消'", description: '取消按钮文案' },
    { name: 'confirmText', type: 'string', default: "'确定'", description: '确定按钮文案' },
  ],
  emits: [
    {
      name: 'update:modelValue',
      payload: 'value: boolean',
      description: '显示状态变更；确定时会自动设为 false',
    },
    { name: 'confirm', description: '点击确定' },
  ],
  slots: [],
}
