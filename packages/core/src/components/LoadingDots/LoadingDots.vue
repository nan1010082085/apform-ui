<script setup lang="ts">
/**
 * LoadingDots — 三点跳动加载指示
 */
defineProps<{
  /** 圆点尺寸（px） */
  size?: number
}>()
</script>

<template>
  <span class="apf-loading-dots" aria-label="加载中" role="status">
    <span
      v-for="i in 3"
      :key="i"
      class="apf-loading-dots__dot"
      :style="size ? { width: size + 'px', height: size + 'px' } : undefined"
    />
  </span>
</template>

<style scoped>
.apf-loading-dots {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs, 4px);
}

.apf-loading-dots__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-primary, #0060a2);
  animation: apf-dot-bounce 1.2s ease-in-out infinite;
}

.apf-loading-dots__dot:nth-child(2) {
  animation-delay: 0.15s;
}

.apf-loading-dots__dot:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes apf-dot-bounce {
  0%,
  80%,
  100% {
    opacity: 0.35;
    transform: translateY(0);
  }
  40% {
    opacity: 1;
    transform: translateY(-3px);
  }
}
</style>
