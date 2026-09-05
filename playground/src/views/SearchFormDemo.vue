<script setup lang="ts">
/**
 * SearchForm — 可折叠搜索表单 Demo
 */
import { ref } from 'vue'
import { SearchForm, type SearchFieldConfig } from '@apform-ui/core'

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

function onSearch(values: Record<string, unknown>) {
  lastSearch.value = JSON.stringify(values)
}

function onReset() {
  lastSearch.value = '(已重置)'
}
</script>

<template>
  <div>
    <h2>SearchForm 搜索表单</h2>
    <p>可折叠的多字段搜索区，无业务 schema 依赖。</p>

    <div class="demo-section">
      <div class="demo-title">可折叠（默认展示 3 项）</div>
      <div class="demo-block">
        <SearchForm
          v-model="form"
          :fields="fields"
          :default-visible-count="3"
          @search="onSearch"
          @reset="onReset"
        />
        <p v-if="lastSearch" class="hint">查询参数：{{ lastSearch }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hint {
  margin-top: var(--spacing-12px, 12px);
  font-size: var(--font-size-12, 12px);
  color: var(--text-color-secondary, #909399);
  word-break: break-all;
}
</style>
