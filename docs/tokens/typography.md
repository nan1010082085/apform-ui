# 字体

## 字号阶梯

| Token | 值 | 常见场景 |
|-------|-----|----------|
| `--font-size-10` | 10px | 危险标签、代码语言角标 |
| `--font-size-11` | 11px | 辅助 meta、时间戳 |
| `--font-size-12` | 12px | 次要说明、Hint |
| `--font-size-13` | 13px | 表单标签、列表正文 |
| `--font-size-14` | 14px | **默认正文** |
| `--font-size-15` | 15px | Markdown 标题微抬 |
| `--font-size-16` | 16px | 对话框标题 |
| `--font-size-18` | 18px | EmptyState 标题 |
| `--font-size-20` | 20px | 区块标题 |
| `--font-size-22` | 22px | PageHeader 标题 |
| `--font-size-24` | 24px | 大标题 / 图标占位 |
| `--font-size-28` | 28px | 营销级标题（慎用） |

```css
.meta { font-size: var(--font-size-11); }
.body { font-size: var(--font-size-14); }
.page-title { font-size: var(--font-size-22); }
```

```ts
import { FONT_SIZE } from '@apform-ui/core'
```

## 字重 / 行高

| Token | 值 |
|-------|-----|
| `--font-weight-regular` | 400 |
| `--font-weight-medium` | 500 |
| `--font-weight-semibold` | 600 |
| `--font-weight-bold` | 700 |
| `--line-height-tight` | 1.25 |
| `--line-height-normal` | 1.5 |
| `--line-height-relaxed` | 1.75 |

## 字体族

- `--font-family-base`
- `--font-family-semibold`
- `--font-family-number`
- `--font-family-mono`
