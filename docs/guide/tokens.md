# 主题与 Design Token

## 引入顺序（强制）

1. `@apform-ui/core/tokens.css`（`--apf-*` 主规范）
2. `@apform-ui/core/design-tokens.css`（设计语义层）
3. `@apform-ui/core/style.css` 或 `chat.css` / `bpmn.css`
4. `@apform-ui/core/styles/element-override.css`（盖 EP 默认皮）

可选：`theme/dark.css`、`styles/fg-theme.css`。

## 命名

| 前缀 | 用途 |
|------|------|
| `--apf-*` | 主规范，**新代码只用这套** |
| `--color-*` / `--bg-color-*` 等 | Layer B 兼容别名 |
| `--c-*` | Layer C Chat 旧别名，**禁止新增**；组件引用见迁移指南 |

品牌色覆盖：在宿主 `:root` 覆盖 `--apf-color-primary`（及 strong 变体）即可；**不要**直接改仓库内 `element-override.css` 后发包给别人。

完整默认值以 `packages/core/src/tokens/tokens.css` 与 `design-tokens.css` 为准。

Chat 样式从 `--c-*` 迁到 `--apf-*`：[token-migration-chat.md](./token-migration-chat.md)。
