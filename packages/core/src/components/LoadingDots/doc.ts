/**
 * LoadingDots 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** LoadingDots 文档 */
export const LoadingDotsDoc: ComponentDoc = {
  name: 'LoadingDots',
  titleZh: '三点加载',
  description: '三点跳动加载指示，用于对话输入中、轻量异步等待等场景。',
  props: [
    {
      name: 'size',
      type: 'number',
      description: '圆点尺寸（px）；默认走组件内 CSS',
    },
  ],
}
