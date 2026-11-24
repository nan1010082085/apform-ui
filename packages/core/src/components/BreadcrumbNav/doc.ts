/**
 * BreadcrumbNav 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** BreadcrumbNav 文档 */
export const BreadcrumbNavDoc: ComponentDoc = {
  name: 'BreadcrumbNav',
  titleZh: '面包屑导航',
  description:
    'props 驱动的面包屑；无 vue-router 硬依赖。可点击项通过 navigate 事件抛出路径，由宿主自行跳转。',
  props: [
    {
      name: 'items',
      type: 'BreadcrumbNavItem[]',
      required: true,
      description: '面包屑项：label 必填；to 可选，末项通常不带 to',
    },
  ],
  emits: [
    {
      name: 'navigate',
      payload: 'to: string',
      description: '点击非末项且带 to 时触发',
    },
  ],
}
