/**
 * resolveApiErrorMessage — API 错误消息标准化
 *
 * 将各种格式的 API 错误转换为人类可读的错误消息。
 * 来自 editor 项目，在 flow/ai 项目中有类似但不一致的实现。
 *
 * 用法：
 *   try {
 *     await apiCall()
 *   } catch (e) {
 *     msg.error(resolveApiErrorMessage(e))
 *   }
 */
export interface ApiError {
  code?: string
  message?: string
  errors?: Record<string, string[]>
}

/**
 * 从错误对象中提取可读的错误消息
 */
export function resolveApiErrorMessage(error: unknown): string {
  // null / undefined
  if (!error) return '操作失败'

  // 字符串
  if (typeof error === 'string') return error

  // Error 对象
  if (error instanceof Error) return error.message || '操作失败'

  // API 错误对象
  if (typeof error === 'object') {
    const apiError = error as ApiError

    // 有 message 字段
    if (apiError.message) return apiError.message

    // 有 validation errors
    if (apiError.errors && typeof apiError.errors === 'object') {
      const messages: string[] = []
      for (const field of Object.values(apiError.errors)) {
        if (Array.isArray(field)) {
          messages.push(...field)
        }
      }
      if (messages.length > 0) return messages.join('；')
    }

    // 有 code
    if (apiError.code) return `错误码：${apiError.code}`
  }

  return '操作失败'
}
