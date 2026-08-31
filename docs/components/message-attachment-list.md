# MessageAttachmentList 消息附件列表组件

> 消息附件列表组件

## 基础用法

```vue
<template>
  <MessageAttachmentList />
</template>

<script setup>
import { MessageAttachmentList } from '@apform-ui/core'
</script>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| attachments | 附件列表 | MessageAttachment[] | [] |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| preview | 预览附件 | (attachment: MessageAttachment) => void |

## 示例

### 基础示例

```vue
<template>
  <MessageAttachmentList />
</template>
```
