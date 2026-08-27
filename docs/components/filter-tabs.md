# FilterTabs 筛选标签栏

按钮组样式的筛选标签，用于列表页分类筛选。

## 基础用法

<DemoBlock demo="FilterTabsBasic" />

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `modelValue` | `string` | — | 当前选中值（v-model） |
| `options` | `{ label: string; value: string }[]` | — | 选项列表 |

### Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:modelValue` | `string` | v-model 更新 |
