<script setup lang="ts">
/**
 * CardTable — 卡片式表格/内容容器
 */
withDefaults(
  defineProps<{
    /** 加载态（依赖 Element Plus v-loading） */
    loading?: boolean
    /** 内边距 */
    padding?: string
    /** 无边框 */
    borderless?: boolean
  }>(),
  {
    loading: false,
    padding: 'var(--spacing-sm, 8px)',
    borderless: false,
  },
)
</script>

<template>
  <div
    v-loading="loading"
    class="apf-card-table"
    :class="{ 'apf-card-table--borderless': borderless }"
    :style="{ padding }"
  >
    <slot />
  </div>
</template>

<style scoped>
.apf-card-table {
  background: var(--bg-color-white, #fff);
  border: 1px solid var(--border-color-light, #ebeef5);
  border-radius: var(--border-radius-8, 8px);
}

.apf-card-table--borderless {
  border: none;
  box-shadow: none;
}
</style>
