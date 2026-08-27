# resolveApiErrorMessage API 错误消息标准化

将各种格式的 API 错误转换为人类可读的错误消息。

## 基础用法

<DemoBlock demo="ResolveApiErrorMessageBasic" />

## 用法

```ts
import { resolveApiErrorMessage, useMessage } from '@schema-ui/core'

const msg = useMessage()

try {
  await apiCall()
} catch (e) {
  msg.error(resolveApiErrorMessage(e))
}
```

## 支持的错误格式

| 输入 | 输出 |
|------|------|
| `'网络连接失败'` | `网络连接失败` |
| `new Error('请求超时')` | `请求超时` |
| `{ message: '权限不足' }` | `权限不足` |
| `{ errors: { name: ['不能为空'] } }` | `不能为空` |
| `{ code: 'ERR_403' }` | `错误码：ERR_403` |
| `null / undefined` | `操作失败` |

## API

### `resolveApiErrorMessage(error)`

| 参数 | 类型 | 说明 |
|------|------|------|
| `error` | `unknown` | 任意格式的错误对象 |

**返回** `string` — 人类可读的错误消息
