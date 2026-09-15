# 快速开始

面向 `@apform-ui/core@^1.18.1`。交互预览请运行仓库 `pnpm docs:dev`（playground）。

## 0. 定位（必读）

**Element Plus 是本库底座 peer，包装在 `@apform-ui` 消费栈下；`el-*` 原语算本库可用能力，不必再包一层才算「有组件」。**  
**外观以本库 Design Tokens + `element-override.css` 为准**，不是 EP 默认皮肤。

详见 [架构定位：Element Plus 与设计令牌](./architecture.md)。

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
| 管理台 / 列表 / 监控 | `@apform-ui/core` | `tokens.css` + `style.css` + **`element-override.css`** |
| 对话 / Chat UI | `@apform-ui/core/chat` | `tokens.css` + `chat.css` + **`element-override.css`** |
| BPMN 画布预览 | `@apform-ui/core/bpmn` | `bpmn.css` + vue-flow 自带 CSS |

不要把 BPMN 从主入口或 `/chat` 引入——主入口与 chat 入口**不导出** `BpmnFlowPreviewCanvas`，以免 vue-flow 进入对话包。

## 3. 最小示例（通用）

```typescript
import { PageShell, PageHeader, ContentPanel, CardTable } from '@apform-ui/core'
import '@apform-ui/core/tokens.css'
import '@apform-ui/core/design-tokens.css'
import '@apform-ui/core/style.css'
import '@apform-ui/core/styles/element-override.css'
// 此后可直接使用 el-button / el-tree / el-table，视觉跟本库 token
```

## 4. 最小示例（对话）

```typescript
import { MessageBubble, MessageList, Composer } from '@apform-ui/core/chat'
import '@apform-ui/core/tokens.css'
import '@apform-ui/core/chat.css'
import '@apform-ui/core/styles/element-override.css'
```

## 5. 最小示例（BPMN）

```typescript
import { BpmnFlowPreviewCanvas } from '@apform-ui/core/bpmn'
import '@apform-ui/core/bpmn.css'
// vue-flow 样式由组件内部引入；亦可在宿主按需补齐
```

## 相关文档

- [架构定位：Element Plus 与设计令牌](./architecture.md)
- [多入口迁移](./migration.md)
- [监控组件规格](./monitoring-components.md)
- [富预览 PDF/Excel](./rich-preview.md)
