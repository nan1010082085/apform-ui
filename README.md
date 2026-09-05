# @apform-ui/core

基于 Element Plus 的企业级 Vue 3 UI 组件库，为 Schema Platform 提供统一设计语言。

[![npm](https://img.shields.io/npm/v/@apform-ui/core)](https://www.npmjs.com/package/@apform-ui/core)
[![license](https://img.shields.io/npm/l/@apform-ui/core)](https://github.com/nan1010082085/apform-ui/blob/main/LICENSE)

## 安装

```bash
npm install @apform-ui/core
```

需要同时安装 peer dependencies：

```bash
npm install element-plus@2.14.2 vue@^3.5.0
```

## 快速开始

```typescript
import {
  PageShell,
  PageHeader,
  ContentPanel,
  CardTable,
  FilterBar,
} from '@apform-ui/core'

// 样式（按需引入）
import '@apform-ui/core/tokens.css'
import '@apform-ui/core/design-tokens.css'
import '@apform-ui/core/styles/element-override.css'
```

```vue
<template>
  <PageShell>
    <PageHeader title="用户管理">
      <template #actions>
        <el-button type="primary">新增</el-button>
      </template>
    </PageHeader>
    <ContentPanel>
      <FilterBar :filters="filters" @search="onSearch" />
      <CardTable :data="users" :columns="columns" />
    </ContentPanel>
  </PageShell>
</template>
```

## 组件

### 布局与导航

| 组件 | 说明 |
|------|------|
| `PageShell` | 页面外壳，统一页面结构 |
| `PageHeader` | 页头，支持标题、操作按钮、面包屑 |
| `BreadcrumbNav` | 面包屑导航 |
| `ContentPanel` | 内容面板 |
| `SectionToggle` | 折叠区域 |

### 数据展示

| 组件 | 说明 |
|------|------|
| `CardTable` | 卡片表格 |
| `CardGridSkeleton` | 卡片网格骨架屏 |
| `StatusTag` | 状态标签 |
| `JsonCard` | JSON 数据卡片 |
| `JsonDetailDialog` | JSON 详情弹窗 |
| `TableRowActions` | 表格行操作按钮 |
| `TruncatedTooltipText` | 超长文本省略 + Tooltip |
| `UserAvatar` | 用户头像 |

### 表单与输入

| 组件 | 说明 |
|------|------|
| `FilterBar` | 筛选栏 |
| `FilterTabs` | 筛选标签页 |
| `SearchForm` | 搜索表单 |
| `FieldRow` | 表单字段行 |
| `HintText` | 字段提示文本 |
| `AppPagination` | 分页器 |
| `SliderCaptcha` | 滑块验证码 |

### 反馈与弹窗

| 组件 | 说明 |
|------|------|
| `AppDialog` | 通用弹窗 |
| `FormDialog` | 表单弹窗 |
| `ConfirmDialog` | 确认弹窗 |
| `Toast` | 轻提示 |
| `ErrorBoundary` | 错误边界 |
| `EmptyState` | 空状态 |
| `LoadingDots` | 加载动画 |
| `Skeleton` | 骨架屏 |

### AI / 对话

| 组件 | 说明 |
|------|------|
| `Chat/MessageBubble` | 消息气泡 |
| `Chat/MessageList` | 消息列表 |
| `Chat/Composer` | 输入框 |
| `Chat/ConversationHeader` | 会话头部 |
| `Chat/ModelPicker` | 模型选择器 |
| `Chat/AssistantPicker` | 助手选择器 |
| `Chat/SessionSidebar` | 会话侧边栏 |
| `Chat/RunStatusBar` | 运行状态条 |
| `Chat/ProcessingDrawer` | 处理抽屉 |
| `Chat/ApprovalCard` | 审批卡片 |

### 文件预览

| 组件 | 说明 |
|------|------|
| `DocumentPreview` | 文档预览（PDF/Excel/图片） |
| `PdfPreviewCard` | PDF 预览卡（需 `pdfjs-dist`） |
| `ExcelPreviewCard` | Excel 预览卡（需 `xlsx`） |
| `SchemaLitePreview` | Schema 轻量预览 |

### 通用

| 组件 | 说明 |
|------|------|
| `AppIcon` | 图标组件 |
| `AppUserPanel` | 用户信息面板 |

## Composables

```typescript
import {
  useToast,          // 轻提示
  useConfirm,        // 确认对话框
  useMessage,        // 消息通知
  useDebounceFn,     // 防抖函数
  useClientPagination, // 客户端分页
  useDataLoading,    // 数据加载状态
  useChatScroll,     // 对话滚动
  useClipboard,      // 剪贴板操作
} from '@apform-ui/core'
```

## 主题

内置暗色 / 明亮两套主题，通过 CSS 变量自定义：

```css
:root {
  --apform-primary-color: #409eff;
  --apform-bg-color: #ffffff;
  --apform-text-color: #303133;
}
```

引入暗色主题：

```typescript
import '@apform-ui/core/theme/dark.css'
```

## 样式文件

| 路径 | 说明 |
|------|------|
| `@apform-ui/core/style.css` | 组件样式（全量） |
| `@apform-ui/core/tokens.css` | 设计 Token |
| `@apform-ui/core/design-tokens.css` | 设计系统 Token |
| `@apform-ui/core/styles/element-override.css` | Element Plus 样式覆盖 |
| `@apform-ui/core/styles/fg-theme.css` | 前台主题 |

## 许可证

[MIT](https://github.com/nan1010082085/apform-ui/blob/main/LICENSE)
