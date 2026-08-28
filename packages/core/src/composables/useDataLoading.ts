/**
 * useDataLoading — 数据加载状态管理 Composable
 *
 * 统一各子应用的数据加载模式：
 * - 仅在数据获取区域显示 loading（配合 v-loading 使用）
 * - 支持超时检测和重试
 * - 支持多请求并发
 *
 * @example
 * ```ts
 * const { loading, error, withLoading } = useDataLoading()
 *
 * async function fetchData() {
 *   await withLoading(async () => {
 *     data.value = await api.getData()
 *   })
 * }
 * ```
 *
 * 模板中：
 * ```vue
 * <div v-loading="loading">...</div>
 * ```
 */
import { ref, computed, type Ref, type ComputedRef } from 'vue'

/** useDataLoading 配置项 */
export interface UseDataLoadingOptions {
  /** 超时时间（ms），超时后 timedOut 变为 true */
  timeout?: number
  /** 是否静默处理错误（不设置 error ref） */
  silentError?: boolean
}

/** useDataLoading 返回值 */
export interface UseDataLoadingReturn {
  /** 加载状态（直接用于 v-loading） */
  loading: Ref<boolean>
  /** 错误信息 */
  error: Ref<string | null>
  /** 是否超时 */
  timedOut: Ref<boolean>
  /** 是否有错误 */
  hasError: ComputedRef<boolean>
  /** 包装异步函数，自动管理 loading/error 状态 */
  withLoading: <T>(fn: () => Promise<T>) => Promise<T | null>
  /** 重置状态 */
  reset: () => void
}

/**
 * 创建数据加载状态管理器
 *
 * @param options - 超时与静默错误配置
 * @returns loading / error / withLoading 等
 */
export function useDataLoading(options: UseDataLoadingOptions = {}): UseDataLoadingReturn {
  const { timeout = 15000, silentError = false } = options

  const loading = ref(false)
  const error = ref<string | null>(null)
  const timedOut = ref(false)
  const hasError = computed(() => error.value !== null)

  let timer: ReturnType<typeof setTimeout> | null = null
  let activeRequests = 0

  /** 开始一次加载（支持并发计数） */
  function startLoading() {
    activeRequests++
    if (activeRequests === 1) {
      loading.value = true
      error.value = null
      timedOut.value = false
      timer = setTimeout(() => {
        timedOut.value = true
      }, timeout)
    }
  }

  /** 结束一次加载 */
  function stopLoading() {
    activeRequests = Math.max(0, activeRequests - 1)
    if (activeRequests === 0) {
      loading.value = false
      timedOut.value = false
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    }
  }

  /**
   * 包装异步函数，自动管理 loading / error
   *
   * @param fn - 异步任务
   * @returns 成功时返回结果，失败时返回 null
   */
  async function withLoading<T>(fn: () => Promise<T>): Promise<T | null> {
    startLoading()
    try {
      const result = await fn()
      return result
    } catch (e: unknown) {
      if (!silentError) {
        error.value = e instanceof Error ? e.message : '加载失败'
      }
      return null
    } finally {
      stopLoading()
    }
  }

  /** 重置全部状态与计时器 */
  function reset() {
    activeRequests = 0
    loading.value = false
    error.value = null
    timedOut.value = false
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  return {
    loading,
    error,
    timedOut,
    hasError,
    withLoading,
    reset,
  }
}
