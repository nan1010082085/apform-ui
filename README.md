# @apform-ui/core

企业级 Vue 3 UI 组件库：**Element Plus 为底座 peer，包装在本库消费栈下；`el-*` 算本库可用能力，外观以本库 Design Tokens 为准。**

[![npm](https://img.shields.io/npm/v/@apform-ui/core)](https://www.npmjs.com/package/@apform-ui/core)
[![license](https://img.shields.io/npm/l/@apform-ui/core)](https://github.com/nan1010082085/apform-ui/blob/main/LICENSE)

当前版本：**1.18.1**（多入口 `core` / `chat` / `bpmn`）。交互文档站为仓库内 **playground**（`pnpm docs:dev`）。

### 定位

| 要点 | 说明 |
|------|------|
| 底座 | `element-plus@2.14.2`（peer，钉死） |
| 能力面 | 本库 export 的积木 **+** 接好 token 后的 `el-tree` / `el-table` / `el-button` 等原语 |
| 视觉 | `tokens.css` + `design-tokens.css` + `styles/element-override.css`，禁止以 EP 默认皮肤当设计源 |
| 文档 | [架构定位](./docs/guide/architecture.md) · [快速开始](./docs/guide/getting-started.md) |

## 安装

```bash
npm install @apform-ui/core
```

需要同时安装 peer dependencies：

```bash
npm install element-plus@2.14.2 vue@^3.5.0
```

可选 peer（按需）：

```bash
npm install echarts              # MetricChart
npm install pdfjs-dist           # PdfPreviewCard 富预览
npm install xlsx                 # ExcelPreviewCard 富预览
npm install vue-virtual-scroller # VirtualMessageScroller
npm install @vue-flow/core @vue-flow/background @vue-flow/controls  # 仅 @apform-ui/core/bpmn
```

## 入口

| 入口 | 用途 | vue-flow | 推荐样式 |
|------|------|----------|----------|
| `@apform-ui/core` | 通用组件（布局 / 表格 / 监控等） | 否 | `style.css` |
| `@apform-ui/core/chat` | 对话组件轻量入口（不含 BPMN / vue-flow） | 否 | `chat.css` 或 `style.css` |
| `@apform-ui/core/bpmn` | `BpmnFlowPreviewCanvas` | 是（peer） | `bpmn.css`（另需 vue-flow 自带 CSS） |

```typescript
import { MessageBubble, Composer } from '@apform-ui/core/chat'
import { BpmnFlowPreviewCanvas } from '@apform-ui/core/bpmn'
```

更多说明见仓库 `docs/guide/architecture.md`、`docs/guide/getting-started.md` 与 `docs/guide/migration.md`。

## 快速开始

```typescript
import {
  PageShell,
  PageHeader,
  ContentPanel,
  CardTable,
  FilterBar,
} from '@apform-ui/core'

// 必须含 tokens + element-override，此后 el-* 跟本库视觉
import '@apform-ui/core/tokens.css'
import '@apform-ui/core/design-tokens.css'
import '@apform-ui/core/style.css'
import '@apform-ui/core/styles/element-override.css'
```

对话场景（避免把 vue-flow 打进包）：

```typescript
import { MessageBubble, Composer, MessageList } from '@apform-ui/core/chat'
import '@apform-ui/core/tokens.css'
import '@apform-ui/core/chat.css'
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

### AI / 对话（`@apform-ui/core/chat`）

| 组件 | 说明 |
|------|------|
| `Chat/MessageBubble` | 消息气泡 |
| `Chat/MessageList` | 消息列表 |
| `Chat/Composer` | 输入框 |
| `Chat/ConversationHeader` | 会话头部 |
| `Chat/ModelPicker` | 模型选择器 |
| `Chat/AssistantPicker` | 助手选择器 |
| `Chat/SessionSidebar` | 会话侧边栏 |
| `Chat/ConversationSearchBar` | 对话搜索栏 |
| `Chat/RunStatusBar` | 运行状态条 |
| `Chat/ProcessingDrawer` | 处理抽屉 |
| `Chat/ApprovalCard` | 审批卡片 |

### BPMN（`@apform-ui/core/bpmn`）

| 组件 | 说明 |
|------|------|
| `BpmnFlowPreviewCanvas` | BPMN 流程预览画布（需 `@vue-flow/*` peer） |

### 文件预览

| 组件 | 说明 |
|------|------|
| `DocumentPreview` | 文档预览（PDF/Excel/图片） |
| `PdfPreviewCard` | PDF 预览卡（需 `pdfjs-dist`） |
| `ExcelPreviewCard` | Excel 预览卡（需 `xlsx`） |
| `SchemaLitePreview` | Schema 轻量预览 |
| `ImagePreviewCard` | 图片缩略 + lightbox |
| `VideoPreviewCard` | 视频播放预览 |
| `TextPreviewCard` | 文本预览（可复制） |
| `FileChip` | 文件 chip |
| `ArtifactGallery` | 统一产物画廊（图/视频/JSON/文本/文件） |
| `NodeArtifactStrip` | 流程图节点紧凑产物条 |
| `HitlArtifactPanel` | HITL/详情产物面板 |

### 监控

| 组件 | 说明 |
|------|------|
| `TimeRangePicker` | 全局时间范围（快捷预设 + 自定义） |
| `MetricChart` | 指标图表（需 `echarts`，full/spark） |
| `StatCard` | 统计卡片（色条 / 环比 / sparkline） |
| `SeverityBadge` | 告警严重级别徽章 |
| `ServiceGrid` | 服务健康矩阵 |
| `StatusTimeline` | 状态时间线色块条 |
| `LogStream` | 日志虚拟滚动 + 侧栏 payload |
| `ThresholdSlider` | 告警阈值滑块 |

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
  useRealtime,       // 监控 WebSocket 实时推送
} from '@apform-ui/core'
```

## 主题与令牌

规范名使用 `--apf-*`；`--color-*` / `--text-color-*` 等为兼容别名（对齐平台基建）。Chat 语义别名使用 `--c-*`（默认跟随 `--apf-*` / `--color-*`）。

```css
:root {
  --apf-color-primary: #0060A2;
  --apf-bg-page: #F5F6FA;
  --apf-text-primary: #333333;
  /* 兼容：--color-primary → var(--apf-color-primary) */
}
```

图表色板（ECharts 无法读 CSS 变量）从 JS 常量读取：

```typescript
import { CHART_COLORS, COLORS } from '@apform-ui/core'
```

引入暗色主题：

```typescript
import '@apform-ui/core/theme/dark.css'
```

监控规格详见仓库 `docs/guide/monitoring-components.md`。

## 样式文件

| 路径 | 说明 |
|------|------|
| `@apform-ui/core/style.css` | 主入口组件样式（全量） |
| `@apform-ui/core/chat.css` | `/chat` 入口配套样式（无 vue-flow） |
| `@apform-ui/core/bpmn.css` | `/bpmn` 入口配套样式（需另引 vue-flow CSS） |
| `@apform-ui/core/tokens.css` | 设计 Token |
| `@apform-ui/core/design-tokens.css` | 设计系统 Token |
| `@apform-ui/core/styles/element-override.css` | Element Plus 样式覆盖 |
| `@apform-ui/core/styles/fg-theme.css` | 前台主题 |

## 许可证

[MIT](https://github.com/nan1010082085/apform-ui/blob/main/LICENSE)
