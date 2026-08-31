# 快速开始

本节将介绍如何在项目中使用 @apform-ui。

## 安装

```bash
pnpm add @apform-ui/core element-plus vue
```

## 三步集成

### 1. 安装依赖

见上方命令（npm/yarn 将 `pnpm` 替换即可）。

### 2. 引入样式

```typescript
import '@apform-ui/core/design-tokens.css'
import '@apform-ui/core/tokens.css'
import '@apform-ui/core/style.css'
import '@apform-ui/core/styles/element-override.css'
import 'element-plus/dist/index.css'
```

### 3. 跑通列表页配方

从 [列表页配方](/components/list-page-recipe) 复制 `PageShell → PageHeader → FilterBar → CardTable → AppPagination` 组合。

Playground 示例：`/list-recipe`。

### 浏览器直接引入（可选）

```html
<link rel="stylesheet" href="https://unpkg.com/@apform-ui/core/dist/apform-ui.css" />
<script src="https://unpkg.com/@apform-ui/core/dist/apform-ui.umd.js"></script>
```

## 完整引入

如果你对打包后的文件大小不是很在意，使用完整导入会更方便。

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

// 样式（推荐顺序）
import '@apform-ui/core/design-tokens.css'
import '@apform-ui/core/tokens.css'
import '@apform-ui/core/style.css'
import '@apform-ui/core/styles/element-override.css'

// Element Plus peer
import 'element-plus/dist/index.css'

const app = createApp(App)
app.mount('#app')
```

## 按需导入

@apform-ui 支持 Tree Shaking，你可以只导入需要的组件。

```typescript
import { PageShell, PageHeader, AppPagination } from '@apform-ui/core'
import '@apform-ui/core/style.css'
import '@apform-ui/core/tokens.css'
import '@apform-ui/core/design-tokens.css'
```

## 使用示例

### 基础组件

```vue
<template>
  <PageShell>
    <PageHeader title="页面标题" subtitle="页面副标题">
      <template #actions>
        <el-button type="primary">新建</el-button>
      </template>
    </PageHeader>
    
    <ContentPanel title="内容区域">
      <p>页面内容</p>
    </ContentPanel>
    
    <AppPagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="total"
    />
  </PageShell>
</template>

<script setup>
import { ref } from 'vue'
import {
  PageShell,
  PageHeader,
  ContentPanel,
  AppPagination
} from '@apform-ui/core'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)
</script>
```

### 列表页面

```vue
<template>
  <PageShell fill>
    <PageHeader title="项目管理" subtitle="项目列表">
      <template #actions>
        <el-button type="primary">新建项目</el-button>
      </template>
    </PageHeader>
    
    <FilterBar @search="onSearch" @reset="onReset">
      <el-form-item label="关键词">
        <el-input v-model="keyword" placeholder="搜索项目" />
      </el-form-item>
    </FilterBar>
    
    <ContentPanel fill flush>
      <CardTable>
        <el-table :data="tableData">
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="status" label="状态" />
        </el-table>
      </CardTable>
      <AppPagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
      />
    </ContentPanel>
  </PageShell>
</template>

<script setup>
import { ref } from 'vue'
import {
  PageShell,
  PageHeader,
  FilterBar,
  ContentPanel,
  CardTable,
  AppPagination
} from '@apform-ui/core'

const keyword = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)
const tableData = ref([])

function onSearch() {
  // 搜索逻辑
}

function onReset() {
  keyword.value = ''
}
</script>
```

### 对话页面

```vue
<template>
  <div class="chat-container">
    <SessionSidebar
      :sessions="sessions"
      :active-id="activeId"
      @select="onSelect"
    />
    <div class="chat-main">
      <ConversationHeader
        :title="currentSession?.title"
        :has-messages="messages.length > 0"
      />
      <MessageList :messages="messages" />
      <Composer @send="onSend" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  SessionSidebar,
  ConversationHeader,
  MessageList,
  Composer
} from '@apform-ui/core'

const sessions = ref([])
const activeId = ref(null)
const messages = ref([])

function onSelect(id) {
  activeId.value = id
}

function onSend(content) {
  // 发送消息
}
</script>

<style scoped>
.chat-container {
  display: flex;
  height: 600px;
}

.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
```

## 主题

### 明亮主题（默认）

```css
@import '@apform-ui/core/tokens.css';
@import '@apform-ui/core/design-tokens.css';
```

### 暗色主题

```css
@import '@apform-ui/core/tokens.css';
@import '@apform-ui/core/design-tokens.css';
@import '@apform-ui/core/theme/dark.css';
```

或者通过 HTML 属性切换：

```html
<html data-theme="dark">
  <!-- 内容 -->
</html>
```

## 设计令牌

@apform-ui 提供了一套完整的设计令牌系统，包括：

- **颜色系统**：主色、成功色、警告色、危险色等
- **文本颜色**：主要文本、常规文本、次要文本等
- **背景颜色**：页面背景、卡片背景、输入框背景等
- **边框颜色**：边框颜色、边框样式等
- **阴影系统**：不同层级的阴影效果
- **间距系统**：统一的间距规范
- **圆角系统**：统一的圆角规范
- **动画系统**：统一的动画效果

使用示例：

```css
.my-component {
  color: var(--text-color-primary);
  background-color: var(--bg-color-white);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  box-shadow: var(--box-shadow-light);
  padding: var(--spacing-md);
}
```

## 组件分类

@apform-ui 组件分为以下几类：

### 基础组件
- **布局组件**：PageShell、PageHeader、ContentPanel
- **导航组件**：FilterTabs、FilterBar、SearchForm
- **反馈组件**：Toast、StatusTag、ErrorBoundary

### 数据展示
- **列表组件**：AppPagination、CardTable、TableRowActions
- **卡片组件**：CardGridSkeleton、EmptyState
- **预览组件**：JsonCard、JsonDetailDialog、SchemaLitePreview

### 数据录入
- **表单组件**：FieldRow、SectionToggle、HintText
- **输入组件**：TruncatedTooltipText、LoadingDots

### 对话组件
- **消息组件**：MessageBubble、MessageList、MessageParts
- **输入组件**：Composer、AssistantPicker、ModelPicker
- **状态组件**：RunStatusBar、ApprovalCard
- **会话组件**：SessionSidebar、ProcessingDrawer、ConversationHeader

### 反馈组件
- **对话框**：AppDialog、FormDialog、ConfirmDialog
- **提示组件**：Toast、StatusTag
- **加载组件**：Skeleton、CardGridSkeleton、LoadingDots

## 最佳实践

1. **使用设计令牌**：始终使用 CSS 变量而不是硬编码颜色值
2. **按需导入**：只导入需要的组件，减少打包体积
3. **组件组合**：使用组件组合而不是创建大型组件
4. **响应式设计**：使用 CSS 变量和媒体查询实现响应式设计
5. **无障碍性**：确保组件支持键盘导航和屏幕阅读器

## 浏览器支持

@apform-ui 支持所有现代浏览器：

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 版本信息

当前版本：`1.4.1`

基于 Element Plus `2.14.2` fork

## 更新日志

查看 [更新日志](/changelog) 了解版本更新信息。

## 贡献指南

查看 [贡献指南](/contributing) 了解如何参与贡献。

## 许可证

MIT License