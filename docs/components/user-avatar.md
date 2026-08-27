# UserAvatar 用户头像

统一的用户头像组件，支持图片和首字母两种模式。

## 基础用法

<DemoBlock demo="UserAvatarBasic" />

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `name` | `string` | `''` | 用户名（取首字母作为 fallback） |
| `src` | `string` | `''` | 头像图片 URL |
| `size` | `number` | `32` | 尺寸（px） |
| `shape` | `'circle' \| 'square'` | `'circle'` | 形状 |

### Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `error` | `Event` | 图片加载失败 |
