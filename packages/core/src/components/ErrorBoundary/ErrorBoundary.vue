<script lang="ts">
import { defineComponent, ref, onErrorCaptured, computed, h } from 'vue'
import { ElButton } from 'element-plus'

export default defineComponent({
  name: 'ErrorBoundary',
  props: {
    /** 自定义上下文信息，用于错误日志 */
    context: { type: String, default: '' },
    /** 错误回调 */
    onError: {
      type: Function as unknown as () => ((info: { context?: string; error: Error }) => void) | undefined,
      default: undefined,
    },
  },
  setup(props, { slots, expose }) {
    const hasError = ref(false)
    const error = ref<Error | null>(null)
    const retryCounter = ref(0)

    onErrorCaptured((err) => {
      hasError.value = true
      error.value = err instanceof Error ? err : new Error(String(err))
      console.error(`[ErrorBoundary] ${props.context}`, err)
      if (props.onError) {
        props.onError({ context: props.context, error: error.value })
      }
      return false
    })

    function retry() {
      hasError.value = false
      error.value = null
      retryCounter.value++
    }

    expose({ hasError, error, retryCounter, retry })

    return () => {
      if (hasError.value) {
        return h('div', { class: 'apf-error-boundary' }, [
          h('div', { class: 'apf-error-boundary__inner' }, [
            h('div', { class: 'apf-error-boundary__header' }, [
              h('span', { class: 'apf-error-boundary__icon' }, '!'),
              h('span', { class: 'apf-error-boundary__title' }, 'Render Error'),
            ]),
            props.context
              ? h('div', { class: 'apf-error-boundary__info' }, props.context)
              : null,
            h('div', { class: 'apf-error-boundary__message' }, error.value?.message ?? 'Unknown error'),
            h(ElButton, { size: 'small', type: 'primary', onClick: retry }, () => 'Retry'),
          ]),
        ])
      }

      const children = slots.default?.()
      if (!children) return null

      return h('div', { key: retryCounter.value, style: { display: 'contents' } }, children)
    }
  },
})
</script>

<style>
.apf-error-boundary {
  padding: var(--spacing-md, 16px);
  border: 1px solid var(--color-danger-light, #FF6B55);
  border-radius: var(--border-radius-md, 4px);
  background: var(--color-danger-bg, rgba(255, 1, 1, 0.08));
}

.apf-error-boundary__inner {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm, 8px);
}

.apf-error-boundary__header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm, 8px);
}

.apf-error-boundary__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--icon-size-lg, 20px); height: var(--icon-size-lg, 20px);
  border-radius: 50%;
  background: var(--color-danger, #E50113);
  color: #fff;
  font-size: var(--font-size-12, 12px);
  font-weight: var(--font-weight-bold, 700);
}

.apf-error-boundary__title {
  font-weight: var(--font-weight-semibold, 600);
  color: var(--color-danger, #E50113);
}

.apf-error-boundary__info {
  font-size: var(--font-size-12, 12px);
  color: var(--text-color-muted, #909399);
}

.apf-error-boundary__message {
  font-size: var(--font-size-13, 13px);
  color: var(--text-color-regular, #606266);
  font-family: var(--font-family-mono, monospace);
  word-break: break-all;
}
</style>
