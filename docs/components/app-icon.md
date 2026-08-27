# AppIcon 图标

基于 Iconify 的统一图标组件，替代直接使用 `@element-plus/icons-vue`。

## 基础图标

常用图标展示。

<DemoBlock demo="AppIconBasic" />

## 不同尺寸

通过 `size` 属性控制图标大小。

<DemoBlock demo="AppIconSizes" />

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `name` | `string` | — | 图标名称（kebab-case） |
| `size` | `number \| string` | `'1em'` | 图标大小 |
| `color` | `string` | — | 图标颜色 |

### 可用图标

所有可用图标见 `iconRegistry.ts`，常用图标包括：

| 图标名 | 说明 | 图标名 | 说明 |
|--------|------|--------|------|
| `home-filled` | 首页 | `setting` | 设置 |
| `user` | 用户 | `search` | 搜索 |
| `document` | 文档 | `edit` | 编辑 |
| `delete` | 删除 | `plus` | 新增 |
| `refresh` | 刷新 | `download` | 下载 |
| `upload` | 上传 | `view` | 查看 |
| `check` | 确认 | `close` | 关闭 |
| `warning` | 警告 | `info-filled` | 信息 |
| `success-filled` | 成功 | `bell` | 通知 |
| `filter` | 筛选 | `loading` | 加载中 |
| `more-filled` | 更多 | `star` | 收藏 |
| `calendar` | 日历 | `clock` | 时钟 |
