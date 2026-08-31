# useToast

编程式轻提示，配合 `Toast` 组件与 `provideToast` 使用。

## 基础用法

```ts
import { provideToast, useToast } from '@apform-ui/core'

// 根组件
provideToast()

// 子组件
const toast = useToast()
toast.show('保存成功')
toast.show('操作失败', { type: 'error' })
```

## 说明

- 需在应用根节点调用 `provideToast()` 挂载 Toast 容器
- 样式与设计令牌一致，替代散落 `ElMessage` 的可选方案
