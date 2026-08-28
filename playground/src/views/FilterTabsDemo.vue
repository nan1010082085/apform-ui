<script setup lang="ts">
import { ref } from 'vue'
import { FilterTabs } from '@apform-ui/core'

const active = ref('all')
const options = [
  { label: '全部', value: 'all' },
  { label: '已发布', value: 'published' },
  { label: '草稿', value: 'draft' },
  { label: '已归档', value: 'archived' },
]
</script>

<template>
  <div>
    <h2>FilterTabs 筛选标签</h2>
    <p>按钮组样式的筛选标签栏。</p>

    <div class="demo-section">
      <div class="demo-title">基础用法</div>
      <div class="demo-block">
        <FilterTabs v-model="active" :options="options" />
        <p style="margin-top: 12px; color: #909399; font-size: 13px;">当前选中: {{ active }}</p>
      </div>
    </div>
  </div>
</template>
