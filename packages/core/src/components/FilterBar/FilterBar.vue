<script setup lang="ts">
/**
 * FilterBar — 列表页筛选条
 *
 * fields slot + 查询/重置；对应会议系统 MsFilterBar。
 */
defineProps<{
  /** 可选区块标题 */
  title?: string
}>()

const emit = defineEmits<{
  search: []
  reset: []
}>()
</script>

<template>
  <div class="apf-filter-bar">
    <div v-if="title" class="apf-filter-bar__title">{{ title }}</div>
    <div class="apf-filter-bar__fields">
      <slot />
    </div>
    <div class="apf-filter-bar__actions">
      <slot name="actions">
        <el-button type="primary" @click="emit('search')">查询</el-button>
        <el-button @click="emit('reset')">重置</el-button>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.apf-filter-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: var(--spacing-sm, 8px) var(--spacing-12px, 12px);
  padding-bottom: var(--spacing-xs, 4px);
  margin-bottom: var(--spacing-12px, 12px);
  border-bottom: 1px solid var(--border-color-light, #ebeef5);
}

.apf-filter-bar__title {
  width: 100%;
  margin-bottom: var(--spacing-xs, 4px);
  font-size: var(--font-size-13, 13px);
  font-weight: var(--font-weight-semibold, 600);
  color: var(--text-color-title, #303133);
}

.apf-filter-bar__fields {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}

.apf-filter-bar__fields :deep(.el-form-item) {
  margin-bottom: var(--spacing-12px, 12px);
  margin-right: var(--spacing-12px, 12px);
}

.apf-filter-bar__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm, 8px);
  padding-bottom: var(--spacing-12px, 12px);
}
</style>
