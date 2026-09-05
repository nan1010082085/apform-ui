/**
 * StatusTag 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** StatusTag 文档 */
export const StatusTagDoc: ComponentDoc = {
  name: 'StatusTag',
  titleZh: '状态标签',
  description: '基于 el-tag 的状态标签，内置审批、通用、流程等常用状态色映射。',
  props: [
    { name: 'status', type: 'string', required: true, description: '状态值（匹配内置或自定义映射）' },
    {
      name: 'statusMap',
      type: 'Record<string, StatusConfig>',
      description: '自定义状态映射，合并到默认映射',
    },
    { name: 'round', type: 'boolean', default: 'true', description: '是否圆角' },
    {
      name: 'size',
      type: "'large' | 'default' | 'small'",
      default: "'default'",
      description: '尺寸',
    },
  ],
  emits: [],
  slots: [],
}
