/**
 * useClipboard 文档元数据
 */
import type { ComponentDoc } from '../docs/types'

/** useClipboard 文档 */
export const useClipboardDoc: ComponentDoc = {
  name: 'useClipboard',
  titleZh: '剪贴板',
  kind: 'composable',
  description: '复制/读取文本；优先 clipboard API，降级 execCommand。反馈由宿主决定。',
  params: [
    { name: 'options.onSuccess', type: '(text: string) => void', description: '复制成功回调' },
    { name: 'options.onError', type: '(error: unknown) => void', description: '复制失败回调' },
  ],
  returns: [
    { name: 'copy', type: '(text: string) => Promise<boolean>', description: '复制文本，成功返回 true' },
    { name: 'read', type: '() => Promise<string | null>', description: '读取剪贴板（需权限）' },
  ],
}
