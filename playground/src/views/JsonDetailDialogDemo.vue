<script setup lang="ts">
/**
 * JsonDetailDialog — JSON 详情弹框
 */
import { ref } from 'vue'
import { JsonDetailDialog } from '@apform-ui/core'

const open = ref(false)
const data = {
  id: 'user-form',
  version: 1,
  fields: [
    { key: 'username', type: 'input' },
    { key: 'email', type: 'input' },
  ],
}
</script>

<template>
  <div class="wrap">
    <h2>JsonDetailDialog</h2>
    <p>查看完整 JSON 内容。</p>
    <el-button type="primary" @click="open = true">打开详情</el-button>
    <JsonDetailDialog v-model="open" title="Schema 详情" :data="data" />
  </div>
</template>

<style scoped>
.wrap {
  padding: var(--spacing-md, 16px);
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
