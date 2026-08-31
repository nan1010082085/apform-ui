# SessionSidebar 会话侧栏组件

> 会话侧栏组件

## 基础用法

```vue
<template>
  <SessionSidebar />
</template>

<script setup>
import { SessionSidebar } from '@apform-ui/core'
</script>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| sessions | 会话列表 | Session[] | [] |
| activeId | 当前激活的会话ID | string | null | null |
| loading | 是否加载中 | boolean | false |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| select | 选择会话 | (id: string) => void |
| create | 创建新会话 | () => void |
| delete | 删除会话 | (id: string) => void |

## 示例

### 基础示例

```vue
<template>
  <SessionSidebar />
</template>
```
