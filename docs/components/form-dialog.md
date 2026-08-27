# FormDialog 表单弹框

集成表单验证的弹框，确认时自动校验。

## 基础用法

<DemoBlock demo="FormDialogBasic" />

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `modelValue` | `boolean` | — | 控制显示（v-model） |
| `title` | `string` | — | 弹框标题 |
| `formData` | `Record<string, unknown>` | — | 表单数据对象（必填） |
| `rules` | `FormRules` | `{}` | 表单验证规则 |
| `width` | `string` | `'500px'` | 弹框宽度 |
| `labelWidth` | `string` | `'100px'` | 标签宽度 |
| `loading` | `boolean` | `false` | 确认按钮加载状态 |
| `showFullscreenBtn` | `boolean` | `false` | 是否显示全屏按钮 |

### Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:modelValue` | `boolean` | v-model 更新 |
| `submit` | `Record<string, unknown>` | 验证通过后提交（传递 formData 副本） |
| `cancel` | — | 取消 |

### Slots

| 插槽 | 作用域 | 说明 |
|------|--------|------|
| `default` | `{ form }` | 表单字段，通过 `form` 访问表单数据 |
