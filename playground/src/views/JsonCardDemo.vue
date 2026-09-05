<script setup lang="ts">
/**
 * JsonCard / JsonDetailDialog — JSON 摘要与详情
 */
import { ref } from 'vue'
import { JsonCard, JsonDetailDialog } from '@apform-ui/core'

const detailOpen = ref(false)
const sample = {
  type: 'form',
  fields: [
    { name: 'username', label: '用户名' },
    { name: 'role', label: '角色' },
  ],
}
</script>

<template>
  <div class="wrap">
    <h2>JsonCard</h2>
    <p>JSON 摘要卡片，点击打开详情。</p>

    <div class="grid">
      <JsonCard title="用户表单 Schema" :data="sample" type="schema" @click="detailOpen = true" />
      <JsonCard
        title="流程定义"
        :data="{ nodes: [{ id: 1 }, { id: 2 }], edges: [{ from: 1, to: 2 }] }"
        type="flow"
        @click="detailOpen = true"
      />
    </div>

    <JsonDetailDialog v-model="detailOpen" title="JSON 详情" :data="sample" />
  </div>
</template>

<style scoped>
.wrap {
  padding: var(--spacing-md, 16px);
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;
}
h2 {
  margin: 0 0 4px;
}
p {
  margin: 0 0 16px;
  color: var(--text-color-secondary, #666);
  font-size: 13px;
}
</style>
