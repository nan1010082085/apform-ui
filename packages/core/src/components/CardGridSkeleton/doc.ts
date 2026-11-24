/**
 * CardGridSkeleton 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** CardGridSkeleton 文档 */
export const CardGridSkeletonDoc: ComponentDoc = {
  name: 'CardGridSkeleton',
  titleZh: '卡片网格骨架',
  description:
    '卡片列表加载占位（缩略图 + 标题 + 两行文案），替代各业务仓重复的 skeletonCard markup。',
  props: [
    { name: 'count', type: 'number', default: '6', description: '骨架卡片数量' },
    {
      name: 'showThumb',
      type: 'boolean',
      default: 'true',
      description: '是否显示缩略图区域',
    },
    {
      name: 'animated',
      type: 'boolean',
      default: 'true',
      description: '是否开启动画',
    },
  ],
}
