<script setup lang="ts">
/**
 * AssistantPicker — 智能体选择器（纯 props，无 Pinia）
 *
 * 能力标签用「文本/文件/图片/需要确认」，不用 HITL 术语。
 */
import { computed } from 'vue'
import { AppIcon } from '../../AppIcon'
import type { AssistantPickerItem } from './types'

const props = withDefaults(
  defineProps<{
    /** 智能体列表 */
    items: AssistantPickerItem[]
    /** 当前选中 id */
    modelValue: string | null
    /** 加载中 */
    loading?: boolean
    /** 错误信息 */
    error?: string | null
  }>(),
  {
    loading: false,
    error: null,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  select: [item: AssistantPickerItem]
}>()

/**
 * 能力标签
 *
 * @param item - 智能体项
 */
function caps(item: AssistantPickerItem): string[] {
  const list: string[] = ['文本']
  if (item.supportedInputs?.includes('file')) list.push('文件')
  if (item.supportedInputs?.includes('image')) list.push('图片')
  if (item.hitlCapable) list.push('需要确认')
  return list
}

/**
 * 解析展示用图标名（须为已注册 AppIcon）
 *
 * @param item - 智能体项
 */
function iconName(item: AssistantPickerItem): string {
  return item.icon || 'chat-dot-round'
}

/**
 * 选中智能体
 *
 * @param item - 智能体项
 */
function pick(item: AssistantPickerItem) {
  emit('update:modelValue', item.id)
  emit('select', item)
}

const empty = computed(() => !props.loading && !props.error && !props.items.length)
</script>

<template>
  <div class="apf-assistant-picker">
    <div v-if="loading" class="apf-assistant-picker__state">
      <p>正在加载智能体…</p>
    </div>
    <div v-else-if="error" class="apf-assistant-picker__state apf-assistant-picker__state--error">
      <p>{{ error }}</p>
    </div>
    <div v-else-if="empty" class="apf-assistant-picker__state">
      <p>暂无可用智能体</p>
    </div>
    <button
      v-for="item in items"
      :key="item.id"
      type="button"
      class="apf-assistant-picker__item"
      :class="{ 'is-active': modelValue === item.id }"
      @click="pick(item)"
    >
      <div class="apf-assistant-picker__main">
        <span class="apf-assistant-picker__icon-wrap">
          <AppIcon :name="iconName(item)" :size="22" />
        </span>
        <span class="apf-assistant-picker__info">
          <b>{{ item.name }}</b>
          <small>{{ item.description || '适合处理一类明确任务' }}</small>
          <span class="apf-assistant-picker__caps">
            <span
              v-for="c in caps(item)"
              :key="c"
              class="apf-assistant-picker__cap"
              :class="{ 'is-confirm': c === '需要确认' }"
            >{{ c }}</span>
          </span>
        </span>
      </div>
      <span
        class="apf-assistant-picker__choose"
        :class="{ 'is-selected': modelValue === item.id }"
      >
        {{ modelValue === item.id ? '已选择' : '开始使用' }}
      </span>
    </button>
  </div>
</template>

<style scoped>
.apf-assistant-picker {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--spacing-10px, 10px);
  align-content: start;
}

.apf-assistant-picker__state {
  grid-column: 1 / -1;
  padding: var(--spacing-xl, 24px);
  text-align: center;
  color: var(--text-color-secondary, #909399);
  font-size: var(--font-size-13, 13px);
}

.apf-assistant-picker__state--error {
  color: var(--color-danger, #e50113);
}

.apf-assistant-picker__item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-10px, 10px);
  width: 100%;
  min-width: 0;
  min-height: 148px;
  padding: var(--spacing-12px, 12px);
  text-align: left;
  border: 1px solid var(--border-color, #e4e7ed);
  border-radius: var(--border-radius-base, 4px);
  background: var(--bg-color, #fff);
  color: var(--text-color-primary, #303133);
  cursor: pointer;
  overflow: visible;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
}

.apf-assistant-picker__item:hover {
  background: var(--bg-color-page, #f5f7fa);
}

.apf-assistant-picker__item.is-active {
  border-color: var(--color-primary, #0060a2);
  background: var(--color-primary-bg-light, #eef5ff);
  color: var(--color-primary, #0060a2);
  box-shadow: 0 0 0 2px rgba(0, 96, 162, 0.08);
}

.apf-assistant-picker__main {
  display: flex;
  gap: var(--spacing-12px, 12px);
  align-items: flex-start;
  min-width: 0;
  flex: 1;
}

.apf-assistant-picker__icon-wrap {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--border-radius-base, 4px);
  background: var(--bg-color-page, #f5f7fa);
  color: var(--color-primary, #0060a2);
}

.apf-assistant-picker__info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.apf-assistant-picker__info b {
  display: block;
  font-size: var(--font-size-14, 14px);
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.apf-assistant-picker__info small {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  font-size: var(--font-size-12, 12px);
  line-height: 1.45;
  color: var(--text-color-secondary, #909399);
  word-break: break-word;
}

.apf-assistant-picker__caps {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 4px;
}

.apf-assistant-picker__cap {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 3px;
  background: var(--bg-color-page, #f5f7fa);
  color: var(--text-color-secondary, #909399);
}

.apf-assistant-picker__cap.is-confirm {
  color: var(--color-warning, #f09700);
  background: var(--color-warning-bg, rgba(255, 191, 0, 0.1));
}

.apf-assistant-picker__choose {
  flex: none;
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  margin-top: auto;
  padding: 4px 0 0;
  color: var(--color-primary, #0060a2);
  font-size: var(--font-size-12, 12px);
  font-weight: 650;
  line-height: 1.2;
}

@media (max-width: 600px) {
  .apf-assistant-picker {
    grid-template-columns: 1fr;
  }
}
</style>
