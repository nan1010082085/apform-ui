/**
 * ChartOptionPreview 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** ChartOptionPreview 文档 */
export const ChartOptionPreviewDoc: ComponentDoc = {
  name: 'ChartOptionPreview',
  titleZh: '图表 Option 预览',
  description:
    '渲染 chart-generate / Chat 产物中的 ECharts option；echarts 为 optional peer，未安装时 EmptyState。',
  props: [
    { name: 'option', type: 'Record<string, unknown>', required: true, description: 'ECharts setOption 配置' },
    { name: 'chartType', type: 'string', description: '图表类型标签（bar/line/pie 等）' },
    { name: 'height', type: 'number', default: '280', description: '画布高度 px' },
  ],
  emits: [],
  slots: [],
}
