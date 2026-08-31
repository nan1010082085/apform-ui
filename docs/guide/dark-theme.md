# 暗色主题

`@apform-ui/core` 提供 `theme/dark.css`，与 Element Plus 暗色变量及平台设计令牌对齐。

## 启用方式

```typescript
// main.ts
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@apform-ui/core/style.css'
import '@apform-ui/core/design-tokens.css'
import '@apform-ui/core/theme/dark.css'
```

根节点切换（与 Playground 一致）：

```html
<html data-theme="dark">
```

或使用 EP 约定：

```html
<html class="dark">
```

## Playground 验证

本地 `pnpm --filter @apform-ui/playground dev`，右上角 **暗色 / 浅色** 切换即可预览。

## 代表组件抽检（2026-08-31）

在 Playground 暗色模式下人工抽检，背景/边框/文字对比度正常：

| # | 组件 | Demo 路径 | 结果 |
|---|------|-----------|------|
| 1 | PageShell | `/page-shell` | ✅ |
| 2 | PageHeader | `/page-header` | ✅ |
| 3 | FilterBar | `/filter-bar` | ✅ |
| 4 | CardTable | `/card-table` | ✅ |
| 5 | EmptyState | `/empty-state` | ✅ |
| 6 | AppDialog | `/app-dialog` | ✅ |
| 7 | MessageBubble | `/message-bubble` | ✅ |
| 8 | Composer | `/composer` | ✅ |
| 9 | StatusTag | `/status-tag` | ✅ |
| 10 | Toast | `/toast` | ✅ |

发版前可在上述 Demo 路径复验；新增组件入库时至少抽检 1 个同类别代表。

## 自定义

暗色覆盖变量定义在 `packages/core/src/theme/dark.css`。业务项目如需微调，在引入顺序上 **后于** core 暗色文件追加覆盖即可。
