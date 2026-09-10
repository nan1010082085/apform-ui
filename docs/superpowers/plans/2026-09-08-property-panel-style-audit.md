# PropertyPanel vs Editor 样式对照审计

> **Status: CLOSED** — 2026-09-08 已完成并关闭。FieldRow gap=0、Section radius=6px 已合入 `@apform-ui/core@1.10.29`。

> 目标：core 属性壳与 editor PropertyField / PropertySection 视觉一致。

## 对照表（2026-09-08）

| 项 | editor | core（修前） | 状态 |
|----|--------|--------------|------|
| label 宽 | 88px | `--form-label-width` 88px | OK |
| label 字号/色 | 12px / regular | 12px / regular | OK |
| label 行高 | 32px | control-height-md 32px | OK |
| 行高 / margin-bottom | 32 / 8px | 32 / 8px | OK |
| label–control gap | **0**（仅 width 定栏） | **曾为 12px** | **已修 → 0**（`@apform-ui/core@1.10.29`） |
| Section 标题 | 11px / 600 / letter-spacing 0.3 | 同 | OK |
| Section header 高 | 32px | 32px | OK |
| Section 底边 | `#f0f2f5` | `--border-color-extra-light` | OK |
| Section body padding | 8px 12px 4px | 同 | OK |
| Section radius | 6px | **曾无** | **已修 → 6px**（`1.10.29`） |
| 控件 size | small | `PROPERTY_CONTROL_SIZE` | OK |

## 残余风险

- TruncatedTooltipText vs editor `el-tooltip`：交互略不同，布局一致。
- SectionToggle count 徽章：editor 有 count，core 有；对齐。
- AI 侧自定义 slot 内若再包一层 margin，可能二次间距——迁移时禁止外层再加 `.field` margin。
