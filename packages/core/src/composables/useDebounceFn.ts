/**
 * useDebounceFn — 防抖 composable
 *
 * 包装函数为防抖版本，跨 5+ 个项目存在手动 setTimeout/clearTimeout 实现。
 * 此 composable 统一替代。
 *
 * 用法：
 *   const debouncedSearch = useDebounceFn((query: string) => {
 *     fetchData(query)
 *   }, 300)
 */
import { ref, onUnmounted } from 'vue'

export function useDebounceFn<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay = 300,
): (...args: Parameters<T>) => void {
  const timer = ref<ReturnType<typeof setTimeout> | null>(null)

  function debounced(...args: Parameters<T>) {
    if (timer.value) clearTimeout(timer.value)
    timer.value = setTimeout(() => {
      fn(...args)
      timer.value = null
    }, delay)
  }

  onUnmounted(() => {
    if (timer.value) clearTimeout(timer.value)
  })

  return debounced
}
