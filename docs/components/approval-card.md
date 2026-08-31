# ApprovalCard 审批确认卡组件

> 审批确认卡组件

## 基础用法

```vue
<template>
  <ApprovalCard />
</template>

<script setup>
import { ApprovalCard } from '@apform-ui/core'
</script>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| waiting | 等待确认数据 | WaitingPayload | - |
| disabled | 是否禁用 | boolean | false |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| approve | 确认 | () => void |
| reject | 拒绝 | () => void |

## 示例

### 基础示例

```vue
<template>
  <ApprovalCard />
</template>
```
