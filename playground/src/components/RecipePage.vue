/**
 * 配方页壳 — 明确标注「组合示例，非库导出组件」
 */
<script setup lang="ts">
defineProps<{
  /** 配方标题 */
  title: string
  /** 简述 */
  description: string
}>()
</script>

<template>
  <article class="recipe-page">
    <header class="recipe-header">
      <span class="badge">配方 · 组合示例</span>
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <p class="note">本页不是 `@apform-ui/core` 导出的组件，仅演示如何组合多个真实组件。</p>
    </header>
    <div class="recipe-body">
      <slot />
    </div>
  </article>
</template>

<style scoped>
.recipe-header {
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e4e7ed;
}

.badge {
  display: inline-block;
  margin-bottom: 8px;
  padding: 2px 8px;
  border-radius: 4px;
  background: #fdf6ec;
  color: #e6a23c;
  font-size: 12px;
  font-weight: 600;
}

.recipe-header h1 {
  margin: 0 0 8px;
  font-size: 26px;
  color: #303133;
}

.recipe-header p {
  margin: 0;
  color: #606266;
  line-height: 1.6;
}

.note {
  margin-top: 10px !important;
  font-size: 13px;
  color: #909399 !important;
}

.recipe-body :deep(> div > h2),
.recipe-body :deep(> div > p:first-of-type) {
  display: none;
}
</style>
