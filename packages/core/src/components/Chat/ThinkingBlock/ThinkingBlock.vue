<script setup lang="ts">
/**
 * ThinkingBlock — 可折叠思考过程块
 */
import { computed, ref } from 'vue'
import { renderMarkdown } from '../../../utils/textParser'

const props = withDefaults(
  defineProps<{
    content: string
    title?: string
    /** 副标题徽章（如「表单专家」） */
    badge?: string
    defaultCollapsed?: boolean
    statusLabel?: string
  }>(),
  {
    title: '思考过程',
    defaultCollapsed: true,
    statusLabel: '已完成',
  },
)

const collapsed = ref(props.defaultCollapsed)

const summary = computed(() => {
  if (!props.content) return ''
  const text = props.content.replace(/<[^>]*>/g, '').trim()
  return text.length > 100 ? `${text.slice(0, 100)}...` : text
})

const html = computed(() => (props.content ? renderMarkdown(props.content) : ''))

function toggle(): void {
  collapsed.value = !collapsed.value
}
</script>

<template>
  <div class="apf-thinking" :class="{ 'is-expanded': !collapsed }">
    <button type="button" class="apf-thinking-head" @click="toggle">
      <div class="apf-thinking-head-main">
        <span class="apf-thinking-icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="14" height="14">
            <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" stroke-width="1.4" />
            <path d="M8 5v3.2L10 10" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
          </svg>
        </span>
        <div class="apf-thinking-titles">
          <div class="apf-thinking-title">
            {{ title }}
            <span v-if="badge" class="apf-thinking-badge">{{ badge }}</span>
          </div>
          <div class="apf-thinking-sub">
            {{ collapsed ? summary : '已完成思考' }}
          </div>
        </div>
      </div>
      <div class="apf-thinking-head-aside">
        <span class="apf-thinking-status">{{ statusLabel }}</span>
        <span class="apf-thinking-chevron" aria-hidden="true">{{ collapsed ? '▾' : '▴' }}</span>
      </div>
    </button>
    <div v-if="!collapsed" class="apf-thinking-body">
      <div class="apf-thinking-md" v-html="html" />
    </div>
  </div>
</template>

<style scoped>
.apf-thinking {
  border: 1px solid var(--c-border, #ebedf3);
  border-radius: var(--radius, 8px);
  background: var(--c-bg-muted, #f7fafa);
  overflow: hidden;
}

.apf-thinking-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 10px 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;
}

.apf-thinking-head-main {
  display: flex;
  gap: 8px;
  min-width: 0;
}

.apf-thinking-icon {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  color: var(--c-primary, #0060a2);
  background: var(--c-primary-soft, #eef5ff);
}

.apf-thinking-titles {
  min-width: 0;
}

.apf-thinking-title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--c-text, #333);
}

.apf-thinking-badge {
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: var(--c-primary-soft, #eef5ff);
  color: var(--c-primary, #0060a2);
}

.apf-thinking-sub {
  margin-top: 2px;
  font-size: 12px;
  color: var(--c-text-muted, #999);
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.apf-thinking-head-aside {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.apf-thinking-status {
  font-size: 11px;
  color: var(--c-success, #00a870);
}

.apf-thinking-chevron {
  font-size: 12px;
  color: var(--c-text-muted, #999);
}

.apf-thinking-body {
  padding: 0 12px 12px 36px;
}

.apf-thinking-md {
  font-size: 13px;
  line-height: 1.65;
  color: var(--c-text-secondary, #555);
}

.apf-thinking-md :deep(p) {
  margin: 0 0 0.5em;
}

.apf-thinking-md :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
