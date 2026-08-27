# useDebounceFn 防抖函数

Vue 3 composable，将函数包装为防抖版本。自动在组件卸载时清理定时器。

## 基础用法

<DemoBlock demo="UseDebounceFnBasic" />

## 用法对比

### 之前（手动 setTimeout）

```ts
let debounceTimer: ReturnType<typeof setTimeout> | null = null

function debounceSearch() {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(async () => {
    await fetchData(query.value)
  }, 300)
}

// 需要手动在 onUnmounted 中清理
onUnmounted(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
})
```

### 之后（useDebounceFn）

```ts
import { useDebounceFn } from '@apform-ui/core'

const debouncedSearch = useDebounceFn((query: string) => {
  fetchData(query)
}, 300)

// 自动清理，无需手动管理
```

## API

### `useDebounceFn(fn, delay?)`

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `fn` | `Function` | — | 要防抖的函数 |
| `delay` | `number` | `300` | 延迟毫秒数 |

**返回** 防抖后的函数，参数类型与原函数一致。
