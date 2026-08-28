<script setup lang="ts">
/**
 * TruncatedTooltipText — 截断文本 + tooltip
 */
import { useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

withDefaults(
  defineProps<{
    /** tooltip 完整内容 */
    content: string
    placement?: 'top' | 'bottom' | 'left' | 'right'
    maxWidth?: number
  }>(),
  {
    placement: 'top',
    maxWidth: 360,
  },
)

const attrs = useAttrs()
</script>

<template>
  <el-tooltip
    :content="content"
    :placement="placement"
    :show-after="200"
    :popper-style="{ maxWidth: `${maxWidth}px`, wordBreak: 'break-word', whiteSpace: 'pre-wrap' }"
  >
    <span class="apf-truncated-text" :class="attrs.class" :style="attrs.style as Record<string, string> | undefined">
      <slot>{{ content }}</slot>
    </span>
  </el-tooltip>
</template>

<style scoped>
.apf-truncated-text {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}
</style>
