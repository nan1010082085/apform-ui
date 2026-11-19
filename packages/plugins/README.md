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
| `createPermissionPlugin` | 权限指令 / PermissionButton / usePermission |

## 权限

语义与平台 `platform-shared` 对齐：`platform_admin` / `isAdmin` **通吃**；否则按码 OR；`*` 通配。  
无权限策略：`display:none`（subject 变化后 `reload` / `updated` 可恢复显隐）。

```ts
import { createPermissionPlugin, usePermission } from '@apform-ui/plugins'
import { useAuthStore } from '@schema-platform/platform-shared/utils/stores/authStore'

const perm = createPermissionPlugin({
  getSubject: () => useAuthStore().user,
})

app.use(perm)
await perm.reload() // 登录或 fetchMe 后调用
```

```vue
<template>
  <button v-permission="'user:delete'">删除</button>
  <button v-permission="['user:edit', 'user:delete']">编辑</button>
  <button v-permission.all="['a', 'b']">需全部码</button>
  <PermissionButton code="user:create">新建</PermissionButton>
</template>
```

```ts
const { has, hasAny, hasAll, reload } = usePermission()
if (has('tenant:view')) { /* ... */ }
```

路由守卫可继续使用 `@schema-platform/platform-shared` 的 `hasPermission`；**业务 Vue 写操作统一用本插件**。

## 国际化

```ts
import { createI18nPlugin, useI18n } from '@apform-ui/plugins'

const i18n = createI18nPlugin({
  locale: 'zh-CN',
  messages: {
    'zh-CN': { hello: '你好' },
    en: { hello: 'Hello' },
  },
})
app.use(i18n)
```

## 埋点

```ts
import { createAnalyticsPlugin, track } from '@apform-ui/plugins'

app.use(createAnalyticsPlugin({
  onTrack: (event) => console.log('track:', event),
}))
track('button_click', { button: 'save' })
```
