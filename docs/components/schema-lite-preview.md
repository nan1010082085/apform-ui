# SchemaLitePreview

轻量 Schema 表单预览（input / textarea / number / select / switch / date），不依赖 editor WidgetRenderer。

```vue
<script setup>
import { ref } from 'vue'
import { SchemaLitePreview } from '@apform-ui/core'

const model = ref({})
</script>

<template>
  <SchemaLitePreview
    v-model="model"
    :fields="[
      { key: 'name', label: '名称', type: 'input' },
      { key: 'active', label: '启用', type: 'switch' },
    ]"
  />
</template>
```

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `fields` | `SchemaLiteField[]` | — | 字段列表 |
| `modelValue` | `Record<string, unknown>` | `{}` | 表单值 |
| `labelWidth` | `string` | `'100px'` | 标签宽度 |
