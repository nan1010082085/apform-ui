# 树摇（Tree Shaking）

`@apform-ui/core` 支持具名 import，打包工具可摇掉未使用组件。

## 推荐写法

```typescript
import { PageShell, PageHeader, FilterBar } from '@apform-ui/core'
import '@apform-ui/core/style.css'
import '@apform-ui/core/design-tokens.css'
```

避免：

```typescript
import * as ApformUI from '@apform-ui/core' // 可能无法充分 tree-shake
```

## 样式

样式文件无法 tree-shake，按需引入：

```typescript
import '@apform-ui/core/style.css'
import '@apform-ui/core/styles/element-override.css'
```

## 验证

仓库内 `playground/src/tree-shake-test.ts` 可用于本地 esbuild 体积抽检。

自动化基线（2026-08-31，`@apform-ui/core@1.6.1`）见 [`docs/internal/tree-shake-baseline.md`](../internal/tree-shake-baseline.md)：

| 场景 | 体积 |
|------|------|
| 全量 `dist/apform-ui.js` | 288.3 KB |
| 全量 `dist/apform-ui.css` | 58.3 KB |

> 注：基线脚本当前 alias 到 **已打包 dist**，单组件行反映的是「具名 import 入口体积」抽检；真实摇树效果以消费方 Vite/Rollup 对 ESM 源码解析为准。

复测：

```bash
pnpm --filter @apform-ui/core build
node scripts/tree-shake-baseline.mjs
```
