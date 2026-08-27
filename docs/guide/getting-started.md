# 快速开始

## 安装

```bash
# 开发阶段（workspace 引用）
"@schema-ui/core": "file:../ui"
"element-plus": "2.14.2"

# 未来发布后
npm install @schema-ui/core element-plus@2.14.2
```

## 引入设计令牌

在项目的入口文件中引入：

```ts
// main.ts
import '@schema-ui/core/tokens.css'
import '@schema-ui/core/design-tokens.css'
```

## 使用组件

```vue
<script setup>
import { ref } from 'vue'
import {
  AppDialog,
  AppIcon,
  AppPagination,
  ConfirmDialog,
  Toast,
  EmptyState,
  ErrorBoundary,
} from '@schema-ui/core'

const visible = ref(false)
const page = ref(1)
const total = ref(100)
</script>

<template>
  <!-- 图标 -->
  <AppIcon name="setting" :size="18" />
  <AppIcon name="user" color="var(--color-primary)" />

  <!-- 弹框 -->
  <AppDialog v-model="visible" title="标题" width="600px">
    <p>弹框内容</p>
  </AppDialog>

  <!-- 分页 -->
  <AppPagination
    v-model:current-page="page"
    :total="total"
  />

  <!-- 空状态 -->
  <EmptyState
    icon="files"
    title="暂无数据"
    description="点击下方按钮创建第一个项目"
  >
    <el-button type="primary">创建项目</el-button>
  </EmptyState>

  <!-- 错误边界 -->
  <ErrorBoundary context="MyComponent">
    <MyComponent />
  </ErrorBoundary>
</template>
```

## 使用 Composable

```vue
<script setup>
import { useToast } from '@schema-ui/core'

const toast = useToast()

function handleSave() {
  // 保存逻辑...
  toast.success('保存成功')
}
</script>
```

> 注意：使用 `useToast` 需要在 App 根组件通过 `provideToast` 注入 Toast 实例。

## 暗色主题

```ts
// main.ts
import '@schema-ui/core/tokens.css'
import '@schema-ui/core/design-tokens.css'
import '@schema-ui/core/theme/dark.css' // 科技暗色主题
```
