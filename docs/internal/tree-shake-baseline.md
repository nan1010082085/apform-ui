# 树摇体积基线

> 生成时间：2026-08-31 · core dist 已 build

## 全量产物（未 tree-shake）

| 文件 | 体积 |
|------|------|
| `dist/apform-ui.js` | 288.3 KB |
| `dist/apform-ui.css` | 58.3 KB |

## 单组件 import（esbuild minify，vue / element-plus external）

| Export | minified JS |
|--------|-------------|
| `PageShell` | 132.9 KB |
| `AppPagination` | 133.4 KB |
| `MessageBubble` | 149.6 KB |
| `FilterBar` | 133.3 KB |
| `Composer` | 136.6 KB |

复测：`node scripts/tree-shake-baseline.mjs`（需先 `pnpm --filter @apform-ui/core build`）
