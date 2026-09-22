/**
 * ModelPicker 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** ModelPicker 文档 */
export const ModelPickerDoc: ComponentDoc = {
  name: 'ModelPicker',
  titleZh: '模型选择器',
  description:
    '纯 props 模型下拉。业务注入 models（如平台 mimo-v2.6-flash 全模态默认、mimo-v2.6-pro 编码）；库不写死供应商或模型 id。',
  props: [
    { name: 'models', type: 'ModelPickerItem[]', required: true, description: '可选模型列表（id / name / provider）' },
    { name: 'modelValue', type: 'string | null', required: true, description: '当前选中模型 id' },
    { name: 'loading', type: 'boolean', description: '加载中禁用选择' },
  ],
  emits: [
    { name: 'update:modelValue', payload: 'value: string', description: '选中变更' },
  ],
  slots: [
  ],
}
