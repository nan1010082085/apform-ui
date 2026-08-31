# MessageBubble 消息气泡组件，用于显示单条消息

> 消息气泡组件，用于显示单条消息

## 基础用法

```vue
<template>
  <MessageBubble />
</template>

<script setup>
import { MessageBubble } from '@apform-ui/core'
</script>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| message | 消息对象 | Message | - |
| loading | 是否加载中 | boolean | false |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| preview | 预览附件 | (attachment: MessageAttachment) => void |

## 示例

### 基础示例

```vue
<template>
  <MessageBubble />
</template>
```
