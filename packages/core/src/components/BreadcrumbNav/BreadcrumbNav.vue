<script setup lang="ts">
/**
 * BreadcrumbNav — 面包屑导航（props 驱动，无 vue-router 硬编码）
 */
export interface BreadcrumbNavItem {
  /** 展示文案 */
  label: string
  /** 可点击路径；末项通常省略 */
  to?: string
}

defineProps<{
  items: BreadcrumbNavItem[]
}>()

const emit = defineEmits<{
  navigate: [to: string]
}>()
</script>

<template>
  <nav v-if="items.length > 0" :class="$style.breadcrumb" aria-label="面包屑">
    <template v-for="(item, index) in items" :key="`${item.label}-${index}`">
      <span v-if="index > 0" :class="$style.separator" aria-hidden="true">/</span>
      <button
        v-if="item.to && index < items.length - 1"
        type="button"
        :class="$style.link"
        @click="emit('navigate', item.to)"
      >
        {{ item.label }}
      </button>
      <span v-else :class="$style.current">{{ item.label }}</span>
    </template>
  </nav>
</template>

<style module>
.breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-xs, 4px);
  font-size: var(--font-size-13, 13px);
  color: var(--text-color-secondary, #909399);
}

.separator {
  color: var(--text-color-placeholder, #c0c4cc);
  user-select: none;
}

.link {
  padding: 0;
  border: none;
  background: none;
  color: var(--color-primary, #0060a2);
  cursor: pointer;
  font: inherit;
}

.link:hover {
  color: var(--color-primary-light-3, #4581e9);
  text-decoration: underline;
}

.current {
  color: var(--text-color-primary, #303133);
  font-weight: var(--font-weight-medium, 500);
}
</style>
