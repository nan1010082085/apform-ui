# @apform-ui/icons

@apform-ui 图标扩展包，提供业务场景图标集。

## 安装

```bash
npm install @apform-ui/icons @iconify/vue
```

## 图标集

| 场景 | 前缀 | 数量 | 说明 |
|------|------|------|------|
| `workflow` | `workflow-*` | 8 | 工作流（播放/暂停/重试/分支等） |
| `approval` | `approval-*` | 6 | 审批（通过/拒绝/转签/评论等） |
| `data` | `data-*` | 6 | 数据文件（JSON/CSV/Excel/PDF等） |

## 使用

```ts
import { allIcons, workflowIcons, getIconsByScene } from '@apform-ui/icons'

// 合并到 core 的 iconRegistry
import { ICON_MAP } from '@apform-ui/core'
Object.assign(ICON_MAP, allIcons)
```

```vue
<template>
  <AppIcon name="workflow-play" :size="18" />
  <AppIcon name="approval-check" :size="18" />
  <AppIcon name="data-excel" :size="18" />
</template>
```
