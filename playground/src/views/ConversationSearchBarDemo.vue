<script setup lang="ts">
/**
 * ConversationSearchBar 对话搜索栏文档示例
 */
import { ref } from 'vue'
import {
  ConversationSearchBar,
  type ConversationSearchResult,
} from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const query = ref('')
const searching = ref(false)
const panelVisible = ref(true)
const filtersExpanded = ref(false)
const sourceFilter = ref('')
const startDate = ref('')
const endDate = ref('')

const results = ref<ConversationSearchResult[]>([
  {
    id: 'c1',
    title: '用户注册表单设计',
    source: 'editor',
    updatedAt: '2026-06-02T15:30:00Z',
  },
  {
    id: 'c2',
    title: '订单审批流程',
    source: 'flow',
    updatedAt: '2026-06-04T09:00:00Z',
  },
  {
    id: 'c3',
    title: '独立对话示例',
    source: 'standalone',
    updatedAt: '2026-06-05T12:00:00Z',
  },
])

const selected = ref('')

const basicSource = `<template>
  <ConversationSearchBar
    v-model="query"
    v-model:source-filter="sourceFilter"
    :searching="searching"
    :results="results"
    :total="results.length"
    @select="onSelect"
    @clear="onClear"
  />
</template>`

/**
 * 演示：清空后收起面板
 */
function onClear(): void {
  panelVisible.value = false
  selected.value = ''
}
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="对话列表搜索栏：关键字、来源筛选与结果面板。"
      :source="basicSource"
    >
      <div style="max-width: 360px; border: 1px solid var(--el-border-color-lighter); border-radius: 8px">
        <ConversationSearchBar
          v-model="query"
          v-model:source-filter="sourceFilter"
          v-model:start-date="startDate"
          v-model:end-date="endDate"
          v-model:filters-expanded="filtersExpanded"
          v-model:panel-visible="panelVisible"
          :searching="searching"
          :results="results"
          :total="results.length"
          @select="(id) => (selected = id)"
          @clear="onClear"
        />
      </div>
      <p v-if="selected" style="margin-top: 12px; font-size: 13px; color: var(--el-text-color-secondary)">
        选中：{{ selected }}
      </p>
    </DemoBlock>
  </div>
</template>
