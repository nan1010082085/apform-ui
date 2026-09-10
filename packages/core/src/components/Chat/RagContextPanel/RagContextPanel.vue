<script setup lang="ts">
/**
 * RagContextPanel — Schema/RAG 上下文选择浮层（纯 UI）
 *
 * 输入 debounce 由父层负责；本组件仅管理本地 query 展示与选中态样式。
 */
import { computed, ref, watch } from 'vue'
import type { RagContextItem } from './types'

const props = withDefaults(
  defineProps<{
    results: RagContextItem[]
    selected: RagContextItem[]
    loading?: boolean
    query?: string
    placeholder?: string
    emptyHint?: string
    idleHint?: string
    footerHint?: string
    selectedFooterHint?: string
  }>(),
  {
    loading: false,
    query: '',
    placeholder: '智能匹配 Schema，如：用户注册表单...',
    emptyHint: '未找到匹配的 Schema',
    idleHint: '输入自然语言描述，智能匹配已有 Schema',
    footerHint: '选择 Schema 注入对话上下文',
    selectedFooterHint: '已选 {n} 个 Schema 作为上下文',
  },
)

const emit = defineEmits<{
  'update:query': [value: string]
  search: [query: string]
  select: [item: RagContextItem]
  remove: [id: string]
  close: []
}>()

const localQuery = ref(props.query)

watch(
  () => props.query,
  (v) => {
    if (v !== localQuery.value) localQuery.value = v
  },
)

/**
 * @param value - 输入值
 */
function onInput(value: string): void {
  localQuery.value = value
  emit('update:query', value)
  emit('search', value)
}

/**
 * @param item - 结果项
 */
function isSelected(item: RagContextItem): boolean {
  return props.selected.some((c) => c.id === item.id)
}

/**
 * @param item - 结果项
 */
function handleSelect(item: RagContextItem): void {
  if (!isSelected(item)) emit('select', item)
}

/**
 * @param score - 相关分
 */
function scoreTone(score: number): 'high' | 'medium' | 'low' {
  if (score >= 70) return 'high'
  if (score >= 40) return 'medium'
  return 'low'
}

const footerText = computed(() => {
  if (props.selected.length > 0) {
    return props.selectedFooterHint.replace('{n}', String(props.selected.length))
  }
  return props.footerHint
})
</script>

<template>
  <div class="apf-rag-panel">
    <div class="apf-rag-panel__header">
      <svg
        class="apf-rag-panel__icon"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        class="apf-rag-panel__input"
        :value="localQuery"
        :placeholder="placeholder"
        @input="onInput(($event.target as HTMLInputElement).value)"
      />
      <span v-if="loading" class="apf-rag-panel__spinner" aria-label="加载中" />
    </div>

    <div v-if="selected.length > 0" class="apf-rag-panel__chips">
      <span v-for="item in selected" :key="item.id" class="apf-rag-panel__chip">
        <span class="apf-rag-panel__chip-name">{{ item.name }}</span>
        <button
          type="button"
          class="apf-rag-panel__chip-remove"
          title="移除"
          @click="emit('remove', item.id)"
        >
          ×
        </button>
      </span>
    </div>

    <div class="apf-rag-panel__list">
      <template v-if="results.length > 0">
        <button
          v-for="item in results"
          :key="item.id"
          type="button"
          class="apf-rag-panel__item"
          :class="{ 'is-selected': isSelected(item) }"
          @click="handleSelect(item)"
        >
          <div class="apf-rag-panel__score" :class="`is-${scoreTone(item.score)}`">
            {{ item.score }}
          </div>
          <div class="apf-rag-panel__info">
            <div class="apf-rag-panel__name">{{ item.name }}</div>
            <div v-if="item.description" class="apf-rag-panel__desc">{{ item.description }}</div>
            <div v-if="item.tags?.length" class="apf-rag-panel__tags">
              <span
                v-for="tag in item.tags.slice(0, 5)"
                :key="tag"
                class="apf-rag-panel__tag"
              >
                {{ tag }}
              </span>
              <span v-if="item.tags.length > 5" class="apf-rag-panel__tag">
                +{{ item.tags.length - 5 }}
              </span>
            </div>
          </div>
        </button>
      </template>
      <div v-else-if="!loading && localQuery.trim()" class="apf-rag-panel__empty">
        <div class="apf-rag-panel__empty-icon">⌕</div>
        <div>{{ emptyHint }}</div>
      </div>
      <div v-else-if="!loading" class="apf-rag-panel__empty">
        <div class="apf-rag-panel__empty-icon">✦</div>
        <div>{{ idleHint }}</div>
      </div>
    </div>

    <div class="apf-rag-panel__footer">
      <span>{{ footerText }}</span>
      <button type="button" class="apf-rag-panel__close" @click="emit('close')">关闭</button>
    </div>
  </div>
</template>

<style scoped>
.apf-rag-panel {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  margin-bottom: 8px;
  background: var(--c-surface, #fff);
  border: 1px solid var(--c-border-soft, #ebedf3);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  z-index: 100;
  display: flex;
  flex-direction: column;
  max-height: 400px;
  overflow: hidden;
}

.apf-rag-panel__header {
  padding: 12px 14px;
  border-bottom: 1px solid var(--c-border-soft, #ebedf3);
  display: flex;
  align-items: center;
  gap: 8px;
}

.apf-rag-panel__icon {
  flex-shrink: 0;
  color: var(--c-text-muted, #999);
}

.apf-rag-panel__input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 13px;
  font-family: inherit;
  color: var(--c-text-primary, #333);
  background: transparent;
}

.apf-rag-panel__input::placeholder {
  color: var(--c-text-disabled, #c0c4cc);
}

.apf-rag-panel__spinner {
  width: 14px;
  height: 14px;
  border: 2px solid var(--c-border-soft, #ebedf3);
  border-top-color: var(--c-primary, #0060a2);
  border-radius: 50%;
  animation: apf-rag-spin 0.8s linear infinite;
  flex-shrink: 0;
}

@keyframes apf-rag-spin {
  to {
    transform: rotate(360deg);
  }
}

.apf-rag-panel__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 14px;
  border-bottom: 1px solid var(--c-border-soft, #ebedf3);
}

.apf-rag-panel__chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 12px;
  background: var(--c-primary-soft, #e8f4ff);
  color: var(--c-primary, #0060a2);
  font-size: 11px;
  font-weight: 500;
  max-width: 160px;
  border: 1px solid color-mix(in srgb, var(--c-primary, #0060a2) 15%, transparent);
}

.apf-rag-panel__chip-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.apf-rag-panel__chip-remove {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--c-primary, #0060a2);
  font-size: 12px;
  padding: 0;
  flex-shrink: 0;
}

.apf-rag-panel__chip-remove:hover {
  background: var(--c-primary, #0060a2);
  color: #fff;
}

.apf-rag-panel__list {
  flex: 1;
  overflow-y: auto;
  padding: 6px;
}

.apf-rag-panel__item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;
  transition: background 0.15s;
}

.apf-rag-panel__item:hover {
  background: var(--c-surface-muted, #f5f7fa);
}

.apf-rag-panel__item.is-selected {
  background: var(--c-primary-soft, #e8f4ff);
  border-color: color-mix(in srgb, var(--c-primary, #0060a2) 15%, transparent);
}

.apf-rag-panel__score {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
}

.apf-rag-panel__score.is-high {
  background: #ecf9f0;
  color: #00a854;
}

.apf-rag-panel__score.is-medium {
  background: #fdf6ec;
  color: #e6a23c;
}

.apf-rag-panel__score.is-low {
  background: var(--c-surface-muted, #f5f7fa);
  color: var(--c-text-muted, #999);
}

.apf-rag-panel__info {
  flex: 1;
  min-width: 0;
}

.apf-rag-panel__name {
  font-size: 13px;
  font-weight: 500;
  color: var(--c-text-primary, #333);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.apf-rag-panel__desc {
  font-size: 11px;
  color: var(--c-text-muted, #999);
  margin-top: 3px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.apf-rag-panel__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
}

.apf-rag-panel__tag {
  padding: 1px 6px;
  border-radius: 3px;
  background: var(--c-surface-muted, #f5f7fa);
  color: var(--c-text-muted, #999);
  font-size: 10px;
}

.apf-rag-panel__empty {
  padding: 24px 16px;
  text-align: center;
  color: var(--c-text-disabled, #c0c4cc);
  font-size: 12px;
}

.apf-rag-panel__empty-icon {
  font-size: 28px;
  margin-bottom: 8px;
  opacity: 0.35;
}

.apf-rag-panel__footer {
  padding: 8px 14px;
  border-top: 1px solid var(--c-border-soft, #ebedf3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  color: var(--c-text-muted, #999);
}

.apf-rag-panel__close {
  border: none;
  background: transparent;
  color: var(--c-text-muted, #999);
  font-size: 11px;
  cursor: pointer;
  font-family: inherit;
  padding: 2px 6px;
  border-radius: 4px;
}

.apf-rag-panel__close:hover {
  background: var(--c-surface-muted, #f5f7fa);
  color: var(--c-primary, #0060a2);
}
</style>
