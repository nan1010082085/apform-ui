<script setup lang="ts">
/**
 * HintText — 问号提示 Popover
 */
import { AppIcon } from '../AppIcon'

withDefaults(
  defineProps<{
    /** popover 宽度 */
    width?: number | string
  }>(),
  { width: 240 },
)
</script>

<template>
  <el-popover
    placement="top"
    :width="width"
    trigger="hover"
    :show-after="200"
    :popper-style="{ maxWidth: '320px' }"
  >
    <template #reference>
      <span class="apf-hint-trigger" aria-label="提示">
        <AppIcon name="question-filled" :size="14" />
      </span>
    </template>
    <div class="apf-hint-content">
      <slot />
    </div>
  </el-popover>
</template>

<style scoped>
.apf-hint-trigger {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  color: var(--text-color-placeholder, #c0c4cc);
  transition: color 0.15s;
  vertical-align: middle;
  margin-left: var(--spacing-xs, 4px);
}

.apf-hint-trigger:hover {
  color: var(--color-primary, #0060a2);
}

.apf-hint-content {
  font-size: var(--font-size-12, 12px);
  color: var(--text-color-regular, #606266);
  line-height: 1.6;
  word-break: break-word;
}
</style>
