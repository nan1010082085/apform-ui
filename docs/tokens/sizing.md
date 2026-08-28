# 尺寸与高度

全仓样式统计后沉淀的控件 / 布局 / 图标令牌。**新增业务样式请优先使用这些变量。**

## 控件高度

| Token | 值 | 用途 |
|-------|-----|------|
| `--control-height-xs` | 24px | 分页小号、紧凑 chip |
| `--control-height-sm` | 28px | 密集工具栏按钮 |
| `--control-height-md` | 32px | **默认**按钮 / 输入框 |
| `--control-height-lg` | 40px | 强调按钮、大输入 |
| `--control-height-xl` | 44px | 触控友好 / 无障碍下限 |

兼容别名：

- `--button-height` / `--input-height` → `md`
- `--button-height-sm` / `--input-height-sm` → `sm`
- `--button-height-lg` / `--input-height-lg` → `lg`

```css
.my-btn {
  height: var(--control-height-md);
}
.my-btn--dense {
  height: var(--control-height-sm);
}
```

```ts
import { CONTROL_HEIGHT } from '@apform-ui/core'
// CONTROL_HEIGHT.md === '32px'
```

## Element Plus 覆盖

`@apform-ui/core/styles/element-override.css` 将 EP 组件尺寸绑到上述令牌：

```ts
import '@apform-ui/core/design-tokens.css'
import '@apform-ui/core/styles/element-override.css'
```

覆盖内容包括：

- `--el-component-size` / `--el-component-size-small` / `--el-component-size-large`
- `.el-button` / `.el-input` / `.el-select` 高度 → `--button-height` / `--input-height`
- 分页器按钮 → `--input-height` / `--control-height-xs`（small）

平台侧 SCSS 主题（`platform-shared/styles/_theme.scss`）使用同名 `$control-height-*` / `$button-height`，与 CSS 变量保持一致。

## 布局高度

| Token | 值 | 用途 |
|-------|-----|------|
| `--header-height` | 56px | 应用顶栏 |
| `--conversation-header-height` | 68px | Chat 会话顶栏 |
| `--dialog-footer-height` | 60px | 对话框底栏 |
| `--toolbar-height` | 48px | 工具条 |
| `--tabs-height` | 40px | Tab 条 |
| `--list-row-height` | 48px | 列表 / 详情行 |
| `--detail-item-height` | = list-row | 历史兼容 |

## 页面边距与侧栏

| Token | 值 |
|-------|-----|
| `--page-padding-x` | 24px |
| `--page-padding-y` / `--page-padding-bottom` | 24px |
| `--page-header-padding-top` | 28px |
| `--sidebar-width` | 240px |
| `--sidebar-width-collapsed` | 64px |

`PageShell` / `PageHeader` / `SessionSidebar` 已默认引用上述变量。

## 表单布局

| Token | 值 | 用途 |
|-------|-----|------|
| `--form-field-width` | 220px | SearchForm 等筛选项宽度 |
| `--form-label-width` | 96px | FieldRow 标签列宽 |
| `--form-field-gap` | 6px | 标签 ↔ 控件 / 紧凑 chip 间距 |

```css
.apf-search-form__field {
  width: var(--form-field-width, 220px);
  gap: var(--form-field-gap, 6px);
}
.apf-field-row__label {
  width: var(--form-label-width, 96px);
}
```

## 头像尺寸

| Token | 值 | 用途 |
|-------|-----|------|
| `--avatar-size-sm` | 24px | 顶栏紧凑头像 |
| `--avatar-size-md` | 32px | 默认（`UserAvatar` 默认 size） |
| `--avatar-size-lg` | 40px | 列表 / 面板头像 |
| `--avatar-size-xl` | 48px | 大头像 |

`UserAvatar` 的 `size` 为 `24|32|40|48` 时会自动映射到对应 CSS 变量。

## Composer / 多行输入

| Token | 值 | 用途 |
|-------|-----|------|
| `--composer-textarea-min-height` | 96px | 桌面最小高度 |
| `--composer-textarea-min-height-mobile` | 84px | 窄屏最小高度 |
| `--composer-textarea-max-height` | 220px | 最大可拉伸高度 |

发送 / 附件按钮使用 `--control-height-sm` / `--control-height-md`，不要再写死 28/32。

## 图标尺寸

| Token | 值 |
|-------|-----|
| `--icon-size-xs` | 12px |
| `--icon-size-sm` | 14px |
| `--icon-size-md` | 16px |
| `--icon-size-lg` | 20px |
| `--icon-size-xl` | 24px |

配合 `AppIcon` 的 `size` 时，优先映射到上述阶梯，避免业务里再写 `18px` / `22px` 等游离值。

## 圆角

| Token | 值 | 用途 |
|-------|-----|------|
| `--border-radius-sm` | 2px | 按钮默认 |
| `--border-radius-md` | 4px | 输入框 / 小卡片 |
| `--border-radius-6` | 6px | Tabs 选项、工具按钮、badge |
| `--border-radius-8` | 8px | Tabs 容器、Toast、JsonCard、ContentPanel |
| `--border-radius-lg` | 10px | 面板 / 侧栏项 |
| `--border-radius-xl` | 12px | 对话框 / 预览面板 |
| `--border-radius-full` | 999px | pill / chip |

聊天气泡常用 `14px` 等无精确令牌的值可保留为 magic number，不要硬映射到 `lg`/`xl`。

## 迁移建议

1. `height: 32px` / `28px` / `24px` / `40px` / `44px` → `--control-height-*`
2. `font-size: 11px|12px|13px|14px|22px` → `--font-size-*`（含原 `12.5px` 代码块 → `--font-size-12`）
3. `border-radius: 6px|8px` → `--border-radius-6` / `--border-radius-8`
4. 表单列宽 / 标签宽 / 6px gap → `--form-field-*`
5. 头像 24/32/40/48 → `--avatar-size-*`
6. Composer textarea → `--composer-textarea-*`
7. 列表页左右留白 → `--page-padding-x`
8. SCSS 侧使用 `_variables.scss` 中同名 `$control-height-*` / `$icon-size-*` / `$border-radius-*`
