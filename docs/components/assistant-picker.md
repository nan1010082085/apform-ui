# AssistantPicker 智能体选择器组件

> 智能体选择器组件

## 基础用法

```vue
<template>
  <AssistantPicker />
</template>

<script setup>
import { AssistantPicker } from '@apform-ui/core'
</script>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| assistants | 智能体列表 | AssistantPickerItem[] | [] |
| modelValue | 当前选择的智能体ID | string | null | null |
| loading | 是否加载中 | boolean | false |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 选择智能体 | (id: string) => void |

## 示例

### 基础示例

```vue
<template>
  <AssistantPicker />
</template>
```
