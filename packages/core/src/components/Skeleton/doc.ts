/**
 * Skeleton 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** Skeleton 文档 */
export const SkeletonDoc: ComponentDoc = {
  name: 'Skeleton',
  titleZh: '骨架屏',
  description: '列表 / 卡片 / 表格加载占位；三种 variant 预设，可开关 shimmer 动画。',
  props: [
    {
      name: 'variant',
      type: "'card' | 'list' | 'table'",
      default: "'card'",
      description: '骨架形态',
    },
    {
      name: 'count',
      type: 'number',
      default: '3',
      description: 'card/list 模式下的项数',
    },
    {
      name: 'rows',
      type: 'number',
      default: '5',
      description: 'table 模式下的行数',
    },
    {
      name: 'animated',
      type: 'boolean',
      default: 'true',
      description: '是否开启动画',
    },
  ],
}
