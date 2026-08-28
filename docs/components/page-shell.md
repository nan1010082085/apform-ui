# PageShell

路由页统一外沿容器（内边距、滚动、fill 一屏模式）。

## 用法

```vue
<script setup>
import { PageShell } from '@apform-ui/core'
</script>
<template>
  <PageShell>
    <!-- 页面内容 -->
  </PageShell>
</template>
```

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `fill` | `boolean` | `false` | 一屏填满，末子节点可内滚 |
