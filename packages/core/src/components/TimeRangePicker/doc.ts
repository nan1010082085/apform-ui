/**
 * TimeRangePicker 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** TimeRangePicker 文档 */
export const TimeRangePickerDoc: ComponentDoc = {
  name: 'TimeRangePicker',
  titleZh: '时间范围选择器',
  description: '监控全局时间范围选择器，支持快捷预设与自定义 datetimerange。',
  props: [
    { name: 'modelValue', type: 'TimeRange', required: true, description: '当前时间范围' },
    { name: 'showPresets', type: 'boolean', default: 'true', description: '显示快捷按钮组' },
    {
      name: 'presets',
      type: 'TimeRangePreset[]',
      default: "['5m','15m','1h','6h','24h','7d']",
      description: '快捷预设列表',
    },
    { name: 'allowCustom', type: 'boolean', default: 'true', description: '允许自定义范围' },
    {
      name: 'size',
      type: "'small' | 'default' | 'large'",
      default: "'default'",
      description: '尺寸',
    },
    { name: 'disabled', type: 'boolean', default: 'false', description: '禁用' },
  ],
  emits: [
    { name: 'update:modelValue', payload: 'TimeRange', description: 'v-model' },
    { name: 'change', payload: 'TimeRange', description: '值变化' },
  ],
  slots: [],
}
