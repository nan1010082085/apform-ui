<script setup lang="ts">
/**
 * ConversationSearchBar — 对话搜索栏（纯 UI）
 *
 * 搜索框 + 筛选 popover + 结果列表；数据与 debounce 由父层负责。
 */
import { computed } from 'vue'
import { AppIcon } from '../../AppIcon'
import type {
  ConversationSearchResult,
  ConversationSearchSourceOption,
} from './types'

const DEFAULT_SOURCE_OPTIONS: ConversationSearchSourceOption[] = [
  { value: '', label: '全部来源' },
  { value: 'editor', label: 'Editor' },
  { value: 'flow', label: 'Flow' },
  { value: 'standalone', label: 'AI' },
]

const props = withDefaults(
  defineProps<{
    modelValue: string
    searching?: boolean
    panelVisible?: boolean
    results: ConversationSearchResult[]
    total?: number
    sourceOptions?: ConversationSearchSourceOption[]
    sourceFilter?: string
    startDate?: string
    endDate?: string
    filtersExpanded?: boolean
    placeholder?: string
  }>(),
  {
    searching: false,
    panelVisible: false,
    total: 0,
    sourceFilter: '',
    startDate: '',
    endDate: '',
    filtersExpanded: false,
    placeholder: '搜索对话...',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:sourceFilter': [value: string]
  'update:startDate': [value: string]
  'update:endDate': [value: string]
  'update:filtersExpanded': [value: boolean]
  'update:panelVisible': [value: boolean]
  select: [id: string]
  clear: []
  search: []
}>()

const resolvedSourceOptions = computed(
  () => props.sourceOptions ?? DEFAULT_SOURCE_OPTIONS,
)

const hasActiveFilters = computed(
  () =>
    props.startDate !== '' ||
    props.endDate !== '' ||
    props.sourceFilter !== '',
)

/**
 * 格式化结果时间
 * @param date - 更新时间
 */
function formatTime(date: Date | string): string {
  const d = new Date(date)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())} ${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`
}

/**
 * 解析来源展示文案
 * @param source - 来源值
 */
function sourceLabel(source?: string): string {
  if (!source) return 'AI'
  const hit = resolvedSourceOptions.value.find((o) => o.value === source)
  if (hit?.label) return hit.label
  if (source === 'editor') return 'Editor'
  if (source === 'flow') return 'Flow'
  return 'AI'
}

/**
 * 来源标签类型
 * @param source - 来源值
 */
function sourceTagType(source?: string): 'success' | 'primary' | 'warning' {
  if (source === 'editor') return 'success'
  if (source === 'flow') return 'primary'
  return 'warning'
}

/**
 * 清空搜索与筛选
 */
function handleClear(): void {
  emit('update:modelValue', '')
  emit('update:startDate', '')
  emit('update:endDate', '')
  emit('update:sourceFilter', '')
  emit('update:panelVisible', false)
  emit('clear')
}

/**
 * 选中结果
 * @param id - 对话 id
 */
function handleSelect(id: string): void {
  emit('select', id)
}

/**
 * 切换筛选面板
 */
function toggleFilters(): void {
  emit('update:filtersExpanded', !props.filtersExpanded)
}

/**
 * 日期变更（清除时规范化为空串）
 * @param which - 开始或结束
 * @param value - 日期值
 */
function onDateChange(which: 'start' | 'end', value: string | null): void {
  const next = value ?? ''
  if (which === 'start') emit('update:startDate', next)
  else emit('update:endDate', next)
}
</script>

<template>
  <div :class="$style.root">
    <div :class="$style.searchRow">
      <el-input
        :model-value="modelValue"
        :placeholder="placeholder"
        size="small"
        clearable
        @update:model-value="(v: string) => emit('update:modelValue', v)"
        @clear="handleClear"
        @keyup.enter="emit('search')"
      >
        <template #prefix>
          <AppIcon name="search" :size="14" />
        </template>
      </el-input>
      <el-popover
        :visible="filtersExpanded"
        placement="bottom-end"
        :width="220"
        trigger="click"
        :show-arrow="false"
        :offset="4"
      >
        <template #reference>
          <el-button
            size="small"
            :type="hasActiveFilters ? 'primary' : 'default'"
            :link="!hasActiveFilters"
            @click="toggleFilters"
          >
            <AppIcon name="filter" :size="14" />
          </el-button>
        </template>
        <div :class="$style.filterPanel">
          <div :class="$style.filterRow">
            <span :class="$style.filterLabel">来源</span>
            <el-select
              :model-value="sourceFilter"
              size="small"
              placeholder="全部"
              style="flex: 1"
              @update:model-value="(v: string) => emit('update:sourceFilter', v)"
            >
              <el-option
                v-for="opt in resolvedSourceOptions"
                :key="opt.value"
                :label="opt.label"
                :value="opt.value"
              />
            </el-select>
          </div>
          <div :class="$style.filterRow">
            <span :class="$style.filterLabel">时间</span>
            <el-date-picker
              :model-value="startDate || null"
              type="date"
              placeholder="开始"
              size="small"
              value-format="YYYY-MM-DD"
              style="flex: 1"
              @update:model-value="(v: string | null) => onDateChange('start', v)"
            />
            <span :class="$style.filterSep">~</span>
            <el-date-picker
              :model-value="endDate || null"
              type="date"
              placeholder="结束"
              size="small"
              value-format="YYYY-MM-DD"
              style="flex: 1"
              @update:model-value="(v: string | null) => onDateChange('end', v)"
            />
          </div>
        </div>
      </el-popover>
    </div>

    <div v-if="panelVisible" :class="$style.results">
      <div v-if="searching" :class="$style.empty">搜索中...</div>
      <template v-else-if="results.length > 0">
        <div :class="$style.resultCount">找到 {{ total }} 条结果</div>
        <div
          v-for="conv in results"
          :key="conv.id"
          :class="$style.resultItem"
          @click="handleSelect(conv.id)"
        >
          <span :class="$style.resultTitle">{{ conv.title }}</span>
          <el-tag :type="sourceTagType(conv.source)" size="small">
            {{ sourceLabel(conv.source) }}
          </el-tag>
          <span v-if="conv.updatedAt" :class="$style.resultTime">
            {{ formatTime(conv.updatedAt) }}
          </span>
        </div>
      </template>
      <div v-else :class="$style.empty">无匹配对话</div>
    </div>
  </div>
</template>

<style module>
.root {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.searchRow {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.filterPanel {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filterRow {
  display: flex;
  align-items: center;
  gap: 6px;
}

.filterLabel {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  flex-shrink: 0;
  width: 32px;
}

.filterSep {
  color: var(--el-text-color-secondary);
  flex-shrink: 0;
}

.results {
  max-height: 360px;
  overflow-y: auto;
  overflow-x: hidden;
}

.resultCount {
  padding: 6px 12px;
  font-size: 11px;
  color: var(--el-text-color-secondary);
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.resultItem {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  cursor: pointer;
  border-bottom: 1px solid var(--el-border-color-lighter);
  transition: background 0.1s;
}

.resultItem:last-child {
  border-bottom: none;
}

.resultItem:hover {
  background: var(--el-fill-color-light);
}

.resultTitle {
  font-size: 12px;
  font-weight: 500;
  color: var(--el-text-color-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
}

.resultTime {
  font-size: 10px;
  color: var(--el-text-color-secondary);
  flex-shrink: 0;
}

.empty {
  text-align: center;
  padding: 16px;
  font-size: 12px;
  color: var(--el-text-color-secondary);
}
</style>
