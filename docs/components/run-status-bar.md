# RunStatusBar 运行状态栏组件

> 运行状态栏组件

## 基础用法

```vue
<template>
  <RunStatusBar />
</template>

<script setup>
import { RunStatusBar } from '@apform-ui/core'
</script>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| run | 运行状态 | RunStatusView | - |
| sending | 是否发送中 | boolean | false |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|


## 示例

### 基础示例

```vue
<template>
  <RunStatusBar />
</template>
```
