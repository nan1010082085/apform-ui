# useConfirm 确认弹框

包装 `ElMessageBox.confirm` 的 composable，替代项目中直接使用 `ElMessageBox.confirm`。

## 基础用法

<DemoBlock demo="UseConfirmBasic" />

## 用法对比

### 之前（直接使用 ElMessageBox）

```ts
import { ElMessageBox } from 'element-plus'

try {
  await ElMessageBox.confirm(message, t('confirm.title'), {
    confirmButtonText: t('confirm.ok'),
    cancelButtonText: t('confirm.cancel'),
    type: 'warning',
  })
  // 确认
} catch {
  // 取消
}
```

### 之后（useConfirm）

```ts
import { useConfirm } from '@schema-ui/core'

const { confirm } = useConfirm()

const ok = await confirm('确定要保存吗？')
if (ok) {
  // 确认
}
```

## API

### `useConfirm()`

返回以下方法：

#### `confirm(message, options?)`

通用确认弹框。

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `message` | `string` | — | 确认消息 |
| `options.title` | `string` | `'确认操作'` | 弹框标题 |
| `options.type` | `'info' \| 'warning' \| 'danger' \| 'success'` | `'warning'` | 图标类型 |
| `options.confirmButtonText` | `string` | `'确定'` | 确认按钮文案 |
| `options.cancelButtonText` | `string` | `'取消'` | 取消按钮文案 |

**返回** `Promise<boolean>` — `true` 确认，`false` 取消

#### `confirmDelete(target, options?)`

删除确认弹框（danger 类型，红色确认按钮）。

| 参数 | 类型 | 说明 |
|------|------|------|
| `target` | `string` | 删除目标名称，如 `'该文件'`、`'该用户'` |
| `options` | `ConfirmOptions` | 可覆盖默认配置 |

#### `confirmDanger(message, options?)`

危险操作确认弹框（danger 类型）。
