/**
 * ServiceGrid 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** ServiceGrid 文档 */
export const ServiceGridDoc: ComponentDoc = {
  name: 'ServiceGrid',
  titleZh: '服务状态矩阵',
  description: '概览页服务健康矩阵，支持指标行与点击事件。',
  props: [
    { name: 'services', type: 'ServiceItem[]', required: true, description: '服务列表' },
    { name: 'columns', type: 'number', description: '列数，不传则响应式' },
    { name: 'loading', type: 'boolean', default: 'false', description: '骨架屏' },
  ],
  emits: [
    { name: 'service-click', payload: 'ServiceItem', description: '点击服务块' },
  ],
  slots: [],
}
