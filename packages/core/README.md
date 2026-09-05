# @apform-ui/core

Apform UI 企业级 Vue 3 UI 组件库，基于 Element Plus 2.14.2 fork。

## 安装

```bash
npm install @apform-ui/core element-plus@2.14.2
```

## 组件

| 组件 | 说明 |
|------|------|
| `AppDialog` | 通用弹框（全屏、拖拽） |
| `AppIcon` | 统一图标（Iconify，120+ 图标） |
| `AppPagination` | 统一分页器 |
| `UserAvatar` | 用户头像（图片/首字母） |
| `StatusTag` | 状态标签（预设 15 种状态） |
| `Skeleton` | 骨架屏（card/list/table） |
| `CardGridSkeleton` | 卡片网格骨架 |
| `EmptyState` | 空状态占位 |
| `ErrorBoundary` | 错误边界 |
| `FilterTabs` | 筛选标签栏 |
| `ConfirmDialog` | 确认弹框 |
| `FormDialog` | 表单弹框 |
| `Toast` | 轻提示 |
| `AppUserPanel` | 用户入口面板（props + logout emit） |
| `SliderCaptcha` | 滑块验证码（须注入 fetchCaptcha） |
| `DocumentPreviewPanel` / `DocumentPreviewDrawer` | 文档预览（纯展示，无 API） |
| `PdfPreviewCard` / `ExcelPreviewCard` | PDF/Excel 预览（optional peer 增强） |
| `AssistantPicker` / `ModelPicker` | 对话智能体 / 模型选择器（props 驱动） |
| `JsonCard` / `JsonDetailDialog` / `SchemaLitePreview` | JSON / Schema 预览 |

## Composables

| Composable | 说明 |
|------------|------|
| `useMessage` | 消息提示（替代 ElMessage） |
| `useConfirm` | 确认弹框（替代 ElMessageBox.confirm） |
| `useDebounceFn` | 防抖函数 |
| `useToast` | 轻提示（编程式） |
| `useClientPagination` | 客户端列表切片分页 |
| `useDataLoading` | 数据加载状态（loading / timeout / withLoading） |
| `useClipboard` | 文本剪贴板复制 / 读取 |

## 富预览（optional peers）

默认不强制安装；未安装时 Pdf 走 iframe、Excel 走 props 表。

```bash
npm install pdfjs-dist xlsx
```

- `PdfPreviewCard`：有 `pdfjs-dist` → canvas 翻页/缩放；否则 iframe
- `ExcelPreviewCard`：传 `src`/`arrayBuffer` 且有 `xlsx` → 内置解析；否则用 `headers`/`rows` props
- `AttachmentPreviewModal` 的 PDF 路径复用 `PdfPreviewCard`

## 工具函数

| 函数 | 说明 |
|------|------|
| `resolveApiErrorMessage` | API 错误消息标准化 |
| `iconRegistry` | 120+ 图标注册表 |

## 快速使用

```vue
<script setup>
import {
  AppDialog, AppIcon, AppPagination,
  useMessage, useConfirm, useDebounceFn,
  StatusTag, EmptyState, Skeleton,
} from '@apform-ui/core'
import '@apform-ui/core/tokens.css'
import '@apform-ui/core/design-tokens.css'

const msg = useMessage()
const { confirm, confirmDelete } = useConfirm()
</script>

<template>
  <AppIcon name="setting" :size="18" />
  <StatusTag status="approved" />
  <EmptyState icon="files" title="暂无数据" />
  <AppPagination v-model:current-page="page" :total="100" />
</template>
```

## 设计令牌

```css
@import '@apform-ui/core/tokens.css';        /* 颜色/字体/间距 */
@import '@apform-ui/core/design-tokens.css';  /* 动画/z-index */
```

## 文档

https://nan1010082085.github.io/apform-ui/

## Fork 信息

| 项目 | 值 |
|------|------|
| Fork 基准 | Element Plus 2.14.2 |
| Fork 日期 | 2026-08-27 |
