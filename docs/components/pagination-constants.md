# pagination 常量

分页相关常量，与 `AppPagination` / `useClientPagination` 配合使用。

```ts
import {
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
  PAGINATION_LAYOUT,
} from '@apform-ui/core'
```

| 常量 | 说明 |
|------|------|
| `DEFAULT_PAGE_SIZE` | 默认每页条数 |
| `PAGE_SIZE_OPTIONS` | 可选 pageSize 列表 |
| `PAGINATION_LAYOUT` | EP Pagination layout 字符串 |

## 示例

```vue
<AppPagination
  v-model:current-page="page"
  v-model:page-size="size"
  :total="total"
  :page-sizes="PAGE_SIZE_OPTIONS"
  :layout="PAGINATION_LAYOUT"
/>
```
