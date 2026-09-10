<script setup lang="ts">
/**
 * StreamStatusBanner — 流式连接状态条（断线重试等）
 */
withDefaults(
  defineProps<{
    /** 连接 / 流状态 */
    status: 'idle' | 'connecting' | 'reconnecting' | 'disconnected' | 'streaming'
    /** 主文案 */
    message?: string
    /** 重试按钮文案 */
    retryLabel?: string
    /** 是否显示重试 */
    showRetry?: boolean
  }>(),
  {
    showRetry: true,
    retryLabel: '重试',
  },
)

const emit = defineEmits<{
  retry: []
}>()
</script>

<template>
  <div
    v-if="status === 'disconnected' || status === 'reconnecting' || status === 'connecting'"
    class="apf-stream-banner"
    :class="`is-${status}`"
    role="status"
  >
    <span class="apf-stream-banner__text">{{ message || status }}</span>
    <button
      v-if="showRetry && status === 'disconnected'"
      type="button"
      class="apf-stream-banner__retry"
      @click="emit('retry')"
    >
      {{ retryLabel }}
    </button>
  </div>
</template>

<style scoped>
.apf-stream-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-12px, 12px);
  padding: var(--spacing-sm, 8px) var(--spacing-md, 16px);
  border-bottom: 1px solid var(--border-color-light, #ebeef5);
  font-size: var(--font-size-12, 12px);
}

.apf-stream-banner.is-disconnected {
  background: var(--el-color-danger-light-9, #fef0f0);
  color: var(--el-color-danger, #f56c6c);
}

.apf-stream-banner.is-reconnecting,
.apf-stream-banner.is-connecting {
  background: var(--el-color-warning-light-9, #fdf6ec);
  color: var(--el-color-warning, #e6a23c);
}

.apf-stream-banner__text {
  min-width: 0;
}

.apf-stream-banner__retry {
  flex: none;
  border: 1px solid currentColor;
  border-radius: var(--border-radius-md, 4px);
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-size: var(--font-size-12, 12px);
  padding: 4px 10px;
}

.apf-stream-banner__retry:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>
