# ConfirmDialog 确认弹框

用于删除、提交等需要用户确认的操作。

## 基础用法

<DemoBlock demo="ConfirmDialogBasic" />

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `modelValue` | `boolean` | — | 控制显示（v-model） |
| `title` | `string` | `'确认操作'` | 弹框标题 |
| `message` | `string` | — | 确认消息（必填） |
| `type` | `'info' \| 'warning' \| 'danger'` | `'warning'` | 图标类型 |
| `width` | `string` | `'400px'` | 弹框宽度 |
| `loading` | `boolean` | `false` | 确认按钮加载状态 |
| `cancelText` | `string` | `'取消'` | 取消按钮文案 |
| `confirmText` | `string` | `'确定'` | 确认按钮文案 |

### Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:modelValue` | `boolean` | v-model 更新 |
| `confirm` | — | 点击确认 |
