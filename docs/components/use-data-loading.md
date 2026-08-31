# useDataLoading

异步请求的 loading / error 状态封装，适用于列表页、表单提交等场景。

## 基础用法

```ts
import { useDataLoading } from '@apform-ui/core'

const { loading, error, hasError, withLoading, reset } = useDataLoading()

async function loadList() {
  const data = await withLoading(() => fetchList())
  if (data) {
    items.value = data
  }
}
```

## API

| 成员 | 说明 |
|------|------|
| `loading` | 是否加载中 |
| `error` | 错误消息字符串 |
| `hasError` | 是否有错误 |
| `withLoading(fn)` | 执行异步函数，自动管理 loading/error |
| `reset()` | 清空 error |
