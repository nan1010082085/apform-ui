<script setup lang="ts">
/**
 * TextPreviewCard — 文本 / JSON 预览
 */
import { computed } from 'vue'
import { useClipboard } from '../../composables/useClipboard'

const props = withDefaults(
  defineProps<{
    text: string
    label?: string
    size?: 'compact' | 'default'
    maxHeight?: string
  }>(),
  { size: 'default', maxHeight: '240px' },
)

const { copy } = useClipboard()

const compactText = computed(() => props.text.replace(/\s+/g, ' ').trim().slice(0, 64))

async function onCopy() {
  await copy(props.text)
}
</script>

<template>
  <div v-if="size === 'compact'" class="apf-text-preview apf-text-preview--compact">
    {{ compactText }}
  </div>
  <div v-else class="apf-text-preview">
    <div class="apf-text-preview__head">
      <span class="apf-text-preview__label">{{ label || '文本' }}</span>
      <button type="button" class="apf-text-preview__copy" @click.stop="onCopy">复制</button>
    </div>
    <pre class="apf-text-preview__body" :style="{ maxHeight }">{{ text }}</pre>
  </div>
</template>

<style scoped>
.apf-text-preview {
  border: 1px solid var(--apf-border-color, var(--el-border-color-extra-light, #f2f3f5));
  border-radius: 6px;
  padding: 8px 10px;
  background: var(--apf-bg-page, var(--el-bg-color-page, #f5f7fa));
}

.apf-text-preview--compact {
  border: none;
  padding: 0;
  background: transparent;
  font-size: 11px;
  color: var(--apf-text-secondary, var(--el-text-color-secondary, #909399));
  line-height: 1.4;
}

.apf-text-preview__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 4px;
}

.apf-text-preview__label {
  font-size: 11px;
  color: var(--apf-text-secondary, var(--el-text-color-secondary, #909399));
}

.apf-text-preview__copy {
  border: none;
  background: transparent;
  color: var(--apf-color-primary, var(--el-color-primary));
  font-size: 11px;
  cursor: pointer;
  padding: 0;
}

.apf-text-preview__body {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 12px;
  line-height: 1.5;
  overflow: auto;
  font-family: inherit;
}
</style>
