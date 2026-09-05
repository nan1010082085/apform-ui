<script setup lang="ts">
/**
 * HintText — 问号提示
 *
 * - 传入 content：轻量 tooltip（对齐 meeting FieldTip）
 * - 默认 slot：Popover 富内容
 */
import { AppIcon } from '../AppIcon'

withDefaults(
  defineProps<{
    /** 纯文本提示（有则走 tooltip，兼容 FieldTip） */
    content?: string
    /** popover 宽度（slot 模式） */
    width?: number | string
  }>(),
  { width: 240 },
)
</script>

<template>
  <el-tooltip
    v-if="content"
    :content="content"
    placement="top"
    :show-after="200"
  >
    <span class="apf-hint-trigger" tabindex="0" :aria-label="content">
      <AppIcon name="question-filled" :size="14" />
    </span>
  </el-tooltip>
  <el-popover
    v-else
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
  cursor: help;
  color: var(--text-color-placeholder, #c0c4cc);
  transition: color 0.15s;
  vertical-align: middle;
  margin-left: var(--spacing-xs, 4px);
}

.apf-hint-trigger:hover,
.apf-hint-trigger:focus {
  color: var(--color-primary, #0060a2);
  outline: none;
}

.apf-hint-content {
  font-size: var(--font-size-12, 12px);
  color: var(--text-color-regular, #606266);
  line-height: 1.6;
  word-break: break-word;
}
</style>
