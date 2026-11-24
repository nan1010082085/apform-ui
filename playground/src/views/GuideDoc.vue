/**
 * 通用指南页 — 从 docs/guide/*.md 拉取并渲染
 */
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { renderGuideMd } from '../utils/renderGuideMd'

const modules = import.meta.glob('../../../docs/guide/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const route = useRoute()

const html = computed(() => {
  const name = String(route.meta.guide || '')
  const key = Object.keys(modules).find((k) => k.endsWith(`/${name}.md`))
  if (!key) return `<p>未找到指南：${name}</p>`
  return renderGuideMd(modules[key])
})
</script>

<template>
  <article class="guide-doc" v-html="html" />
</template>

<style scoped>
.guide-doc {
  max-width: 880px;
  padding: 8px 8px 48px;
  line-height: 1.7;
  color: var(--apf-text-primary, #333);
}
.guide-doc :deep(h1) {
  font-size: 28px;
  margin: 0 0 16px;
}
.guide-doc :deep(h2) {
  font-size: 20px;
  margin: 28px 0 12px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--apf-border, #e3e8ef);
}
.guide-doc :deep(h3) {
  font-size: 16px;
  margin: 20px 0 8px;
}
.guide-doc :deep(p) {
  margin: 0 0 12px;
}
.guide-doc :deep(code) {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.9em;
  background: rgba(0, 96, 162, 0.06);
  padding: 1px 5px;
  border-radius: 4px;
}
.guide-doc :deep(.guide-pre) {
  background: #0f172a;
  color: #e2e8f0;
  padding: 14px 16px;
  border-radius: 8px;
  overflow: auto;
  margin: 12px 0 16px;
}
.guide-doc :deep(.guide-pre code) {
  background: transparent;
  color: inherit;
  padding: 0;
}
.guide-doc :deep(.guide-table-wrap) {
  overflow: auto;
  margin: 12px 0 16px;
}
.guide-doc :deep(.guide-table) {
  border-collapse: collapse;
  width: 100%;
  font-size: 13px;
}
.guide-doc :deep(.guide-table th),
.guide-doc :deep(.guide-table td) {
  border: 1px solid var(--apf-border, #e3e8ef);
  padding: 8px 10px;
  text-align: left;
}
.guide-doc :deep(.guide-table th) {
  background: #f5f6fa;
}
.guide-doc :deep(ul) {
  padding-left: 1.25rem;
  margin: 0 0 12px;
}
</style>
