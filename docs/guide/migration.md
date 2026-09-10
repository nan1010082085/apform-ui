# 多入口迁移（→ 1.11.x）

自 `@apform-ui/core@1.11.0` 起，库拆为三个公开入口，避免对话包携带 `@vue-flow`。

## 变更摘要

| 之前（≤1.10） | 之后（≥1.11） |
|---------------|---------------|
| 全部从 `@apform-ui/core` 引入 | 通用仍走主入口；对话走 `/chat`；BPMN 走 `/bpmn` |
| `BpmnFlowPreviewCanvas` 可能随主包/对话依赖链进入业务包 | 仅 `@apform-ui/core/bpmn` 导出，并声明 vue-flow optional peer |
| 样式通常只引 `style.css` | 可按入口用 `chat.css` / `bpmn.css`（**exports 自 1.11.1**） |

## 对话应用

```diff
- import { MessageBubble, Composer } from '@apform-ui/core'
+ import { MessageBubble, Composer } from '@apform-ui/core/chat'

- import '@apform-ui/core/style.css'
+ import '@apform-ui/core/chat.css'
```

仍可使用 `style.css`（全量），体积更大但行为兼容。

确认业务 `package.json` **不要**再为纯对话场景声明 `@vue-flow/*`，除非同时使用 `/bpmn`。

## BPMN 预览

```diff
- import { BpmnFlowPreviewCanvas } from '@apform-ui/core'
+ import { BpmnFlowPreviewCanvas } from '@apform-ui/core/bpmn'

+ npm install @vue-flow/core @vue-flow/background @vue-flow/controls
+ import '@apform-ui/core/bpmn.css'
```

可与 `FlowPreviewShell`（仍在 chat/主包侧）组合：壳从 `/chat` 或主入口引入，画布从 `/bpmn` 引入。

## 通用 / 监控 / 属性面板

无需改引入路径，继续：

```typescript
import { PageShell, MetricChart, PropertyPanel } from '@apform-ui/core'
import '@apform-ui/core/style.css'
```

## 版本建议

| 需求 | 版本 |
|------|------|
| 多入口 JS | `^1.11.0` |
| 官方子路径 `chat.css` / `bpmn.css` | `^1.11.1` |

## 校验清单

- [ ] 对话组件 import 来自 `@apform-ui/core/chat`
- [ ] BPMN import 来自 `@apform-ui/core/bpmn`，且已装 vue-flow peers
- [ ] 纯对话依赖树中无 `@vue-flow/*`（可用锁文件 / `pnpm why` 核对）
- [ ] 样式路径与入口匹配（或统一用 `style.css`）
- [ ] playground / 本地构建通过

详见 [快速开始](./getting-started.md)。
