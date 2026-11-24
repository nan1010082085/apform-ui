# Chat Token 迁移：`--c-*` → `--apf-*`

> 范围：仅 `@apform-ui` 组件样式。Element Plus 仍为 peer 软 fork，不改 EP 内部变量。

## 原则

1. **真相源**：`--apf-*`（`tokens.css` Layer A）
2. **新样式只写 `--apf-*`**；禁止新增 `--c-*`
3. Layer B（`--color-*` / `--text-color-*` / `--bg-color-*`）保留兼容，新 Chat/布局样式不要再平行一套
4. Layer C（`--c-*`）别名定义暂留，避免宿主覆写立刻失效；组件源码应收敛引用

换肤：覆盖 `--apf-color-primary`（及同源变体）即可。

## 对照表

| Chat `--c-*`（旧） | 写入目标 `--apf-*` |
|---|---|
| `--c-primary` | `--apf-color-primary` |
| `--c-primary-hover` | `--apf-color-primary-hover` |
| `--c-primary-soft` | `--apf-color-primary-bg-light` |
| `--c-danger` | `--apf-color-danger` |
| `--c-danger-soft` | `--apf-color-danger-bg` |
| `--c-warning` | `--apf-color-warning` |
| `--c-success` | `--apf-color-success` |
| `--c-running` | `--apf-color-info` |
| `--c-waiting` | `--apf-color-warning` |
| `--c-border` | `--apf-border-base` |
| `--c-border-soft` | `--apf-border-light` |
| `--c-surface` | `--apf-bg-surface` |
| `--c-bg` | `--apf-bg-page` |
| `--c-bg-muted` | `--apf-bg-gray` |
| `--c-text` | `--apf-text-primary` |
| `--c-text-secondary` | `--apf-text-secondary` |
| `--c-text-muted` | `--apf-text-muted` |
| `--radius`（Chat 局部） | `--apf-radius-md` |

禁止硬编码 `#409eff` / Tailwind 蓝紫渐变；fallback 用品牌 `#0060A2` 系。

## 相关

- [主题与 Design Token](./tokens.md)
- [docs/CONVENTIONS.md](../CONVENTIONS.md)「视觉语言」
