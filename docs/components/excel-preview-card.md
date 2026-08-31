# ExcelPreviewCard

Excel 表格预览壳：**不内置 xlsx 解析**，由父组件传入 sheet / headers / rows。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { ExcelPreviewCard } from '@apform-ui/core'

const sheet = ref('Sheet1')
const headers = ['列A', '列B']
const rows = [['1', '2'], ['3', '4']]
</script>

<template>
  <ExcelPreviewCard
    v-model="sheet"
    :sheet-names="['Sheet1']"
    :headers="headers"
    :rows="rows"
    :total-rows="3"
  />
</template>
```

## Props

| 属性 | 类型 | 说明 |
|------|------|------|
| `sheetNames` | `string[]?` | 工作表 tab |
| `modelValue` | `string?` | 当前 sheet |
| `headers` | `string[]?` | 表头 |
| `rows` | `string[][]?` | 数据行 |
| `totalRows` | `number?` | 总行数 |
| `maxPreviewRows` | `number?` | 预览行数上限说明，默认 100 |
| `loading` / `error` | | 状态 |

## Events

| 事件 | 说明 |
|------|------|
| `update:modelValue` | 切换 sheet |
