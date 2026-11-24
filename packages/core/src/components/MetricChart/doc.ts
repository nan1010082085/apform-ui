/**
 * MetricChart 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** MetricChart 文档 */
export const MetricChartDoc: ComponentDoc = {
  name: 'MetricChart',
  titleZh: '指标图',
  description:
    'ECharts 指标图（optional peer）。variant=full|spark。缺 echarts 时显示空态，不抛错。series: { name, data: [ts, value][], color?, area? }[]。',
  props: [
    { name: 'title', type: 'string', required: true, description: '标题' },
    { name: 'unit', type: 'MetricUnit', required: true, description: '单位' },
    { name: 'series', type: 'MetricSeries[]', required: true, description: '序列' },
    { name: 'type', type: "'line'|'bar'|'area'", default: 'line', description: '图类型' },
    { name: 'thresholds', type: 'MetricThreshold[]', description: '阈值线' },
    { name: 'variant', type: "'full'|'spark'", default: 'full', description: '完整/迷你' },
    { name: 'height', type: 'number', description: '高度 px' },
    { name: 'loading', type: 'boolean', default: 'false', description: '加载中' },
    { name: 'yAxisMin', type: 'number', description: 'Y 轴最小' },
    { name: 'yAxisMax', type: 'number', description: 'Y 轴最大' },
  ],
}
