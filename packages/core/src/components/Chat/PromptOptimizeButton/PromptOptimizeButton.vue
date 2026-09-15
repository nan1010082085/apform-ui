<script setup lang="ts">
/**
 * PromptOptimizeButton — 提示词优化按钮（纯 UI，不发起网络请求）
 */
import type { ControlShape } from './types'

withDefaults(
  defineProps<{
    /** 是否禁用 */
    disabled?: boolean
    /** 是否加载中 */
    loading?: boolean
    /** 悬停提示 */
    tooltip?: string
    /**
     * 按钮外形。平台侧常用 square，终端聊天常用 round。
     * 默认 square，与历史 6px 圆角方块一致。
     */
    shape?: ControlShape
  }>(),
  {
    disabled: false,
    loading: false,
    tooltip: '优化提示词',
    shape: 'square',
  },
)

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

/**
 * @param event 原生点击事件
 */
function onClick(event: MouseEvent) {
  if (event.defaultPrevented) return
  emit('click', event)
}
</script>

<template>
  <button
    type="button"
    class="apf-optimize-btn"
    :class="shape === 'round' ? 'apf-optimize-btn--round' : 'apf-optimize-btn--square'"
    :disabled="disabled || loading"
    :aria-busy="loading"
    :aria-label="tooltip"
    :title="tooltip"
    @click="onClick"
  >
    <span v-if="loading" class="apf-optimize-spin" aria-hidden="true" />
    <span v-else aria-hidden="true">✨</span>
  </button>
</template>

<style scoped>
.apf-optimize-btn {
  flex: none;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  padding: 0;
  border: 1px solid var(--c-border);
  background: transparent;
  color: var(--c-text-muted, #999);
  cursor: pointer;
  font-size: var(--font-size-14, 14px);
  line-height: 1;
}
.apf-optimize-btn--square {
  border-radius: 6px;
}
.apf-optimize-btn--round {
  border-radius: 50%;
}
/**
 * Hover 与业务侧图标按钮对齐：可用 --apf-icon-btn-hover-* 覆盖，
 * 避免实色 primary 与半透明描边两套观感不一致。
 */
.apf-optimize-btn:hover:not(:disabled) {
  border-color: var(--apf-icon-btn-hover-border, var(--c-primary, #0060A2));
  color: var(--apf-icon-btn-hover-color, var(--c-primary, #0060A2));
  box-shadow: var(--apf-icon-btn-hover-shadow, none);
}
.apf-optimize-btn:disabled {
  cursor: not-allowed;
  opacity: .55;
}
.apf-optimize-spin {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(13, 107, 103, .2);
  border-top-color: var(--c-primary, #0060A2);
  border-radius: 50%;
  animation: apf-optimize-spin .7s linear infinite;
}
@keyframes apf-optimize-spin {
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .apf-optimize-spin {
    animation: none;
    border-top-color: rgba(13, 107, 103, .45);
  }
}
</style>
