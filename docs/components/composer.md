# Composer 消息输入框组件

> 消息输入框组件

## 基础用法

```vue
<template>
  <Composer />
</template>

<script setup>
import { Composer } from '@apform-ui/core'
</script>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| disabled | 是否禁用 | boolean | false |
| placeholder | 占位符 | string | '输入消息...' |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| send | 发送消息 | (content: string) => void |

## 示例

### 基础示例

```vue
<template>
  <Composer />
</template>
```
