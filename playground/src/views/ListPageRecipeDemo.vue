<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  PageShell,
  PageHeader,
  FilterBar,
  ContentPanel,
  CardTable,
  EmptyState,
  AppPagination,
  TableRowActions,
  useClientPagination,
  type TableRowAction,
} from '@apform-ui/core'

type Row = { id: number; name: string; status: string }

const keyword = ref('')
const all = ref<Row[]>(
  Array.from({ length: 23 }, (_, i) => ({
    id: i + 1,
    name: `项目 ${i + 1}`,
    status: i % 3 === 0 ? 'offline' : 'online',
  })),
)

const filtered = computed(() => {
  const q = keyword.value.trim()
  if (!q) return all.value
  return all.value.filter((r) => r.name.includes(q))
})

const { currentPage, pageSize, pagedItems, total, resetPage } = useClientPagination(filtered, {
  initialPageSize: 10,
})

function onSearch() {
  resetPage()
}

function onReset() {
  keyword.value = ''
  resetPage()
}

function rowActions(row: Row): TableRowAction[] {
  return [
    { key: 'edit', label: '编辑', onClick: () => undefined },
    { key: 'view', label: '查看', onClick: () => undefined },
    { key: 'copy', label: '复制', onClick: () => undefined },
    { key: 'archive', label: '归档', onClick: () => undefined },
    { key: 'delete', label: '删除', type: 'danger', onClick: () => undefined },
  ]
}
</script>

<template>
  <div>
    <h2>列表页配方 ListPageRecipe</h2>
    <p>PageShell → PageHeader → FilterBar → ContentPanel/CardTable → EmptyState → AppPagination</p>

    <div class="demo-section" style="height: 640px; padding: 0; overflow: hidden">
      <PageShell fill>
        <PageHeader title="项目管理" subtitle="列表页黄金路径 Demo">
          <template #actions>
            <el-button type="primary">新建</el-button>
          </template>
        </PageHeader>

        <FilterBar @search="onSearch" @reset="onReset">
          <el-form-item label="名称">
            <el-input v-model="keyword" clearable placeholder="搜索项目" style="width: 200px" />
          </el-form-item>
        </FilterBar>

        <ContentPanel title="数据列表" fill flush>
          <CardTable :borderless="true" padding="0">
            <el-table v-if="pagedItems.length" :data="pagedItems" stripe style="width: 100%">
              <el-table-column prop="id" label="ID" width="80" />
              <el-table-column prop="name" label="名称" />
              <el-table-column prop="status" label="状态" width="120" />
              <el-table-column label="操作" width="200">
                <template #default="{ row }">
                  <TableRowActions :actions="rowActions(row)" :collapse-at="4" :visible-count="2" />
                </template>
              </el-table-column>
            </el-table>
            <EmptyState v-else title="暂无数据" description="试试调整筛选条件" />
            <div style="padding: 12px 16px; display: flex; justify-content: flex-end">
              <AppPagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :total="total"
              />
            </div>
          </CardTable>
        </ContentPanel>
      </PageShell>
    </div>
  </div>
</template>
