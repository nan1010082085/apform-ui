# ModelPicker 模型选择器组件

> 模型选择器组件

## 基础用法

```vue
<template>
  <ModelPicker />
</template>

<script setup>
import { ModelPicker } from '@apform-ui/core'
</script>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| models | 模型列表 | ModelPickerItem[] | [] |
| modelValue | 当前选择的模型ID | string | null | null |
| loading | 是否加载中 | boolean | false |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 选择模型 | (id: string) => void |

## 示例

### 基础示例

```vue
<template>
  <ModelPicker />
</template>
```
