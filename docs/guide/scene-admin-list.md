# 场景指南：管理后台列表页

拼法：`PageShell` → `PageHeader` → `FilterBar` / `SearchForm` → `CardTable`（内嵌 `el-table`）→ `AppPagination` → `FormDialog` / `useConfirm`。

## 嵌套

```vue
<template>
  <PageShell>
    <PageHeader title="用户管理">
      <template #actions>
        <el-button type="primary" @click="openCreate">新增</el-button>
      </template>
    </PageHeader>
    <FilterBar @search="onSearch" @reset="onReset">
      <el-form-item label="关键字">
        <el-input v-model="query.q" clearable @keyup.enter="onSearch" />
      </el-form-item>
    </FilterBar>
    <ContentPanel flush>
      <CardTable :loading="loading">
        <el-table :data="rows">
          <el-table-column prop="name" label="名称" />
          <el-table-column label="操作" width="160">
            <template #default="{ row }">
              <el-button link type="primary" @click="edit(row)">编辑</el-button>
              <el-button link type="danger" @click="remove(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <EmptyState v-if="!loading && !rows.length" title="暂无数据" />
      </CardTable>
      <AppPagination
        v-model:page="page"
        v-model:page-size="pageSize"
        :total="total"
      />
    </ContentPanel>
    <FormDialog v-model="dialogVisible" :title="dialogTitle" @submit="onSubmit" />
  </PageShell>
</template>
```

## 数据流

1. 筛选参数与 URL 同步（`vue-router` query）便于分享与刷新。
2. 删除走 `useConfirm().confirmDelete(name)`。
3. 表单弹窗校验失败不关窗；成功后刷新列表并 `useMessage().success`。

## 常见坑

- `CardTable` **没有** columns API，列写在 `el-table` 上。
- 不要用 `PageShell` 包全幅对话页。
