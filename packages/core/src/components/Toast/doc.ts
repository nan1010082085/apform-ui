/**
 * Toast 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** Toast 文档 */
export const ToastDoc: ComponentDoc = {
  name: 'Toast',
  titleZh: '轻提示',
  description:
    '轻提示宿主：无声明式 props。挂载后通过 ref.show(message, type?, duration?) 展示；也可配合 useToast / provideToast。',
  props: [
    {
      name: 'show',
      type: "(message: string, type?: 'info' | 'success' | 'error' | 'warning', duration?: number) => void",
      description: '组件 expose 方法（非 prop）：通过 ref 调用以展示一条 Toast；type 默认 info，duration 默认 3000',
    },
  ],
  emits: [],
  slots: [],
}
