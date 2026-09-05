<script setup lang="ts">
/**
 * SearchForm 搜索表单文档示例
 */
import { ref } from 'vue'
import { SearchForm, type SearchFieldConfig } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const fields: SearchFieldConfig[] = [
  { key: 'keyword', label: '关键词', type: 'input', placeholder: '搜索名称' },
  {
    key: 'status',
    label: '状态',
    type: 'select',
    options: [
      { label: '全部', value: '' },
      { label: '启用', value: 'active' },
      { label: '停用', value: 'inactive' },
    ],
  },
  { key: 'created', label: '创建日期', type: 'date' },
  { key: 'range', label: '时间范围', type: 'daterange' },
]

const form = ref<Record<string, unknown>>({})
const lastSearch = ref('')

/**
 * 搜索回调
 */
function onSearch(values: Record<string, unknown>) {
  lastSearch.value = JSON.stringify(values)
}

/**
 * 重置回调
 */
function onReset() {
  lastSearch.value = '(已重置)'
}

const collapsibleSource = `<template>
  <SearchForm
    v-model="form"
    :fields="fields"
    :default-visible-count="3"
    @search="onSearch"
    @reset="onReset"
  />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="可折叠（默认展示 3 项）"
      description="可折叠的多字段搜索区，无业务 schema 依赖。"
      :source="collapsibleSource"
    >
      <SearchForm
        v-model="form"
        :fields="fields"
        :default-visible-count="3"
        @search="onSearch"
        @reset="onReset"
      />
      <p v-if="lastSearch" class="hint">查询参数：{{ lastSearch }}</p>
    </DemoBlock>
  </div>
</template>

<style scoped>
.hint {
  margin-top: 12px;
  font-size: 12px;
  color: #909399;
  word-break: break-all;
}
</style>
