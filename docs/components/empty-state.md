# EmptyState 空状态

列表/页面无数据时的占位展示。

## 基础用法

<DemoBlock demo="EmptyStateBasic" />

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `icon` | `string` | — | 图标名称（AppIcon 已注册的 name） |
| `iconSize` | `number` | `64` | 图标尺寸 |
| `title` | `string` | — | 标题文案 |
| `description` | `string` | — | 描述文案 |

### Slots

| 插槽 | 说明 |
|------|------|
| `default` | 操作按钮区 |
