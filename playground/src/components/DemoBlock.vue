/**
 * 示例块 — 对齐 Element Plus / Arco：标题说明 + 白底预览 + 底栏源码
 */
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useDocToc } from '../composables/useDocToc'

const props = defineProps<{
  /** 小节标题 */
  title: string
  /** 小节说明 */
  description?: string
  /** 源码 */
  source?: string
}>()

const open = ref(false)
const copied = ref(false)
const toc = useDocToc()

const anchor = computed(() =>
  props.title
    .toLowerCase()
    .replace(/[^\u4e00-\u9fa5a-z0-9]+/gi, '-')
    .replace(/^-|-$/g, ''),
)

onMounted(() => {
  toc?.register({ id: anchor.value, label: props.title })
})

onUnmounted(() => {
  toc?.unregister(anchor.value)
})

/**
 * 复制示例源码
 */
async function copySource() {
  if (!props.source) return
  await navigator.clipboard.writeText(props.source)
  copied.value = true
  window.setTimeout(() => {
    copied.value = false
  }, 1600)
}
</script>

<template>
  <section :id="anchor" class="demo">
    <h2 class="demo-title">{{ title }}</h2>
    <p v-if="description" class="demo-desc">{{ description }}</p>

    <div class="demo-card">
      <div class="demo-preview">
        <slot />
      </div>
      <div v-if="source" class="demo-toolbar">
        <button type="button" class="toolbar-btn" @click="copySource">
          {{ copied ? '已复制' : '复制代码' }}
        </button>
        <span class="toolbar-sep" />
        <button type="button" class="toolbar-btn" @click="open = !open">
          {{ open ? '隐藏源代码' : '显示源代码' }}
        </button>
      </div>
      <div v-if="source && open" class="demo-source">
        <pre><code>{{ source }}</code></pre>
      </div>
    </div>
  </section>
</template>

<style scoped>
.demo {
  margin-bottom: 48px;
  scroll-margin-top: 72px;
}

.demo-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--docs-text, #303133);
}

.demo-desc {
  margin: 0 0 16px;
  font-size: 14px;
  line-height: 1.75;
  color: var(--docs-regular, #606266);
}

.demo-card {
  border: 1px solid var(--docs-border, #e4e7ed);
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
}

.demo-preview {
  padding: 28px 24px;
  min-height: 64px;
  background: #fff;
}

.demo-toolbar {
  display: flex;
  align-items: stretch;
  justify-content: center;
  border-top: 1px solid var(--docs-border, #e4e7ed);
  background: #fafbfc;
}

.toolbar-sep {
  width: 1px;
  background: var(--docs-border, #e4e7ed);
  margin: 8px 0;
}

.toolbar-btn {
  flex: 1;
  padding: 11px 12px;
  border: none;
  background: transparent;
  color: var(--docs-muted, #909399);
  font-size: 13px;
  cursor: pointer;
  font-family: var(--docs-font, inherit);
  transition: color 0.15s, background 0.15s;
}

.toolbar-btn:hover {
  color: var(--docs-primary, #0060a2);
  background: #f0f5fa;
}

.demo-source {
  border-top: 1px solid var(--docs-border, #e4e7ed);
  background: #f8f9fb;
}

.demo-source pre {
  margin: 0;
  padding: 18px 20px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.65;
  font-family: var(--docs-mono, monospace);
  color: #303133;
}

.demo-source code {
  white-space: pre;
}

:global(.docs.dark) .demo-card {
  background: #1d1e1f;
  border-color: #4c4d4f;
  box-shadow: none;
}

:global(.docs.dark) .demo-preview {
  background: #1d1e1f;
}

:global(.docs.dark) .demo-toolbar {
  background: #141414;
  border-top-color: #4c4d4f;
}

:global(.docs.dark) .demo-source {
  background: #0f1011;
  border-top-color: #4c4d4f;
}

:global(.docs.dark) .demo-source pre {
  color: #cfd3dc;
}
</style>
