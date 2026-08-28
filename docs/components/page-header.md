# PageHeader

统一页面标题栏：标题 + 副标题 + 右侧操作。

## 用法

```vue
<PageHeader title="项目管理" subtitle="说明">
  <template #actions>
    <el-button type="primary">新建</el-button>
  </template>
</PageHeader>
```

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | — | 标题 |
| `subtitle` | `string` | — | 副标题 |

### Slots

| 插槽 | 说明 |
|------|------|
| `default` | 标题下方扩展 |
| `actions` / `extra` | 右侧操作区 |
