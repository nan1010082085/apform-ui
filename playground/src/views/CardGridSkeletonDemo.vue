<script setup lang="ts">
/**
 * CardGridSkeleton — 卡片网格骨架
 */
import { CardGridSkeleton } from '@apform-ui/core'
</script>

<template>
  <div class="wrap">
    <h2>CardGridSkeleton</h2>
    <p>卡片列表加载占位。</p>

    <div class="block">
      <CardGridSkeleton :count="6" />
    </div>
    <div class="block">
      <h3>无缩略图</h3>
      <CardGridSkeleton :count="3" :show-thumb="false" />
    </div>
  </div>
</template>

<style scoped>
.wrap {
  padding: var(--spacing-md, 16px);
  background: var(--bg-color-page, #f5f6fa);
}
.block {
  margin-bottom: 16px;
  padding: 16px;
  background: var(--bg-color-white, #fff);
  border: 1px solid var(--border-color-light, #ebedf3);
  border-radius: 4px;
}
h2,
h3 {
  margin: 0 0 8px;
}
p {
  margin: 0 0 16px;
  color: var(--text-color-secondary, #666);
  font-size: 13px;
}
</style>
