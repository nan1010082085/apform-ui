/**
 * MetricChart 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** MetricChart 文档 */
export const MetricChartDoc: ComponentDoc = {
  name: 'MetricChart',
  titleZh: '指标图表',
  description: '基于 ECharts 的指标图表卡，支持 full/spark、阈值线与单位格式化。',
  props: [
    { name: 'title', type: 'string', required: true, description: '图表标题' },
    {
      name: 'unit',
      type: "'count' | 'ms' | 'percent' | 'currency' | 'tokens' | 'bytes'",
      required: true,
      description: '数值单位',
    },
    { name: 'series', type: 'MetricSeries[]', required: true, description: '数据系列' },
    {
      name: 'type',
      type: "'line' | 'bar' | 'area'",
      default: "'line'",
      description: '图表类型',
    },
    { name: 'thresholds', type: 'MetricThreshold[]', description: '阈值参考线' },
    {
      name: 'variant',
      type: "'full' | 'spark'",
      default: "'full'",
      description: '全量/迷你',
    },
    { name: 'height', type: 'number', description: '高度，full 默认 280，spark 默认 32' },
    { name: 'loading', type: 'boolean', default: 'false', description: '加载态' },
    { name: 'yAxisMin', type: 'number', description: 'Y 轴最小值' },
    { name: 'yAxisMax', type: 'number', description: 'Y 轴最大值' },
  ],
  emits: [{ name: 'chart-click', payload: 'any', description: 'ECharts click 透传' }],
  slots: [
    { name: 'header-actions', description: '标题右侧操作区' },
    { name: 'empty', description: '无数据替代内容' },
  ],
}
