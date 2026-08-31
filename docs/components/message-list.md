# MessageList 消息列表组件，用于显示消息列表

> 消息列表组件，用于显示消息列表

## 基础用法

```vue
<template>
  <MessageList />
</template>

<script setup>
import { MessageList } from '@apform-ui/core'
</script>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| messages | 消息列表 | Message[] | [] |
| loading | 是否加载中 | boolean | false |
| current-run | 当前运行状态 | RunStatusView | - |
| sending | 是否发送中 | boolean | false |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| preview | 预览附件 | (attachment: MessageAttachment) => void |

## 示例

### 基础示例

```vue
<template>
  <MessageList />
</template>
```
