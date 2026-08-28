# 设计令牌

`@apform-ui/core` 与 `@schema-platform/platform-shared` 共用同一套 CSS 变量。业务样式应引用令牌，避免写死 `px`。

```ts
import '@apform-ui/core/style.css'
// 或
import '@schema-platform/platform-shared/styles/tokens.css'
```

```ts
import { CONTROL_HEIGHT, FONT_SIZE, ICON_SIZE, LAYOUT_HEIGHT, PAGE } from '@apform-ui/core'
```

## 目录

| 页面 | 内容 |
|------|------|
| [颜色](./colors) | 主色 / 功能色 / 文字 / 背景 |
| [字体](./typography) | 字号阶梯与行高 |
| [尺寸与高度](./sizing) | 控件高度、布局高度、图标、页面边距 |
| [间距](./spacing) | spacing 阶梯 |
| [阴影](./shadows) | 阴影层级 |
| [动画](./animation) | duration / easing |
| [Z-Index](./z-index) | 浮层层级 |

## 原则

1. **控件高度**用 `--control-height-*`，不要散落 `height: 32px`
2. **字号**用 `--font-size-*`（含 10/11/15/22 等全仓高频值）
3. **页面壳**用 `--page-padding-*` / `--sidebar-width` / `--header-height`
4. 历史别名仍可用：`--button-height`、`--input-height`、`--detail-item-height`
