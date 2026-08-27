# ErrorBoundary 错误边界

捕获子组件渲染错误，显示降级 UI。

## 基础用法

<DemoBlock demo="ErrorBoundaryBasic" />

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `context` | `string` | `''` | 错误上下文信息（用于日志） |
| `onError` | `(info) => void` | — | 错误回调 |

### Expose

| 属性/方法 | 类型 | 说明 |
|-----------|------|------|
| `hasError` | `Ref<boolean>` | 是否有错误 |
| `error` | `Ref<Error \| null>` | 错误对象 |
| `retry()` | `() => void` | 重试（清除错误状态） |
