<script setup lang="ts">
import { ref } from 'vue'
import { FilterTabs } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const active = ref('all')
const options = [
  { label: '全部', value: 'all', count: 128 },
  { label: '已发布', value: 'published', count: 86 },
  { label: '草稿', value: 'draft', count: 22 },
  { label: '已归档', value: 'archived', count: 20 },
]

const source = `<template>
  <FilterTabs v-model="active" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FilterTabs } from '@apform-ui/core'
const active = ref('all')
const options = [
  { label: '全部', value: 'all', count: 128 },
  { label: '已发布', value: 'published', count: 86 },
]
<\/script>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="按钮组样式筛选栏。支持可选 count 计数。"
      :source="source"
    >
      <FilterTabs v-model="active" :options="options" />
      <p class="hint">当前选中：{{ active }}</p>
    </DemoBlock>
  </div>
</template>

<style scoped>
.hint {
  margin: 12px 0 0;
  font-size: 13px;
  color: #909399;
}
</style>
