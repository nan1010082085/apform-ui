# FilterBar

列表页筛选条：fields slot + 查询/重置。

```vue
<FilterBar @search="onSearch" @reset="onReset">
  <el-form-item label="名称">
    <el-input v-model="q" />
  </el-form-item>
</FilterBar>
```

## Events

| 事件 | 说明 |
|------|------|
| `search` | 点击查询 |
| `reset` | 点击重置 |
