/**
 * BreadcrumbNav 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** BreadcrumbNav 文档 */
export const BreadcrumbNavDoc: ComponentDoc = {
  name: 'BreadcrumbNav',
  description: 'BreadcrumbNav 组件。',
  props: [
    { name: 'items', type: 'BreadcrumbNavItem[]', required: true, description: 'items' },
  ],
  emits: [
  ],
  slots: [
  ],
}
