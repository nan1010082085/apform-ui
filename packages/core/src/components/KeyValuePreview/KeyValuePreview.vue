<script setup lang="ts">
/**
 * KeyValuePreview — 字段卡人读展示（禁止整份 JSON）
 */
import type { ResultBlockEntry } from '../../utils/resolveResultBlocks'

defineProps<{
  entries: ResultBlockEntry[]
  title?: string
}>()
</script>

<template>
  <div class="apf-key-value-preview">
    <div v-if="title" class="apf-key-value-preview__title">{{ title }}</div>
    <dl class="apf-key-value-preview__list">
      <div
        v-for="(entry, idx) in entries"
        :key="`${entry.label}-${idx}`"
        class="apf-key-value-preview__row"
      >
        <dt>{{ entry.label }}</dt>
        <dd :data-tone="entry.tone || undefined">{{ entry.value }}</dd>
      </div>
    </dl>
  </div>
</template>

<style scoped>
.apf-key-value-preview {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.apf-key-value-preview__title {
  font-size: 13px;
  font-weight: 600;
  color: var(--apf-text-primary, var(--el-text-color-primary, #303133));
}

.apf-key-value-preview__list {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px 12px;
  border: 1px solid var(--apf-border-color, var(--el-border-color-extra-light, #ebeef5));
  border-radius: 8px;
  background: var(--apf-bg-page, var(--el-bg-color-page, #f5f7fa));
}

.apf-key-value-preview__row {
  display: grid;
  grid-template-columns: minmax(88px, 32%) 1fr;
  gap: 8px 12px;
  align-items: start;
}

.apf-key-value-preview__row dt {
  margin: 0;
  font-size: 12px;
  color: var(--apf-text-secondary, var(--el-text-color-secondary, #909399));
  word-break: break-all;
}

.apf-key-value-preview__row dd {
  margin: 0;
  font-size: 13px;
  color: var(--apf-text-primary, var(--el-text-color-primary, #303133));
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.5;
}

.apf-key-value-preview__row dd[data-tone='primary'] {
  color: var(--el-color-primary, #409eff);
}

.apf-key-value-preview__row dd[data-tone='danger'] {
  color: var(--el-color-danger, #f56c6c);
}
</style>
