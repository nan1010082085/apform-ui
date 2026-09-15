<script setup lang="ts">
/**
 * HitlResultPreview — 人工确认问答列表
 */
import type { ResultHitlItem } from '../../utils/resolveResultBlocks'

defineProps<{
  items: ResultHitlItem[]
  title?: string
  message?: string
}>()
</script>

<template>
  <div class="apf-hitl-result-preview">
    <div v-if="title || message" class="apf-hitl-result-preview__title">
      {{ title || message }}
    </div>
    <div v-if="message && title && message !== title" class="apf-hitl-result-preview__msg">
      {{ message }}
    </div>
    <div class="apf-hitl-result-preview__list">
      <div
        v-for="(item, idx) in items"
        :key="idx"
        class="apf-hitl-result-preview__row"
      >
        <div class="apf-hitl-result-preview__q">{{ item.question }}</div>
        <div class="apf-hitl-result-preview__a">{{ item.answer }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.apf-hitl-result-preview {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.apf-hitl-result-preview__title {
  font-size: 13px;
  font-weight: 600;
}

.apf-hitl-result-preview__msg {
  font-size: 13px;
  color: var(--apf-text-secondary, var(--el-text-color-secondary, #909399));
}

.apf-hitl-result-preview__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.apf-hitl-result-preview__row {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid var(--apf-border-color, var(--el-border-color-extra-light, #ebeef5));
  background: var(--apf-bg-page, var(--el-bg-color-page, #f5f7fa));
}

.apf-hitl-result-preview__q {
  font-size: 12px;
  color: var(--apf-text-secondary, var(--el-text-color-secondary, #909399));
  margin-bottom: 4px;
}

.apf-hitl-result-preview__a {
  font-size: 13px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
