/**
 * ErrorBoundary 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** ErrorBoundary 文档 */
export const ErrorBoundaryDoc: ComponentDoc = {
  name: 'ErrorBoundary',
  titleZh: '错误边界',
  description: '捕获子树渲染错误并展示重试 UI；可通过 onError 上报。',
  props: [
    { name: 'context', type: 'string', default: "''", description: '错误上下文文案（日志与错误面板展示）' },
    {
      name: 'onError',
      type: '(info: { context?: string; error: Error }) => void',
      description: '捕获错误后的回调',
    },
  ],
  emits: [],
  slots: [
    { name: 'default', description: '被包裹的子内容；出错后替换为错误面板' },
  ],
}
