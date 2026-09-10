# 快速开始

面向 `@apform-ui/core@^1.11.1`。交互预览请运行仓库 `pnpm docs:dev`（playground）。

## 1. 安装

```bash
npm install @apform-ui/core element-plus@2.14.2 vue@^3.5.0
```

按功能再装 optional peer：

| 能力 | 包 |
|------|-----|
| 指标图 | `echarts` |
| PDF 富预览 | `pdfjs-dist` |
| Excel 富预览 | `xlsx` |
| 虚拟消息列表 | `vue-virtual-scroller` |
| BPMN 预览 | `@vue-flow/core` `@vue-flow/background` `@vue-flow/controls` |

## 2. 选入口

| 场景 | 从哪引入 | 样式 |
|------|----------|------|
| 管理台 / 列表 / 监控 | `@apform-ui/core` | `tokens.css` + `style.css` |
| 对话 / Chat UI | `@apform-ui/core/chat` | `tokens.css` + `chat.css` |
| BPMN 画布预览 | `@apform-ui/core/bpmn` | `bpmn.css` + vue-flow 自带 CSS |

不要把 BPMN 从主入口或 `/chat` 引入——主入口与 chat 入口**不导出** `BpmnFlowPreviewCanvas`，以免 vue-flow 进入对话包。

## 3. 最小示例（通用）

```typescript
import { PageShell, PageHeader, ContentPanel, CardTable } from '@apform-ui/core'
import '@apform-ui/core/tokens.css'
import '@apform-ui/core/design-tokens.css'
import '@apform-ui/core/style.css'
import '@apform-ui/core/styles/element-override.css'
```

## 4. 最小示例（对话）

```typescript
import { MessageBubble, MessageList, Composer } from '@apform-ui/core/chat'
import '@apform-ui/core/tokens.css'
import '@apform-ui/core/chat.css'
```

## 5. 最小示例（BPMN）

```typescript
import { BpmnFlowPreviewCanvas } from '@apform-ui/core/bpmn'
import '@apform-ui/core/bpmn.css'
// vue-flow 样式由组件内部引入；亦可在宿主按需补齐
```

## 相关文档

- [多入口迁移](./migration.md)
- [监控组件规格](./monitoring-components.md)
- [富预览 PDF/Excel](./rich-preview.md)
