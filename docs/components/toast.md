# Toast 消息提示

轻量级消息提示组件，支持 4 种类型。

## 基础用法

点击按钮触发不同类型的消息提示。

<DemoBlock demo="ToastBasic" />

## 编程式调用（推荐）

在 App 根组件注入 Toast 实例后，任意子组件可通过 `useToast()` 调用。

```vue
<!-- App.vue 根组件 -->
<script setup>
import { ref } from 'vue'
import { Toast, provideToast } from '@apform-ui/core'

const toastRef = ref()
provide(...provideToast(toastRef))
</script>

<template>
  <Toast ref="toastRef" />
  <router-view />
</template>
```

```vue
<!-- 任意子组件 -->
<script setup>
import { useToast } from '@apform-ui/core'

const toast = useToast()

function handleSave() {
  toast.success('保存成功')
}
</script>
```

## API

### useToast()

| 方法 | 参数 | 说明 |
|------|------|------|
| `show(message, type?, duration?)` | 通用调用 | |
| `info(message, duration?)` | 信息提示 | |
| `success(message, duration?)` | 成功提示 | |
| `warning(message, duration?)` | 警告提示 | |
| `error(message, duration?)` | 错误提示 | |

`duration` 默认 3000ms。
