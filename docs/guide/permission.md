# 权限插件（@apform-ui/plugins）

面向 `@apform-ui/plugins@^1.1.2`。平台壳与澄语/行云/企服/Vigil 统一从此插件做 **UI 写操作闸门**；路由守卫仍可用 `@schema-platform/platform-shared` 的 `hasPermission`。

## 语义（与平台对齐）

| Subject | 判定 |
|---------|------|
| `platformRole === 'platform_admin'` 或 `isPlatformAdmin` | 通吃 |
| `isAdmin === true` | 通吃（租户管理员） |
| 其它 | `permissions` 数组 OR；支持 `*` / `prefix:*` 通配 |

无权限默认 `display: none`；`reload()` / subject `updated` 后可恢复显隐。

## 安装

```bash
npm install @apform-ui/plugins
```

```ts
import { createPermissionPlugin, usePermission } from '@apform-ui/plugins'
import { useAuthStore } from '@schema-platform/platform-shared/utils/stores/authStore'

const perm = createPermissionPlugin({
  getSubject: () => useAuthStore().user,
})
app.use(perm)
// 登录或 fetchMe 成功后：
await perm.reload()
```

## 模板

```vue
<template>
  <button v-permission="'user:delete'">删除</button>
  <button v-permission="['user:edit', 'user:delete']">编辑或删除</button>
  <button v-permission.all="['a', 'b']">需全部码</button>
  <PermissionButton code="user:create">新建</PermissionButton>
</template>

<script setup lang="ts">
import { PermissionButton, usePermission } from '@apform-ui/plugins'
const { has, hasAny, hasAll } = usePermission()
</script>
```

## 真相源

有效权限码来自平台 `GET /auth/me` 的 `permissions`（及 `isAdmin` / `platformRole`）。  
衍生应用（澄语/行云/企服）BFF 亦按同一码表校验，禁止只靠本地 JWT claim。

## 相关

- 插件 README：`packages/plugins/README.md`
- 平台矩阵：schema-platform-docs → design/rbac-coverage-matrix
