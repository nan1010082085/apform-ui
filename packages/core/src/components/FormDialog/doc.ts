/**
 * FormDialog 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** FormDialog 文档 */
export const FormDialogDoc: ComponentDoc = {
  name: 'FormDialog',
  titleZh: '表单对话框',
  description:
    '基于 AppDialog + el-form 的提交型弹窗：校验通过后 emit submit，取消关闭并 emit cancel。',
  props: [
    { name: 'modelValue', type: 'boolean', required: true, description: '是否显示' },
    { name: 'title', type: 'string', required: true, description: '标题' },
    { name: 'width', type: 'string', default: "'500px'", description: '对话框宽度' },
    { name: 'loading', type: 'boolean', default: 'false', description: '确认按钮加载态' },
    { name: 'labelWidth', type: 'string', default: "'100px'", description: 'el-form label 宽度' },
    {
      name: 'formData',
      type: 'Record<string, unknown>',
      required: true,
      description: '表单数据对象（提交时浅拷贝抛出）',
    },
    { name: 'rules', type: 'FormRules', default: '{}', description: 'Element Plus 校验规则' },
    {
      name: 'showFullscreenBtn',
      type: 'boolean',
      default: 'false',
      description: '是否显示全屏按钮',
    },
    { name: 'cancelText', type: 'string', default: "'取消'", description: '取消按钮文案' },
    { name: 'confirmText', type: 'string', default: "'确定'", description: '确认按钮文案' },
  ],
  emits: [
    { name: 'update:modelValue', payload: 'value: boolean', description: '开关同步' },
    { name: 'submit', payload: 'data: Record<string, unknown>', description: '校验通过后提交' },
    { name: 'cancel', description: '取消或关闭' },
  ],
  slots: [{ name: 'default', description: 'el-form-item 等表单字段' }],
}
