/**
 * 防抖函数
 *
 * @param fn - 要防抖的函数
 * @param delay - 延迟毫秒数（默认 300）
 * @param immediate - 是否立即执行（默认 false）
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay = 300,
  immediate = false,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null

  return function (this: unknown, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer)

    if (immediate && !timer) {
      fn.apply(this, args)
    }

    timer = setTimeout(() => {
      if (!immediate) fn.apply(this, args)
      timer = null
    }, delay)
  }
}
