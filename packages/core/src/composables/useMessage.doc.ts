/**
 * useMessage 文档元数据
 */
import type { ComponentDoc } from '../docs/types'

/** useMessage 文档 */
export const useMessageDoc: ComponentDoc = {
  name: 'useMessage',
  titleZh: '消息提示',
  kind: 'composable',
  description: '封装 ElMessage，提供 success/error/warning/info。',
  params: [],
  returns: [
    { name: 'success', type: '(message, options?) => void', description: '成功消息' },
    { name: 'error', type: '(message, options?) => void', description: '错误消息' },
    { name: 'warning', type: '(message, options?) => void', description: '警告消息' },
    { name: 'info', type: '(message, options?) => void', description: '信息消息' },
  ],
}
