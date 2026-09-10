<script setup lang="ts">
/**
 * MentionInput — @ 引用输入壳
 *
 * 负责 textarea、触发面板、chips、键盘导航；搜索由业务注入。
 */
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import type { MentionChip, MentionResultItem, MentionSearchFn, MentionTab } from './types'

const props = withDefaults(
  defineProps<{
    disabled?: boolean
    loading?: boolean
    placeholder?: string
    tabs: MentionTab[]
    /** 异步搜索（壳内 debounce） */
    search: MentionSearchFn
    /** 结果类型角标；默认取 type 首字母大写 */
    typeBadge?: (type: string) => string
    debounceMs?: number
    emptyText?: string
    searchPlaceholder?: string
  }>(),
  {
    placeholder: '描述你想要生成的内容...',
    debounceMs: 250,
    emptyText: '无匹配结果',
    searchPlaceholder: '搜索引用...',
  },
)

const emit = defineEmits<{
  send: [message: string, mentions: MentionChip[]]
  input: [message: string]
}>()

const inputText = ref('')
const textareaRef = ref<HTMLTextAreaElement>()
const mentions = ref<MentionChip[]>([])
const wrapperRef = ref<HTMLElement>()

const panelVisible = ref(false)
const searchQuery = ref('')
const activeTab = ref(props.tabs[0]?.key ?? '')
const results = ref<MentionResultItem[]>([])
const searching = ref(false)
const highlightIndex = ref(-1)
const mentionStartPos = ref(-1)

let searchTimer: ReturnType<typeof setTimeout> | null = null

watch(
  () => props.tabs,
  (tabs) => {
    if (!tabs.some((t) => t.key === activeTab.value)) {
      activeTab.value = tabs[0]?.key ?? ''
    }
  },
  { deep: true },
)

/**
 * @param type - 结果类型
 */
function resolveBadge(type: string): string {
  if (props.typeBadge) return props.typeBadge(type)
  return (type[0] || '?').toUpperCase()
}

function autoResize(): void {
  const el = textareaRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = `${Math.min(el.scrollHeight, 102)}px`
}

watch(inputText, () => {
  nextTick(autoResize)
})

/**
 * @param query - 搜索词
 * @param tab - 分类
 */
function debounceSearch(query: string, tab: string): void {
  if (searchTimer) clearTimeout(searchTimer)
  if (!query.trim()) {
    results.value = []
    searching.value = false
    return
  }
  searching.value = true
  searchTimer = setTimeout(async () => {
    try {
      results.value = await props.search(query, tab)
    } catch {
      results.value = []
    } finally {
      searching.value = false
    }
  }, props.debounceMs)
}

watch([searchQuery, activeTab], ([q, tab]) => {
  highlightIndex.value = -1
  debounceSearch(q, tab)
})

function closePanel(): void {
  panelVisible.value = false
  searchQuery.value = ''
  mentionStartPos.value = -1
  highlightIndex.value = -1
  results.value = []
}

function handleInput(): void {
  const val = inputText.value
  emit('input', val)
  const sel = textareaRef.value?.selectionStart
  const cursor = sel != null && sel > 0 ? sel : val.length
  const lastAt = val.lastIndexOf('@', cursor - 1)
  if (lastAt >= 0 && (lastAt === 0 || val[lastAt - 1] === ' ' || val[lastAt - 1] === '\n')) {
    const textAfterAt = val.slice(lastAt + 1, cursor)
    if (!textAfterAt.includes(' ') && textAfterAt.length <= 30) {
      mentionStartPos.value = lastAt
      searchQuery.value = textAfterAt
      panelVisible.value = true
      return
    }
  }
  closePanel()
}

/**
 * @param e - 键盘事件
 */
function handleKeydown(e: KeyboardEvent): void {
  if (panelVisible.value) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      highlightIndex.value = Math.min(highlightIndex.value + 1, Math.max(results.value.length - 1, 0))
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      highlightIndex.value = Math.max(highlightIndex.value - 1, 0)
      return
    }
    if (e.key === 'Enter' && highlightIndex.value >= 0 && results.value[highlightIndex.value]) {
      e.preventDefault()
      selectResult(results.value[highlightIndex.value])
      return
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      closePanel()
      return
    }
  }

  if (e.key === 'Enter' && !e.shiftKey && !panelVisible.value) {
    e.preventDefault()
    handleSend()
  }
}

/**
 * @param item - 选中项
 */
function selectResult(item: MentionResultItem): void {
  const chip: MentionChip = { id: item.id, type: item.type, label: item.name }
  if (!mentions.value.some((m) => m.id === chip.id && m.type === chip.type)) {
    mentions.value.push(chip)
  }

  const val = inputText.value
  const start = mentionStartPos.value
  const cursor = textareaRef.value?.selectionStart ?? val.length
  if (start >= 0) {
    inputText.value = `${val.slice(0, start)}@${item.name} ${val.slice(cursor)}`
  }

  closePanel()
  nextTick(() => textareaRef.value?.focus())
}

/**
 * @param index - chip 下标
 */
function removeMention(index: number): void {
  mentions.value.splice(index, 1)
}

function handleSend(): void {
  const text = inputText.value.trim()
  if (!text && mentions.value.length === 0) return
  if (props.disabled) return

  emit('send', text, [...mentions.value])
  inputText.value = ''
  mentions.value = []
}

/**
 * @param e - 鼠标事件
 */
function handleClickOutside(e: MouseEvent): void {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) {
    closePanel()
  }
}

function focus(): void {
  textareaRef.value?.focus()
}

defineExpose({ focus })

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
  if (searchTimer) clearTimeout(searchTimer)
})
</script>

<template>
  <div ref="wrapperRef" class="apf-mention-input">
    <div v-if="panelVisible" class="apf-mention-panel" role="listbox">
      <div class="apf-mention-panel-search">
        <input
          v-model="searchQuery"
          class="apf-mention-panel-input"
          type="text"
          :placeholder="searchPlaceholder"
          autocomplete="off"
        />
      </div>

      <div class="apf-mention-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          class="apf-mention-tab"
          :class="{ 'is-active': activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="apf-mention-results">
        <div v-if="searching" class="apf-mention-loading" aria-busy="true">
          <span class="apf-mention-loading-dot" />
          <span class="apf-mention-loading-dot" />
          <span class="apf-mention-loading-dot" />
        </div>
        <template v-else-if="results.length > 0">
          <div
            v-for="(item, idx) in results"
            :key="`${item.type}-${item.id}`"
            class="apf-mention-result"
            :class="{ 'is-highlighted': idx === highlightIndex }"
            role="option"
            @click="selectResult(item)"
            @mouseenter="highlightIndex = idx"
          >
            <div class="apf-mention-badge" :data-type="item.type">
              {{ resolveBadge(item.type) }}
            </div>
            <div class="apf-mention-result-info">
              <div class="apf-mention-result-name">{{ item.name }}</div>
              <div v-if="item.description" class="apf-mention-result-meta">{{ item.description }}</div>
            </div>
          </div>
        </template>
        <div v-else-if="searchQuery.trim()" class="apf-mention-empty">
          {{ emptyText }}
        </div>
      </div>
    </div>

    <div v-if="mentions.length > 0" class="apf-mention-chips">
      <div
        v-for="(m, idx) in mentions"
        :key="`${m.type}-${m.id}`"
        class="apf-mention-chip"
      >
        <span class="apf-mention-chip-icon">{{ resolveBadge(m.type) }}</span>
        <span>{{ m.label }}</span>
        <button
          type="button"
          class="apf-mention-chip-remove"
          aria-label="移除引用"
          @click="removeMention(idx)"
        >
          ×
        </button>
      </div>
    </div>

    <textarea
      ref="textareaRef"
      v-model="inputText"
      class="apf-mention-textarea"
      :placeholder="placeholder"
      :disabled="disabled || loading"
      rows="1"
      @input="handleInput"
      @keydown="handleKeydown"
    />
  </div>
</template>

<style scoped>
.apf-mention-input {
  position: relative;
  width: 100%;
}

.apf-mention-panel {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  max-height: 320px;
  margin-bottom: 6px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 100;
  background: var(--c-surface, #fff);
  border: 1px solid var(--c-border, #ebedf3);
  border-radius: var(--radius, 8px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.apf-mention-panel-search {
  padding: 8px 10px;
  border-bottom: 1px solid var(--c-border, #ebedf3);
  flex-shrink: 0;
}

.apf-mention-panel-input {
  width: 100%;
  box-sizing: border-box;
  padding: 6px 8px;
  border: 1px solid var(--c-border, #ebedf3);
  border-radius: var(--radius-sm, 6px);
  font-size: var(--font-size-12, 12px);
  font-family: inherit;
  color: var(--c-text, #333);
  outline: none;
  background: var(--c-bg-muted, #f5f7fa);
}

.apf-mention-panel-input:focus {
  border-color: var(--c-primary, #00d4ff);
  background: var(--c-surface, #fff);
}

.apf-mention-tabs {
  display: flex;
  gap: 0;
  padding: 0 10px;
  border-bottom: 1px solid var(--c-border, #ebedf3);
  flex-shrink: 0;
}

.apf-mention-tab {
  padding: 6px 12px;
  font-size: 11px;
  font-weight: 500;
  color: var(--c-text-muted, #999);
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  font-family: inherit;
}

.apf-mention-tab:hover {
  color: var(--c-text, #333);
}

.apf-mention-tab.is-active {
  color: var(--c-primary, #00d4ff);
  border-bottom-color: var(--c-primary, #00d4ff);
}

.apf-mention-results {
  flex: 1;
  overflow-y: auto;
  padding: 4px;
}

.apf-mention-result {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: var(--radius-sm, 6px);
  cursor: pointer;
}

.apf-mention-result:hover,
.apf-mention-result.is-highlighted {
  background: var(--c-bg-muted, #f5f7fa);
}

.apf-mention-badge {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm, 6px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  flex-shrink: 0;
  background: rgba(0, 212, 255, 0.08);
  color: var(--c-primary, #00d4ff);
}

.apf-mention-badge[data-type='schema'] {
  background: rgba(0, 230, 118, 0.1);
  color: var(--c-success, #00e676);
}

.apf-mention-badge[data-type='flow'] {
  background: rgba(0, 212, 255, 0.08);
  color: var(--c-primary, #00d4ff);
}

.apf-mention-badge[data-type='widget'] {
  background: rgba(255, 171, 64, 0.1);
  color: var(--c-warning, #ffab40);
}

.apf-mention-result-info {
  flex: 1;
  min-width: 0;
}

.apf-mention-result-name {
  font-size: 12px;
  font-weight: 500;
  color: var(--c-text, #333);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.apf-mention-result-meta {
  margin-top: 1px;
  font-size: 10px;
  color: var(--c-text-muted, #999);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.apf-mention-empty,
.apf-mention-loading {
  text-align: center;
  padding: 24px 0;
  font-size: 12px;
  color: var(--c-text-muted, #999);
}

.apf-mention-loading-dot {
  display: inline-block;
  width: 4px;
  height: 4px;
  margin: 0 2px;
  border-radius: 50%;
  background: var(--c-primary, #00d4ff);
  animation: apf-mention-pulse 1.2s ease-in-out infinite;
}

.apf-mention-loading-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.apf-mention-loading-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes apf-mention-pulse {
  0%,
  80%,
  100% {
    opacity: 0.3;
  }
  40% {
    opacity: 1;
  }
}

.apf-mention-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 6px;
}

.apf-mention-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: var(--radius-sm, 6px);
  font-size: 11px;
  font-weight: 500;
  background: var(--c-bg-muted, #f5f7fa);
  border: 1px solid var(--c-border, #ebedf3);
  color: var(--c-text, #333);
}

.apf-mention-chip-icon {
  font-size: 10px;
}

.apf-mention-chip-remove {
  width: 14px;
  height: 14px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--c-text-muted, #999);
  cursor: pointer;
  line-height: 1;
  font-size: 12px;
}

.apf-mention-chip-remove:hover {
  background: rgba(255, 82, 82, 0.1);
  color: var(--c-danger, #ff5252);
}

.apf-mention-textarea {
  width: 100%;
  border: none;
  outline: none;
  font-size: 13.5px;
  color: var(--c-text, #333);
  font-family: inherit;
  line-height: 1.5;
  min-height: 36px;
  max-height: 102px;
  resize: none;
  background: transparent;
  padding: 0;
}

.apf-mention-textarea::placeholder {
  color: var(--c-text-muted, #c0c4cc);
}

.apf-mention-textarea:disabled {
  cursor: not-allowed;
}
</style>
