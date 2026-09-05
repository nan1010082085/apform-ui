/**
 * 组件文档页壳：简述 + 示例 + Props / Emits / Slots
 */
<script setup lang="ts">
import type { ComponentDoc } from '@apform-ui/core/docs'
import ApiTable from './ApiTable.vue'

defineProps<{
  /** 文档元数据 */
  doc: ComponentDoc
}>()
</script>

<template>
  <article class="doc-page">
    <header class="doc-header">
      <h1 class="doc-name">{{ doc.name }}</h1>
      <p class="doc-desc">{{ doc.description }}</p>
      <p v-if="doc.whenToUse" class="doc-when">
        <span class="label">适用</span>{{ doc.whenToUse }}
      </p>
    </header>

    <section class="doc-examples">
      <h2 class="section-title">常用示例</h2>
      <div class="examples-body">
        <slot />
      </div>
    </section>

    <ApiTable
      v-if="doc.props?.length"
      title="Props"
      kind="props"
      :rows="doc.props"
    />
    <ApiTable
      v-if="doc.emits?.length"
      title="Emits / Events"
      kind="emits"
      :rows="doc.emits"
    />
    <ApiTable
      v-if="doc.slots?.length"
      title="Slots"
      kind="slots"
      :rows="doc.slots"
    />
  </article>
</template>

<style scoped>
.doc-page {
  max-width: 960px;
}

.doc-header {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e4e7ed;
}

.doc-name {
  margin: 0 0 8px;
  font-size: 28px;
  font-weight: 700;
  color: #303133;
}

.doc-desc {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: #606266;
}

.doc-when {
  margin: 10px 0 0;
  font-size: 13px;
  color: #909399;
}

.doc-when .label {
  display: inline-block;
  margin-right: 8px;
  padding: 1px 6px;
  border-radius: 3px;
  background: #f0f5ff;
  color: #0060a2;
  font-weight: 600;
  font-size: 11px;
}

.section-title {
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.examples-body :deep(.demo-section > h2),
.examples-body :deep(.demo-section > p:first-of-type) {
  display: none;
}

.examples-body :deep(.demo-section) {
  padding: 0;
  border: none;
  background: transparent;
}

.examples-body :deep(.demo-block) {
  margin-bottom: 16px;
  padding: 16px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background: #fff;
}
</style>
