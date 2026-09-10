/**
 * useDebounceFn 文档元数据
 */
import type { ComponentDoc } from '../docs/types'

/** useDebounceFn 文档 */
export const useDebounceFnDoc: ComponentDoc = {
  name: 'useDebounceFn',
  titleZh: '防抖函数',
  kind: 'composable',
  description: '将函数包装为防抖版本；组件卸载时自动清理定时器。',
  params: [
    { name: 'fn', type: '(...args) => unknown', required: true, description: '需要防抖的原函数' },
    { name: 'delay', type: 'number', default: '300', description: '防抖间隔（毫秒）' },
  ],
  returns: [
    { name: '(返回值)', type: '(...args: Parameters<T>) => void', description: '防抖后的函数，调用时重置计时器' },
  ],
}
