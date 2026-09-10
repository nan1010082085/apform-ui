/**
 * useToast 文档元数据
 */
import type { ComponentDoc } from '../docs/types'

/** useToast 文档 */
export const useToastDoc: ComponentDoc = {
  name: 'useToast',
  titleZh: '轻提示',
  kind: 'composable',
  description: '编程式 Toast。需在根组件放置 <Toast> 并 provideToast(ref)。',
  params: [],
  returns: [
    { name: 'show', type: '(message, type?, duration?) => void', description: '通用提示；type 默认 info' },
    { name: 'info', type: '(message, duration?) => void', description: '信息提示' },
    { name: 'success', type: '(message, duration?) => void', description: '成功提示' },
    { name: 'warning', type: '(message, duration?) => void', description: '警告提示' },
    { name: 'error', type: '(message, duration?) => void', description: '错误提示' },
  ],
}
