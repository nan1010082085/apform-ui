# @apform-ui

**Vue 3 中后台 + AI 对话界面整套积木**：Element Plus 皮换完直接用。

[![npm](https://img.shields.io/npm/v/@apform-ui/core)](https://www.npmjs.com/package/@apform-ui/core)
[![downloads](https://img.shields.io/npm/dm/@apform-ui/core)](https://www.npmjs.com/package/@apform-ui/core)
[![license](https://img.shields.io/npm/l/@apform-ui/core)](./LICENSE)

文档站：https://pyflow.icu/schema-platform/apform-ui/  
试玩模板：[`examples/vite-minimal`](./examples/vite-minimal)（可导入 StackBlitz）

## 什么时候该用我

| 场景 | 建议 |
|------|------|
| 已有 Element Plus，想统一视觉 + 列表/对话/监控整页 | ✅ |
| 只要几个按钮、已有 antd-vue 全家桶 | ❌ 不必换 |
| 需要追 EP 最新大版本 | ❌ 本库钉 `element-plus@2.14.2` |

## 30 秒上手

```bash
npm i @apform-ui/core element-plus@2.14.2 vue@^3.5.0
```

```ts
import { PageShell, PageHeader, ContentPanel } from '@apform-ui/core'
import '@apform-ui/core/tokens.css'
import '@apform-ui/core/design-tokens.css'
import '@apform-ui/core/style.css'
import '@apform-ui/core/styles/element-override.css'
```

差异点：① Design Token 盖 EP 默认皮 ② `core` / `chat` / `bpmn` 三入口 ③ 场景指南教整页拼法。

## 包

| 包 | 说明 |
|----|------|
| `@apform-ui/core` | 主库（唯一常发布 npm 包） |
| playground | 文档站（不发 npm） |

## 开发

```bash
pnpm i
pnpm docs:dev
pnpm gate
```

发版：`pnpm release`（见 [RELEASE.md](./RELEASE.md)）。路线图：[ROADMAP.md](./ROADMAP.md)。贡献：[CONTRIBUTING.md](./CONTRIBUTING.md)。

## Used by

已在 Schema Platform（UA / AI / Flow 等）生产使用；公开文档站与平台页即活案例。欢迎补截图 PR。
