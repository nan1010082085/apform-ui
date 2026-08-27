# useMessage 消息提示

包装 `ElMessage` 的 composable，替代项目中直接使用 `ElMessage.success/error/warning/info`。

## 基础用法

<DemoBlock demo="UseMessageBasic" />

## 用法对比

### 之前

```ts
import { ElMessage } from 'element-plus'

ElMessage.success(t('editor.property.configSaved'))
ElMessage.error(t('editor.common.copyFailed'))
ElMessage.warning(t('editor.templatePanelEditor.nameRequired'))
```

### 之后

```ts
import { useMessage } from '@schema-ui/core'

const msg = useMessage()

msg.success(t('editor.property.configSaved'))
msg.error(t('editor.common.copyFailed'))
msg.warning(t('editor.templatePanelEditor.nameRequired'))
```

## API

### `useMessage()`

返回 `MessageApi` 对象：

| 方法 | 参数 | 说明 |
|------|------|------|
| `success(message, options?)` | 成功消息 | 绿色 |
| `error(message, options?)` | 错误消息 | 红色 |
| `warning(message, options?)` | 警告消息 | 黄色 |
| `info(message, options?)` | 信息消息 | 蓝色 |

`options` 参数继承 Element Plus `MessageOptions`，可覆盖 `duration`、`showClose` 等。
