<script setup>
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
    <FilterTabs v-model="active" :options="options" />
    <p style="margin-top: 12px; font-size: 13px; color: #999;">当前选中: {{ active }}</p>
  </div>
</template>
