/**
 * ExpertPicker 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** ExpertPicker 文档 */
export const ExpertPickerDoc: ComponentDoc = {
  name: 'ExpertPicker',
  titleZh: '专家选择器',
  description:
    'Composer 工具行用的紧凑专家下拉（通用 + 平台 expertId）。纯 props；与卡片式 AssistantPicker 互补。库不写死专家 id。',
  props: [
    { name: 'experts', type: 'ExpertPickerItem[]', required: true, description: '可选专家（id / label / description）' },
    { name: 'modelValue', type: 'string | null', required: true, description: '当前专家 id；null 表示通用' },
    { name: 'loading', type: 'boolean', description: '加载中禁用选择' },
    { name: 'generalLabel', type: 'string', description: '通用选项文案，默认「通用」' },
    { name: 'placeholder', type: 'string', description: '占位文案，默认「专家」' },
  ],
  emits: [
    { name: 'update:modelValue', payload: 'value: string | null', description: '选中变更；空=通用' },
  ],
  slots: [],
}
