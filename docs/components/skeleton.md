# Skeleton 骨架屏

列表/卡片加载时的占位展示。

## 基础用法

支持 card（卡片）、list（列表）、table（表格）三种预设。

<DemoBlock demo="SkeletonBasic" />

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `'card' \| 'list' \| 'table'` | `'card'` | 骨架类型 |
| `count` | `number` | `3` | 卡片/列表项数量 |
| `rows` | `number` | `5` | 表格模式行数 |
| `animated` | `boolean` | `true` | 是否开启动画 |
