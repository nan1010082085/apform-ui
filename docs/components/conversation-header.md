# ConversationHeader 对话顶栏组件

> 对话顶栏组件

## 基础用法

```vue
<template>
  <ConversationHeader />
</template>

<script setup>
import { ConversationHeader } from '@apform-ui/core'
</script>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 标题 | string | - |
| label | 副文案 | string | - |
| hasMessages | 是否有消息 | boolean | false |
| processing | 是否处理中 | boolean | false |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| changeAssistant | 更换智能体 | () => void |
| toggleDetails | 切换详情 | () => void |
| create | 新建对话 | () => void |

## 示例

### 基础示例

```vue
<template>
  <ConversationHeader />
</template>
```
