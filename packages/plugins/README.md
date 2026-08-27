# @apform-ui/plugins

@apform-ui 插件扩展，提供国际化、埋点、权限等 Vue 插件。

## 安装

```bash
npm install @apform-ui/plugins vue
```

## 插件清单

| 插件 | 说明 |
|------|------|
| `createI18nPlugin` | 轻量国际化 |
| `createAnalyticsPlugin` | 轻量埋点 |
| `createPermissionPlugin` | 权限指令 |

## 使用

### 国际化

```ts
import { createI18nPlugin, useI18n } from '@apform-ui/plugins'

const i18n = createI18nPlugin({
  locale: 'zh-CN',
  messages: {
    'zh-CN': { hello: '你好', greeting: '你好，{name}' },
    'en': { hello: 'Hello', greeting: 'Hello, {name}' },
  },
})

app.use(i18n)
```

```vue
<script setup>
import { useI18n } from '@apform-ui/plugins'
const { t, setLocale } = useI18n()
</script>

<template>
  <p>{{ t('hello') }}</p>
  <p>{{ t('greeting', { name: '张三' }) }}</p>
</template>
```

### 埋点

```ts
import { createAnalyticsPlugin, track } from '@apform-ui/plugins'

app.use(createAnalyticsPlugin({
  onTrack: (event) => {
    // 上报到你的分析平台
    console.log('track:', event)
  },
}))
```

```ts
track('button_click', { button: 'save' })
```

### 权限

```ts
import { createPermissionPlugin, usePermission } from '@apform-ui/plugins'

const perm = createPermissionPlugin({
  getPermissions: async () => {
    const res = await fetch('/api/permissions')
    return res.json()
  },
})

app.use(perm)
await perm.loadPermissions()
```

```vue
<template>
  <!-- 有权限才渲染 -->
  <button v-permission="'user:delete'">删除</button>
  <button v-permission="['user:edit', 'user:delete']">编辑</button>
</template>
```
