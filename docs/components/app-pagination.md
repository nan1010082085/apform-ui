# AppPagination 分页器

统一分页器，total 为 0 时自动隐藏。

## 基础用法

<DemoBlock demo="AppPaginationBasic" />

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `currentPage` | `number` | — | 当前页（v-model，从 1 开始） |
| `pageSize` | `number` | `10` | 每页条数（v-model） |
| `total` | `number` | — | 总条数 |
| `size` | `'default' \| 'small'` | `'default'` | 紧凑尺寸 |

### Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:currentPage` | `number` | 页码更新 |
| `update:pageSize` | `number` | 每页条数更新 |
