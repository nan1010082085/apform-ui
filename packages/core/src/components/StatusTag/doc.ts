/**
 * StatusTag 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** StatusTag 文档 */
export const StatusTagDoc: ComponentDoc = {
  name: 'StatusTag',
  description: '状态标签，基于 el-tag，内置审批 / 通用 / 流程状态色映射。',
  whenToUse: '列表或详情中展示业务状态时使用。',
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
