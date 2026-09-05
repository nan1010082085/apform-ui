/**
 * useClipboard — 文本剪贴板 composable
 *
 * 优先 navigator.clipboard，降级 execCommand('copy')。
 * 反馈可选；默认不强制 ElMessage，由宿主决定。
 */

export interface UseClipboardOptions {
  /** 成功回调 */
  onSuccess?: (text: string) => void
  /** 失败回调 */
  onError?: (error: unknown) => void
}

/**
 * 创建剪贴板工具
 * @param options 可选回调
 */
export function useClipboard(options: UseClipboardOptions = {}) {
  /**
   * 降级复制
   * @param text 文本
   */
  function fallbackCopy(text: string): void {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0'
    document.body.appendChild(textarea)
    textarea.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(textarea)
    if (!ok) throw new Error('execCommand copy failed')
  }

  /**
   * 复制文本到剪贴板
   * @param text 文本
   */
  async function copy(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        fallbackCopy(text)
      }
      options.onSuccess?.(text)
      return true
    } catch (err) {
      try {
        fallbackCopy(text)
        options.onSuccess?.(text)
        return true
      } catch (fallbackErr) {
        options.onError?.(fallbackErr ?? err)
        return false
      }
    }
  }

  /**
   * 读取剪贴板文本（需权限）
   */
  async function read(): Promise<string | null> {
    try {
      if (!navigator.clipboard?.readText) return null
      return await navigator.clipboard.readText()
    } catch {
      return null
    }
  }

  return { copy, read }
}
