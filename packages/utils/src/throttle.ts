/**
 * 节流函数
 *
 * @param fn - 要节流的函数
 * @param interval - 间隔毫秒数（默认 300）
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  interval = 300,
): (...args: Parameters<T>) => void {
  let lastTime = 0

  return function (this: unknown, ...args: Parameters<T>) {
    const now = Date.now()
    if (now - lastTime >= interval) {
      lastTime = now
      fn.apply(this, args)
    }
  }
}
