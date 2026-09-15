<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { renderMarkdown, splitTextAndCodeBlocks, type TextPart } from '../../../utils/textParser'

const props = defineProps<{ content: string }>()

const rootEl = ref<HTMLElement | null>(null)
const parts = computed(() => splitTextAndCodeBlocks(props.content || '').map(enrichPart))

interface EnrichedPart extends TextPart {
  display: string
  isJson: boolean
}

function enrichPart(part: TextPart): EnrichedPart {
  const lang = (part.language || '').toLowerCase()
  const looksJson = lang === 'json' || part.artifactType === 'json' || looksLikeJson(part.content)
  if (!looksJson) return { ...part, display: part.content, isJson: false }
  try {
    const parsed = JSON.parse(part.content)
    return { ...part, language: part.language || 'json', display: JSON.stringify(parsed, null, 2), isJson: true }
  } catch {
    return { ...part, display: part.content, isJson: false }
  }
}

function looksLikeJson(text: string): boolean {
  const t = text.trim()
  return (t.startsWith('{') && t.endsWith('}')) || (t.startsWith('[') && t.endsWith(']'))
}

function fenceLabel(part: EnrichedPart): string {
  if (part.type === 'artifact') return part.artifactType || 'artifact'
  if (part.isJson) return 'json'
  if (part.language && part.language !== 'text') return part.language
  return 'code'
}

function copyPart(text: string) {
  if (text) navigator.clipboard?.writeText(text)
}

function downloadPart(part: EnrichedPart) {
  const ext = part.isJson || part.language === 'json'
    ? 'json'
    : part.language && part.language !== 'text'
      ? part.language.replace(/[^a-z0-9]+/gi, '')
      : 'txt'
  const blob = new Blob([part.display], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `result.${ext || 'txt'}`
  a.click()
  URL.revokeObjectURL(url)
}

const imgCleanups: Array<() => void> = []

/**
 * Markdown 内图片：限宽、lazy、加载占位 → 淡入（渐进式）。
 */
function enhanceMarkdownImages() {
  while (imgCleanups.length) imgCleanups.pop()?.()
  const root = rootEl.value
  if (!root) return
  root.querySelectorAll<HTMLImageElement>('.apf-md-block img').forEach((img) => {
    img.classList.add('apf-md-img')
    img.loading = 'lazy'
    img.decoding = 'async'
    img.setAttribute('fetchpriority', 'low')
    const markReady = () => {
      img.classList.remove('apf-md-img--pending')
      img.classList.add('apf-md-img--ready')
    }
    img.classList.add('apf-md-img--pending')
    if (img.complete && img.naturalWidth > 0) {
      markReady()
      return
    }
    img.addEventListener('load', markReady)
    img.addEventListener('error', markReady)
    imgCleanups.push(() => {
      img.removeEventListener('load', markReady)
      img.removeEventListener('error', markReady)
    })
  })
}

watch(
  () => props.content,
  async () => {
    await nextTick()
    enhanceMarkdownImages()
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  while (imgCleanups.length) imgCleanups.pop()?.()
})
</script>

<template>
  <div ref="rootEl" class="apf-message-parts">
    <template v-for="(part, index) in parts" :key="index">
      <div v-if="part.type === 'text'" class="apf-md-block" v-html="renderMarkdown(part.content)" />

      <div v-else-if="part.type === 'artifact'" class="apf-artifact-card" :class="{ 'apf-json': part.isJson }">
        <div class="apf-artifact-head">
          <span class="apf-artifact-badge">工件 · {{ fenceLabel(part) }}</span>
          <div class="apf-part-actions">
            <button class="apf-icon-btn" type="button" aria-label="复制" @click="copyPart(part.display)">
              <svg viewBox="0 0 16 16" width="13" height="13"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M3.5 10.5V3.5h7" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
            </button>
            <button class="apf-icon-btn" type="button" aria-label="下载" @click="downloadPart(part)">
              <svg viewBox="0 0 16 16" width="13" height="13"><path d="M8 2.5v7.2M5.2 7.5 8 10.3l2.8-2.8M3.5 13h9" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
        </div>
        <pre class="apf-code-block"><code>{{ part.display }}</code></pre>
      </div>

      <div v-else class="apf-code-wrap" :class="{ 'apf-json': part.isJson }">
        <div class="apf-code-head">
          <span class="apf-code-lang">{{ fenceLabel(part) }}</span>
          <div class="apf-part-actions">
            <button class="apf-icon-btn" type="button" aria-label="复制" @click="copyPart(part.display)">
              <svg viewBox="0 0 16 16" width="13" height="13"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M3.5 10.5V3.5h7" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
            </button>
            <button class="apf-icon-btn" type="button" aria-label="下载" @click="downloadPart(part)">
              <svg viewBox="0 0 16 16" width="13" height="13"><path d="M8 2.5v7.2M5.2 7.5 8 10.3l2.8-2.8M3.5 13h9" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
        </div>
        <pre class="apf-code-block"><code>{{ part.display }}</code></pre>
      </div>
    </template>
  </div>
</template>

<style scoped>
.apf-message-parts { min-width: 0; width: fit-content; max-width: 100%; font-size: var(--font-size-14, 14px); }
.apf-md-block { min-width: 0; width: fit-content; max-width: 100%; font-size: var(--font-size-14, 14px); overflow: hidden; }
.apf-md-block :deep(p) { margin: 0 0 0.55em; line-height: 1.7; }
.apf-md-block :deep(p:last-child) { margin-bottom: 0; }
.apf-md-block :deep(.table-scroll) {
  overflow-x: auto; margin: var(--spacing-10px, 10px) 0; max-width: min(100%, 840px);
  border: 1px solid var(--c-border); border-radius: var(--border-radius-8, 8px); background: #fff;
}
.apf-md-block :deep(table) { border-collapse: collapse; width: 100%; font-size: var(--font-size-14, 14px); }
.apf-md-block :deep(th),
.apf-md-block :deep(td) { border-bottom: 1px solid var(--c-border); padding: var(--spacing-sm, 8px) var(--spacing-10px, 10px); text-align: left; vertical-align: top; }
.apf-md-block :deep(th) { background: #f3f6f6; font-weight: var(--font-weight-semibold, 600); }
.apf-md-block :deep(tr:last-child td) { border-bottom: 0; }
.apf-md-block :deep(blockquote) {
  margin: var(--spacing-sm, 8px) 0; padding: 6px var(--spacing-12px, 12px);
  border-left: 3px solid var(--c-primary); color: var(--c-text-secondary); background: #f7fafa;
}
.apf-md-block :deep(ul), .apf-md-block :deep(ol) { margin: var(--spacing-sm, 8px) 0; padding-left: 1.3em; }
.apf-md-block :deep(li) { margin: 3px 0; line-height: 1.6; }
.apf-md-block :deep(h1), .apf-md-block :deep(h2), .apf-md-block :deep(h3) { margin: var(--spacing-12px, 12px) 0 6px; line-height: 1.35; font-weight: var(--font-weight-bold, 700); }
.apf-md-block :deep(h2) {
  margin-top: 14px; padding-bottom: var(--spacing-xs, 4px);
  border-bottom: 1px solid var(--c-border-soft, #e9efef); font-size: var(--font-size-15, 15px); color: var(--c-text);
}
.apf-md-block :deep(h2:first-child) { margin-top: 0; }
.apf-md-block :deep(ol) { margin: var(--spacing-sm, 8px) 0 var(--spacing-10px, 10px); padding-left: 1.35em; }
.apf-md-block :deep(ol li) { margin: 6px 0; padding-left: 2px; line-height: 1.65; }
.apf-md-block :deep(a) { color: var(--c-primary); text-decoration: underline; text-underline-offset: 2px; }
.apf-md-block :deep(code) { padding: 1px 5px; border-radius: var(--border-radius-md, 4px); background: #eef3f3; font-size: 0.92em; }
.apf-md-block :deep(pre code) { padding: 0; background: transparent; }
/* 气泡内图片：禁止撑破容器；渐进占位 → 淡入 */
.apf-md-block :deep(img),
.apf-md-block :deep(.apf-md-img) {
  display: block;
  max-width: min(100%, 520px);
  width: auto;
  height: auto;
  margin: 10px 0 4px;
  border-radius: var(--border-radius-8, 8px);
  border: 1px solid var(--c-border-soft, #e9efef);
  background:
    linear-gradient(90deg, #eef3f3 0%, #f7fafa 45%, #eef3f3 90%) 0 0 / 200% 100%;
  object-fit: contain;
}
.apf-md-block :deep(.apf-md-img--pending) {
  min-height: 140px;
  opacity: 0.55;
  animation: apf-md-img-shimmer 1.1s ease-in-out infinite;
}
.apf-md-block :deep(.apf-md-img--ready) {
  min-height: 0;
  opacity: 1;
  animation: none;
  background: #f3f6f6;
  transition: opacity 0.28s ease;
}
@keyframes apf-md-img-shimmer {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}
@media (prefers-reduced-motion: reduce) {
  .apf-md-block :deep(.apf-md-img--pending) { animation: none; }
  .apf-md-block :deep(.apf-md-img--ready) { transition: none; }
}
.apf-code-wrap { margin-top: var(--spacing-10px, 10px); border: 1px solid #2a3842; border-radius: var(--radius); overflow: hidden; }
.apf-code-wrap:first-child { margin-top: 0; }
.apf-code-head, .apf-artifact-head {
  display: flex; align-items: center; justify-content: space-between; gap: var(--spacing-sm, 8px);
  padding: 6px var(--spacing-sm, 8px) 6px var(--spacing-10px, 10px); background: #243039;
}
.apf-part-actions { display: inline-flex; gap: 2px; }
.apf-code-lang, .apf-artifact-badge {
  display: inline-block; padding: 1px 6px; border-radius: 3px;
  background: rgba(255,255,255,.08); color: #9fb3bd; font-size: var(--font-size-10, 10px); font-weight: var(--font-weight-semibold, 600); text-transform: lowercase;
}
.apf-artifact-badge { text-transform: none; color: #8fd0c8; background: rgba(143,208,200,.12); }
.apf-artifact-card {
  margin-top: var(--spacing-10px, 10px); border: 1px solid var(--c-border); border-radius: var(--radius); overflow: hidden; background: #f7fafa;
}
.apf-artifact-card:first-child { margin-top: 0; }
.apf-artifact-card .apf-artifact-head { background: #eef5f5; }
.apf-artifact-card .apf-artifact-badge { background: var(--c-primary-soft); color: var(--c-primary); }
.apf-artifact-card .apf-icon-btn { color: var(--c-text-muted); }
.apf-artifact-card .apf-code-block { border-radius: 0; }
.apf-code-block {
  margin: 0; padding: var(--spacing-12px, 12px) 14px; overflow-x: auto; max-height: 420px;
  background: #1e2a33; color: #e8efef; white-space: pre; font-size: var(--font-size-12, 12px); line-height: 1.55;
}
.apf-json .apf-code-block { color: #d7ece8; }
.apf-icon-btn {
  display: inline-grid; place-items: center; width: var(--icon-size-xl, 24px); height: var(--icon-size-xl, 24px); padding: 0;
  border: 0; border-radius: 5px; background: transparent; color: #9fb3bd; cursor: pointer;
}
.apf-icon-btn:hover { color: #fff; background: rgba(255,255,255,.1); }
.apf-artifact-card .apf-icon-btn:hover { color: var(--c-primary); background: var(--c-primary-soft); }
</style>
