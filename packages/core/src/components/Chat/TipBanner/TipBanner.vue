<script setup lang="ts">
/**
 * TipBanner — 消息提示条（纯 UI）
 */
import { AppIcon } from '../../AppIcon'

withDefaults(
  defineProps<{
    text: string
    icon?: string
  }>(),
  { icon: 'info-filled' },
)
</script>

<template>
  <div class="apf-tip-banner">
    <AppIcon :name="icon" class="apf-tip-banner__icon" :size="18" />
    <span class="apf-tip-banner__text">{{ text }}</span>
  </div>
</template>

<style scoped>
.apf-tip-banner {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background: var(--c-primary-soft, #e8f4ff);
  color: var(--c-text-secondary, #666);
  font-size: 13px;
  line-height: 1.5;
}

.apf-tip-banner__icon {
  flex-shrink: 0;
  margin-top: 1px;
  color: var(--c-primary, #0060a2);
}

.apf-tip-banner__text {
  min-width: 0;
}
</style>
