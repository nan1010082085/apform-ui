/**
 * ThresholdSlider 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** ThresholdSlider 文档 */
export const ThresholdSliderDoc: ComponentDoc = {
  name: 'ThresholdSlider',
  titleZh: '阈值滑块',
  description: '告警阈值配置滑块，按类型切换单位与范围。',
  props: [
    {
      name: 'type',
      type: "'errorRate' | 'latency' | 'eventCount' | 'timeout'",
      required: true,
      description: '阈值类型',
    },
    { name: 'modelValue', type: 'number', required: true, description: '当前值' },
    { name: 'showInput', type: 'boolean', default: 'true', description: '显示输入框' },
    { name: 'disabled', type: 'boolean', default: 'false', description: '禁用' },
  ],
  emits: [
    { name: 'update:modelValue', payload: 'number', description: 'v-model' },
    { name: 'change', payload: 'number', description: '松手确认' },
  ],
  slots: [],
}
