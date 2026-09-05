/**
 * 组件文档页 — 对齐 Element Plus：标题 + 示例 + 右栏目录 + API
 */
<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import type { ComponentDoc } from '@apform-ui/core/docs'
import ApiTable from './ApiTable.vue'
import { provideDocToc } from '../composables/useDocToc'

defineProps<{
  /** 文档元数据 */
  doc: ComponentDoc
}>()

const toc = provideDocToc()

onBeforeUnmount(() => {
  toc.reset()
})
</script>

<template>
  <div class="doc-layout">
    <article class="doc-page">
      <header class="doc-header">
        <h1>
          {{ doc.name }}
          <span v-if="doc.titleZh" class="zh">{{ doc.titleZh }}</span>
        </h1>
        <p class="desc">{{ doc.description }}</p>
      </header>

      <div class="doc-demos">
        <slot />
      </div>

      <section id="api" class="doc-api">
        <h2>{{ doc.name }} API</h2>

        <div id="api-attributes">
          <ApiTable
            v-if="doc.props?.length"
            title="Attributes"
            kind="props"
            :rows="doc.props"
          />
        </div>
        <div id="api-events">
          <ApiTable
            v-if="doc.emits?.length"
            title="Events"
            kind="emits"
            :rows="doc.emits"
          />
        </div>
        <div id="api-slots">
          <ApiTable
            v-if="doc.slots?.length"
            title="Slots"
            kind="slots"
            :rows="doc.slots"
          />
        </div>
      </section>
    </article>

    <aside class="toc">
      <div class="toc-title">本页目录</div>
      <a
        v-for="item in toc.items.value"
        :key="item.id"
        class="toc-link"
        :href="`#${item.id}`"
      >
        {{ item.label }}
      </a>
      <a class="toc-link" href="#api">{{ doc.name }} API</a>
      <a v-if="doc.props?.length" class="toc-link" href="#api-attributes">Attributes</a>
      <a v-if="doc.emits?.length" class="toc-link" href="#api-events">Events</a>
      <a v-if="doc.slots?.length" class="toc-link" href="#api-slots">Slots</a>
    </aside>
  </div>
</template>

<style scoped>
.doc-layout {
  display: flex;
  align-items: flex-start;
  gap: 32px;
  max-width: 1180px;
}

.doc-page {
  flex: 1;
  min-width: 0;
  max-width: 860px;
}

.doc-header {
  margin-bottom: 28px;
}

.doc-header h1 {
  margin: 0 0 10px;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--docs-text, #303133);
}

.doc-header .zh {
  margin-left: 8px;
  font-weight: 500;
}

.desc {
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
  color: var(--docs-regular, #606266);
}

.doc-demos > :deep(> div > h2:first-child),
.doc-demos > :deep(> div > p:first-of-type) {
  display: none;
}

.doc-demos > :deep(.demo-section) {
  padding: 0 !important;
  border: none;
  background: transparent;
}

.doc-demos > :deep(.demo-block) {
  margin-bottom: 16px;
  padding: 16px;
  border: 1px solid var(--docs-border, #e4e7ed);
  border-radius: 4px;
}

.doc-api {
  margin-top: 48px;
  padding-top: 8px;
  scroll-margin-top: 72px;
}

.doc-api h2 {
  margin: 0 0 16px;
  font-size: 22px;
  font-weight: 600;
}

#api-attributes,
#api-events,
#api-slots {
  scroll-margin-top: 72px;
}

.toc {
  position: sticky;
  top: 80px;
  width: 180px;
  flex-shrink: 0;
  padding-left: 12px;
  border-left: 1px solid var(--docs-border, #e4e7ed);
}

.toc-title {
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 600;
  color: var(--docs-muted, #909399);
}

.toc-link {
  display: block;
  padding: 4px 0;
  font-size: 13px;
  color: var(--docs-regular, #606266);
  text-decoration: none;
  line-height: 1.5;
}

.toc-link:hover {
  color: var(--docs-primary, #0060a2);
}

@media (max-width: 1100px) {
  .toc {
    display: none;
  }
}
</style>
