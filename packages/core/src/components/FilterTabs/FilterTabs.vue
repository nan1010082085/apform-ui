<script setup lang="ts">
/**
 * FilterTabs — 通用筛选标签栏
 *
 * 按钮组样式的筛选 tabs，用于列表页筛选。
 */
defineProps<{
  /** 选项；可选 count 显示计数 */
  options: { label: string; value: string; count?: number }[]
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div :class="$style.tabs">
    <button
      v-for="tab in options"
      :key="tab.value"
      :class="[$style.tab, { [$style.tabActive]: modelValue === tab.value }]"
      @click="emit('update:modelValue', tab.value)"
    >
      {{ tab.label }}
      <span v-if="tab.count != null" :class="$style.count">{{ tab.count }}</span>
    </button>
  </div>
</template>

<style module>
.tabs {
  display: flex;
  gap: 2px;
  background: var(--bg-color-gray-dark, #e8eaed);
  border-radius: var(--border-radius-8, 8px);
  padding: 3px;
}

.tab {
  min-height: var(--control-height-sm, 28px);
  padding: 0 var(--spacing-md, 16px);
  font-size: var(--font-size-13, 13px);
  font-weight: var(--font-weight-medium, 500);
  color: var(--text-color-regular, #606266);
  background: transparent;
  border: none;
  border-radius: var(--border-radius-6, 6px);
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  line-height: 1.4;
  display: inline-flex;
  align-items: center;
}

.tab:hover {
  color: var(--text-color-title, #303133);
  background: rgba(255, 255, 255, 0.6);
}

.tabActive {
  color: var(--text-color-title, #303133);
  background: var(--bg-color-white, #ffffff);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.count {
  margin-left: 6px;
  font-size: var(--font-size-12, 12px);
  opacity: 0.65;
  font-weight: var(--font-weight-medium, 500);
}
</style>
