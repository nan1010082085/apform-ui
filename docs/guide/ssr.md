# SSR / Nuxt 可用性

`@apform-ui/core` 以 **客户端 Vue 3 + Vite** 为主路径。SSR（含 Nuxt 3）可用，但需注意浏览器 API 与 optional peer。

## 必须

1. 宿主注册 `apformOptionalPeers()`（`@apform-ui/core/vite`），避免未安装的 echarts / pdfjs / vue-flow 在打包期炸掉。
2. 样式在入口一次性引入：`tokens.css` → `design-tokens.css` → `style.css`（或 `chat.css`）→ `element-override.css`。
3. 仅使用 **ESM `import`**，不支持 `require()`。

## 注意点

| 区域 | 风险 | 建议 |
|------|------|------|
| `document` / `window` | 部分反馈组件、滑块验证码、剪贴板 | 仅在 `onMounted` 后调用；SSR 输出占位 |
| `pdfjs-dist` | 依赖 Worker / canvas | 客户端动态 `import()`；缺 peer 时 PdfPreviewCard 走降级卡 |
| `echarts` | 需 DOM 尺寸 | MetricChart 在 mounted 初始化；缺 peer 显示空态 |
| `vue-flow` | 仅 bpmn 入口 | 不要从 `core` / `chat` 拉 BPMN；SSR 可 client-only 包裹 |

## Nuxt 示例（示意）

```ts
// nuxt.config.ts
import { apformOptionalPeers } from '@apform-ui/core/vite'

export default defineNuxtConfig({
  vite: {
    plugins: [apformOptionalPeers()],
  },
  css: [
    '@apform-ui/core/tokens.css',
    '@apform-ui/core/design-tokens.css',
    '@apform-ui/core/style.css',
    '@apform-ui/core/styles/element-override.css',
  ],
})
```

对话页建议用 `<ClientOnly>` 包裹 `MessageList` / `Composer` 等强交互区。
