# AppDialog 通用弹框

基于 `el-dialog` 的增强弹框，支持全屏切换和拖拽。

## 基础用法

最简单的弹框用法。

<DemoBlock demo="AppDialogBasic" />

## 全屏弹框

点击右上角按钮可切换全屏模式。

<DemoBlock demo="AppDialogFullscreen" />

## 自定义按钮文案

通过 `cancel-text` 和 `confirm-text` 属性自定义按钮文案。

<DemoBlock demo="AppDialogCustomFooter" />

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `modelValue` | `boolean` | — | 控制弹框显示（v-model） |
| `title` | `string` | — | 弹框标题 |
| `width` | `string` | `'580px'` | 弹框宽度 |
| `destroyOnClose` | `boolean` | `true` | 关闭时销毁内容 |
| `loading` | `boolean` | `false` | 确认按钮加载状态 |
| `draggable` | `boolean` | `true` | 是否可拖拽 |
| `appendToBody` | `boolean` | `true` | 插入到 body |
| `showFullscreenBtn` | `boolean` | `true` | 是否显示全屏按钮 |
| `closeOnClickModal` | `boolean` | `false` | 点击遮罩关闭 |
| `cancelText` | `string` | `'取消'` | 取消按钮文案 |
| `confirmText` | `string` | `'确定'` | 确认按钮文案 |

### Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:modelValue` | `boolean` | v-model 更新 |
| `confirm` | — | 点击确认 |
| `cancel` | — | 点击取消 |
| `close` | — | 弹框关闭 |

### Slots

| 插槽 | 说明 |
|------|------|
| `default` | 弹框内容 |
| `footer` | 自定义底部（覆盖默认按钮） |
