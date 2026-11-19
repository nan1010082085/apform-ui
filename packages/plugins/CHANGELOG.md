# Changelog

## 1.1.2

- 完善声明文件与构建产物；文档站补充 [权限插件指南](../../docs/guide/permission.md)

## 1.1.1

- 发布声明文件（`.d.ts`）

## 1.1.0

### Features

- 权限插件对齐平台身份：`getSubject`（permissions / isAdmin / platformRole / isPlatformAdmin）
- 超管与租管通吃；`v-permission` 支持 `updated` 与 `.all` 修饰符
- 新增 `PermissionButton`、`usePermission().has/hasAny/hasAll/reload`
- 无权限策略固定为 `display:none`，reload 后可恢复
