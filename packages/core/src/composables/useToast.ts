/**
 * useToast — Toast 编程式调用
 *
 * 用法：
 *   1. 在 App 根组件放置 <Toast ref="toastRef" />
 *   2. 调用 provideToast(toastRef) 注入
 *   3. 任意子组件调用 const { show } = useToast()
 *   4. show('操作成功', 'success')
 */
import { inject, type Ref } from 'vue'
import type { ToastItem } from '../components/Toast/Toast.vue'

interface ToastExpose {
  show: (message: string, type?: ToastItem['type'], duration?: number) => void
}

const TOAST_KEY = Symbol('fg-toast')

export function provideToast(ref: Ref<ToastExpose | undefined>) {
  return { [TOAST_KEY]: ref }
}

export function useToast() {
  const toastRef = inject<Ref<ToastExpose | undefined>>(TOAST_KEY)

  return {
    show(message: string, type: ToastItem['type'] = 'info', duration?: number) {
      toastRef?.value?.show(message, type, duration)
    },
    info(message: string, duration?: number) {
      toastRef?.value?.show(message, 'info', duration)
    },
    success(message: string, duration?: number) {
      toastRef?.value?.show(message, 'success', duration)
    },
    warning(message: string, duration?: number) {
      toastRef?.value?.show(message, 'warning', duration)
    },
    error(message: string, duration?: number) {
      toastRef?.value?.show(message, 'error', duration)
    },
  }
}
