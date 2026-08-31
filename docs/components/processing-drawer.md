# ProcessingDrawer 处理抽屉组件

> 处理抽屉组件

## 基础用法

```vue
<template>
  <ProcessingDrawer />
</template>

<script setup>
import { ProcessingDrawer } from '@apform-ui/core'
</script>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 是否显示 | boolean | false |
| run | 运行状态 | RunStatusView | - |
| subtitle | 副标题 | string | - |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 关闭抽屉 | (value: boolean) => void |

## 示例

### 基础示例

```vue
<template>
  <ProcessingDrawer />
</template>
```
