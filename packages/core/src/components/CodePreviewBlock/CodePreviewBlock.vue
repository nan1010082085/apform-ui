<script setup lang="ts">
/**
 * CodePreviewBlock — 代码 / 日志预览块（非 JSON 墙）
 */
import { computed } from 'vue'
import { useClipboard } from '../../composables/useClipboard'

const props = withDefaults(
  defineProps<{
    text: string
    title?: string
    language?: string
    maxHeight?: string
  }>(),
  {
    title: '代码输出',
    language: 'text',
    maxHeight: '280px',
  },
)

const { copy } = useClipboard()

const langLabel = computed(() => props.language || 'text')

/**
 * 复制全文
 */
async function onCopy(): Promise<void> {
  await copy(props.text)
}
</script>

<template>
  <div class="apf-code-preview-block">
    <div class="apf-code-preview-block__head">
      <div class="apf-code-preview-block__titles">
        <span class="apf-code-preview-block__title">{{ title }}</span>
        <span class="apf-code-preview-block__lang">{{ langLabel }}</span>
      </div>
      <button type="button" class="apf-code-preview-block__copy" @click="onCopy">复制</button>
    </div>
    <pre class="apf-code-preview-block__body" :style="{ maxHeight }" :data-lang="langLabel">{{ text }}</pre>
  </div>
</template>

<style scoped>
.apf-code-preview-block {
  border: 1px solid var(--apf-border-color, var(--el-border-color-extra-light, #ebeef5));
  border-radius: 8px;
  overflow: hidden;
  background: #0f172a;
  color: #e2e8f0;
}

.apf-code-preview-block__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.apf-code-preview-block__titles {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.apf-code-preview-block__title {
  font-size: 12px;
  font-weight: 600;
}

.apf-code-preview-block__lang {
  font-size: 11px;
  opacity: 0.7;
}

.apf-code-preview-block__copy {
  border: none;
  background: transparent;
  color: #93c5fd;
  font-size: 12px;
  cursor: pointer;
  padding: 2px 4px;
}

.apf-code-preview-block__copy:hover {
  color: #bfdbfe;
}

.apf-code-preview-block__body {
  margin: 0;
  padding: 12px;
  overflow: auto;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
  line-height: 1.55;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
