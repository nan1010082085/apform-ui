# StatusTag 状态标签

用于显示审批状态、工作流状态、数据状态等。

## 基础用法

预设了常用状态的颜色映射。

<DemoBlock demo="StatusTagBasic" />

## 内置状态

| 状态 | 标签 | 颜色 |
|------|------|------|
| `pending` | 待审批 | 警告黄 |
| `approved` | 已通过 | 成功绿 |
| `rejected` | 已拒绝 | 危险红 |
| `running` | 运行中 | 主色蓝 |
| `completed` | 已完成 | 成功绿 |
| `failed` | 失败 | 危险红 |
| `draft` | 草稿 | 信息蓝 |
| `published` | 已发布 | 成功绿 |
| `active` | 启用 | 成功绿 |
| `inactive` | 停用 | 危险红 |
| `archived` | 已归档 | 信息蓝 |

## 自定义状态

```vue
<StatusTag
  status="custom"
  :status-map="{
    custom: { label: '自定义', type: 'primary', effect: 'dark' }
  }"
/>
```

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `status` | `string` | — | 状态值（必填） |
| `statusMap` | `Record<string, StatusConfig>` | — | 自定义状态映射（合并到默认映射） |
| `round` | `boolean` | `true` | 圆角样式 |
| `size` | `'large' \| 'default' \| 'small'` | `'default'` | 尺寸 |

### StatusConfig

```ts
interface StatusConfig {
  label: string
  type: 'success' | 'warning' | 'danger' | 'info' | 'primary' | ''
  effect?: 'dark' | 'light' | 'plain'
}
```
