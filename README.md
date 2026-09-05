# APForm 组件库

> 企业级 Vue 3 UI 组件库，为 Schema Platform 提供统一的设计语言

## 它是什么？

`@apform-ui` 是 Schema Platform 的 UI 组件库体系，提供：

- **核心组件** — 页面布局、列表、对话框、属性面板等
- **图标扩展** — 工作流、审批、数据等业务图标
- **主题系统** — 暗色/明亮主题切换
- **工具函数** — 防抖、深拷贝、验证等通用工具
- **插件扩展** — 国际化、埋点、权限等插件

## 包结构

| 包名 | 说明 | 状态 |
|------|------|------|
| `@apform-ui/core` | 核心组件 | ✅ |
| `@apform-ui/icons` | 图标扩展 | ✅ |
| `@apform-ui/themes` | 主题包 | ✅ |
| `@apform-ui/utils` | 工具函数 | ✅ |
| `@apform-ui/plugins` | 插件扩展 | ✅ |

组件文档入口：**playground**（Vue 3 + Vite）。对齐 Element Plus / Arco 浅色三栏文档。

```bash
pnpm docs:dev
```

**永久禁止：** Storybook、VitePress、配方页、暗色展台营销首页、文档站在线 Playground、文档站多语言切换。

## 快速开始

### 安装

```bash
npm install @apform-ui/core
```

### 导入组件

```typescript
import {
  PageShell,
  PageHeader,
  FilterBar,
  MessageParts,
  SchemaLitePreview,
  useClientPagination,
} from '@apform-ui/core'
import '@apform-ui/core/tokens.css'
import '@apform-ui/core/design-tokens.css'
import '@apform-ui/core/styles/element-override.css'
```

### 使用示例

```vue
<template>
  <PageShell>
    <PageHeader title="用户管理" />
    <FilterBar :filters="filters" />
    <ContentPanel>
      <CardTable :data="users" :columns="columns" />
    </ContentPanel>
  </PageShell>
</template>
```

## 核心组件

### PageShell

页面外壳，提供统一的页面结构。

```vue
<PageShell>
  <!-- 页面内容 -->
</PageShell>
```

### PageHeader

页面头部，显示标题和操作按钮。

```vue
<PageHeader title="用户管理">
  <template #actions>
    <el-button type="primary">新增用户</el-button>
  </template>
</PageHeader>
```

### FilterBar

筛选栏，提供筛选条件输入。

```vue
<FilterBar
  :filters="[
    { key: 'name', label: '姓名', type: 'input' },
    { key: 'status', label: '状态', type: 'select', options: statusOptions },
  ]"
  @search="handleSearch"
/>
```

### ContentPanel

内容面板，包裹主要内容区域。

```vue
<ContentPanel>
  <!-- 表格、列表等内容 -->
</ContentPanel>
```

### CardTable

卡片表格，结合卡片和表格的展示方式。

```vue
<CardTable
  :data="tableData"
  :columns="columns"
  @row-click="handleRowClick"
/>
```

### MessageParts

消息组件，用于对话和通知。

```vue
<MessageParts :message="message" />
```

### SchemaLitePreview

Schema 轻量预览组件。

```vue
<SchemaLitePreview :schema="schemaData" />
```

## 主题系统

### 切换主题

```typescript
import { useTheme } from '@apform-ui/core'

const { theme, toggleTheme } = useTheme()

// 切换暗色/明亮主题
toggleTheme()
```

### 自定义主题

通过 CSS 变量自定义主题：

```css
:root {
  --apform-primary-color: #409eff;
  --apform-bg-color: #ffffff;
  --apform-text-color: #303133;
  /* ... */
}
```

## 工具函数

### useClientPagination

客户端分页：

```typescript
import { useClientPagination } from '@apform-ui/core'

const { paginatedData, currentPage, pageSize, total } = useClientPagination(data, {
  pageSize: 10,
})
```

### 防抖

```typescript
import { debounce } from '@apform-ui/utils'

const debouncedSearch = debounce(search, 300)
```

### 深拷贝

```typescript
import { deepClone } from '@apform-ui/utils'

const cloned = deepClone(original)
```

## 文档站

```bash
pnpm docs:dev
```

打开 playground：暗色导航轨 + 展台画布。组件页含实时预览、源码、Attributes / Events / Slots。

## 开发

### 安装依赖

```bash
pnpm install
```

### 构建

```bash
pnpm build
```

### 测试

```bash
pnpm test
```

### 文档（playground）

```bash
pnpm docs:dev           # 本地文档站（playground）
pnpm docs:build         # 产出 playground/dist/
```

自主文档站（Vue 3 + Vite）：每个组件页含简述、交互示例、Props、Emits，样式栈与业务应用一致。

## Fork 信息

本组件库基于 Element Plus 2.14.2 fork 而来。

| 项目 | 值 |
|------|------|
| Fork 基准 | Element Plus 2.14.2 |
| Fork 日期 | 2026-08-27 |

> **注意**：上游 Element Plus 更新需经过评估后手动合并，禁止自动升级。

## 许可证

MIT
