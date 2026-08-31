<template>
  <div class="demo-section">
    <h2>ExcelPreviewCard</h2>
    <p>表格预览壳；数据由父组件解析后传入 props。</p>
    <ExcelPreviewCard
      v-model="sheet"
      :sheet-names="['Sheet1', 'Sheet2']"
      :headers="headers"
      :rows="rows"
      :total-rows="rows.length + 1"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ExcelPreviewCard } from '@apform-ui/core'

const sheet = ref('Sheet1')
const headers = ['名称', '状态', '负责人']
const rows = [
  ['项目 A', '进行中', '张三'],
  ['项目 B', '已完成', '李四'],
  ['项目 C', '暂停', '王五'],
]
</script>

<style scoped>
.demo-section { padding: 8px; }
</style>
