/**
 * useChatScroll — 聊天滚动管理 composable
 *
 * 提供聊天消息列表的自动滚动和滚动到底部功能。
 * 适用于聊天组件中的消息列表滚动管理。
 */

import { ref, nextTick, onMounted, onUnmounted, type Ref } from 'vue'

export interface UseChatScrollOptions {
  /** 滚动容器的 ref */
  containerRef: Ref<HTMLElement | null>
  /** 是否在新消息时自动滚动到底部 */
  autoScroll?: boolean
  /** 滚动行为 */
  behavior?: ScrollBehavior
  /** 滚动偏移量（像素） */
  offset?: number
}

export interface UseChatScrollReturn {
  /** 滚动到底部；force 为 true 时忽略 autoScroll 开关 */
  scrollToBottom: (force?: boolean) => Promise<void>
  /** 滚动到指定位置 */
  scrollTo: (position: number) => void
  /** 是否在底部 */
  isAtBottom: Ref<boolean>
  /** 是否启用自动滚动 */
  autoScrollEnabled: Ref<boolean>
  /** 检查是否在底部 */
  checkIfAtBottom: () => boolean
  /** 启用自动滚动 */
  enableAutoScroll: () => void
  /** 禁用自动滚动 */
  disableAutoScroll: () => void
}

export function useChatScroll(options: UseChatScrollOptions): UseChatScrollReturn {
  const {
    containerRef,
    autoScroll = true,
    behavior = 'smooth',
    offset = 50,
  } = options

  const isAtBottom = ref(true)
  const autoScrollEnabled = ref(autoScroll)

  /**
   * 检查是否在底部
   */
  function checkIfAtBottom(): boolean {
    const container = containerRef.value
    if (!container) return true

    const { scrollTop, scrollHeight, clientHeight } = container
    return scrollHeight - scrollTop - clientHeight < offset
  }

  /**
   * 滚动到底部
   */
  async function scrollToBottom(force = true): Promise<void> {
    if (!force && !autoScrollEnabled.value) return

    await nextTick()
    const container = containerRef.value
    if (!container) return

    container.scrollTo({
      top: container.scrollHeight,
      behavior,
    })
  }

  /**
   * 滚动到指定位置
   */
  function scrollTo(position: number): void {
    const container = containerRef.value
    if (!container) return

    container.scrollTo({
      top: position,
      behavior,
    })
  }

  /**
   * 启用自动滚动
   */
  function enableAutoScroll(): void {
    autoScrollEnabled.value = true
  }

  /**
   * 禁用自动滚动
   */
  function disableAutoScroll(): void {
    autoScrollEnabled.value = false
  }

  /**
   * 处理滚动事件
   */
  function handleScroll(): void {
    isAtBottom.value = checkIfAtBottom()
    
    // 如果用户滚动到底部附近，重新启用自动滚动
    if (isAtBottom.value) {
      autoScrollEnabled.value = true
    }
  }

  // 生命周期
  onMounted(() => {
    const container = containerRef.value
    if (container) {
      container.addEventListener('scroll', handleScroll)
      // 初始检查
      isAtBottom.value = checkIfAtBottom()
    }
  })

  onUnmounted(() => {
    const container = containerRef.value
    if (container) {
      container.removeEventListener('scroll', handleScroll)
    }
  })

  return {
    scrollToBottom,
    scrollTo,
    isAtBottom,
    autoScrollEnabled,
    checkIfAtBottom,
    enableAutoScroll,
    disableAutoScroll,
  }
}