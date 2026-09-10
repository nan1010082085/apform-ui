/**
 * useDataLoading 文档元数据
 */
import type { ComponentDoc } from '../docs/types'

/** useDataLoading 文档 */
export const useDataLoadingDoc: ComponentDoc = {
  name: 'useDataLoading',
  titleZh: '数据加载状态',
  kind: 'composable',
  description: '统一 loading / error / 超时；withLoading 包装异步任务，可配 v-loading。',
  params: [
    { name: 'options.timeout', type: 'number', default: '15000', description: '超时毫秒；超时后 timedOut=true' },
    { name: 'options.silentError', type: 'boolean', default: 'false', description: '为 true 时不写入 error ref' },
  ],
  returns: [
    { name: 'loading', type: 'Ref<boolean>', description: '加载中（可用于 v-loading）' },
    { name: 'error', type: 'Ref<string | null>', description: '错误文案' },
    { name: 'timedOut', type: 'Ref<boolean>', description: '是否超时' },
    { name: 'hasError', type: 'ComputedRef<boolean>', description: '是否有错误' },
    { name: 'withLoading', type: '<T>(fn) => Promise<T | null>', description: '包装异步函数，自动管理状态' },
    { name: 'reset', type: '() => void', description: '重置全部状态' },
  ],
}
