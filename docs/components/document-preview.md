# DocumentPreview 文档预览

> 文档预览组件，支持PDF、Office文档、图片等多种格式的预览。

## 组件列表

- **DocumentPreviewPanel** - 文档预览面板
- **DocumentPreviewDrawer** - 文档预览抽屉

## 基础用法

```vue
<template>
  <DocumentPreviewPanel
    :chunks="documentChunks"
    :loading="loading"
    @download="onDownload"
  />
</template>

<script setup>
import { ref } from 'vue'
import { DocumentPreviewPanel } from '@apform-ui/core'

const documentChunks = ref([])
const loading = ref(false)

function onDownload(chunk) {
  // 下载文档
}
</script>
```

## 属性

### DocumentPreviewPanel

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| chunks | 文档分块数据 | DocumentPreviewChunk[] | [] |
| loading | 是否加载中 | boolean | false |
| maxHeight | 最大高度 | string | '600px' |

### DocumentPreviewDrawer

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 是否显示 | boolean | false |
| chunks | 文档分块数据 | DocumentPreviewChunk[] | [] |
| loading | 是否加载中 | boolean | false |
| title | 标题 | string | '文档预览' |

## 事件

### DocumentPreviewPanel

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| download | 下载文档 | (chunk: DocumentPreviewChunk) => void |

### DocumentPreviewDrawer

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 关闭抽屉 | (value: boolean) => void |
| download | 下载文档 | (chunk: DocumentPreviewChunk) => void |

## 类型定义

```typescript
interface DocumentPreviewChunk {
  id: string
  content: string
  type: 'text' | 'image' | 'pdf' | 'office'
  metadata?: Record<string, unknown>
}
```

## 示例

### 基础文档预览

```vue
<template>
  <DocumentPreviewPanel
    :chunks="chunks"
    :loading="loading"
    @download="onDownload"
  />
</template>

<script setup>
import { ref } from 'vue'
import { DocumentPreviewPanel } from '@apform-ui/core'

const chunks = ref([
  {
    id: '1',
    content: '文档内容...',
    type: 'text'
  }
])
const loading = ref(false)

function onDownload(chunk) {
  console.log('下载文档:', chunk)
}
</script>
```

### 抽屉式文档预览

```vue
<template>
  <el-button @click="drawerVisible = true">打开预览</el-button>
  
  <DocumentPreviewDrawer
    v-model="drawerVisible"
    :chunks="chunks"
    :loading="loading"
    title="文档预览"
  />
</template>

<script setup>
import { ref } from 'vue'
import { DocumentPreviewDrawer } from '@apform-ui/core'

const drawerVisible = ref(false)
const chunks = ref([])
const loading = ref(false)
</script>
```

### 支持多种文档类型

```vue
<template>
  <DocumentPreviewPanel :chunks="mixedChunks" />
</template>

<script setup>
import { ref } from 'vue'
import { DocumentPreviewPanel } from '@apform-ui/core'

const mixedChunks = ref([
  {
    id: 'text',
    content: '这是一段文本内容',
    type: 'text'
  },
  {
    id: 'image',
    content: 'https://example.com/image.jpg',
    type: 'image'
  },
  {
    id: 'pdf',
    content: 'https://example.com/document.pdf',
    type: 'pdf'
  }
])
</script>
```
