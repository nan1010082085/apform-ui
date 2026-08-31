# AppIcon 双轨策略

## 现状

| 来源 | 说明 |
|------|------|
| `@apform-ui/core` `AppIcon` | `iconRegistry.ts` 唯一合法名称；开发模式未注册会警告 |
| `platform-shared` `AppIcon` | 保留 **ICON_MAP + Iconify fallback**，兼容历史动态图标名 |

## 何时用哪边

- **新代码 / 组件库 Demo**：直接用 `@apform-ui/core` 的 `AppIcon`，名称必须在注册表内。
- **外部/DB 动态图标名**：经 `platform-shared` 的 `resolveIconName()`，或 shared 层 AppIcon。
- **统一时机**：待 shared 评估 re-export core + fallback 层后再迁移，**不在 ui 发版门禁内强制改 shared**。

## 新增图标

见 [iconRegistry](/components/icon-registry)。
