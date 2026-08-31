# BreadcrumbNav

props 驱动的面包屑导航，适用于列表/详情层级页面。**不**内置 `vue-router`，由父组件处理 `@navigate`。

## 基础用法

```vue
<script setup lang="ts">
import { BreadcrumbNav, type BreadcrumbNavItem } from '@apform-ui/core'
import { useRouter } from 'vue-router'

const router = useRouter()
const items: BreadcrumbNavItem[] = [
  { label: '首页', to: '/' },
  { label: '工作流', to: '/workflows' },
  { label: '编辑' },
]

function onNavigate(to: string) {
  router.push(to)
}
</script>

<template>
  <BreadcrumbNav :items="items" @navigate="onNavigate" />
</template>
```

## Props

| 属性 | 类型 | 说明 |
|------|------|------|
| `items` | `BreadcrumbNavItem[]` | 面包屑项；末项通常无 `to` |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `navigate` | `(to: string)` | 点击可跳转项时触发 |

## BreadcrumbNavItem

| 字段 | 类型 | 说明 |
|------|------|------|
| `label` | `string` | 展示文案 |
| `to` | `string?` | 可点击路径 |
