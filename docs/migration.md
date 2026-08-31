# 从 Element Plus 迁移

本指南将帮助你从 Element Plus 迁移到 @apform-ui。

## 背景

@apform-ui 是基于 Element Plus 2.14.2 的 fork 版本，提供了以下改进：

1. **统一的设计令牌系统**：使用 CSS 变量实现主题切换
2. **企业级组件**：增加了许多企业级应用场景的组件
3. **对话组件**：完整的对话系统组件
4. **更好的 TypeScript 支持**：更完善的类型定义
5. **Tree Shaking 优化**：更小的打包体积

## 迁移步骤

### 1. 安装 @apform-ui

```bash
# 卸载 Element Plus
npm uninstall element-plus

# 安装 @apform-ui
npm install @apform-ui/core
```

### 2. 更新导入语句

#### 基础组件

```typescript
// 之前（Element Plus）
import { ElButton, ElInput, ElTable } from 'element-plus'

// 之后（@apform-ui）
import { AppDialog, AppPagination, FilterBar } from '@apform-ui/core'
```

#### 样式导入

```typescript
// 之前（Element Plus）
import 'element-plus/dist/index.css'

// 之后（@apform-ui）
import '@apform-ui/core/style.css'
import '@apform-ui/core/tokens.css'
import '@apform-ui/core/design-tokens.css'
```

### 3. 更新组件使用

#### 页面布局

```vue
<!-- 之前（Element Plus） -->
<template>
  <el-container>
    <el-header>页面标题</el-header>
    <el-main>页面内容</el-main>
  </el-container>
</template>

<!-- 之后（@apform-ui） -->
<template>
  <PageShell>
    <PageHeader title="页面标题" />
    <ContentPanel>
      <p>页面内容</p>
    </ContentPanel>
  </PageShell>
</template>
```

#### 分页组件

```vue
<!-- 之前（Element Plus） -->
<template>
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :total="total"
    layout="total, sizes, prev, pager, next, jumper"
  />
</template>

<!-- 之后（@apform-ui） -->
<template>
  <AppPagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :total="total"
    layout="total, sizes, prev, pager, next, jumper"
  />
</template>
```

#### 对话框

```vue
<!-- 之前（Element Plus） -->
<template>
  <el-dialog v-model="visible" title="对话框标题">
    <p>对话框内容</p>
  </el-dialog>
</template>

<!-- 之后（@apform-ui） -->
<template>
  <AppDialog v-model="visible" title="对话框标题">
    <p>对话框内容</p>
  </AppDialog>
</template>
```

### 4. 更新样式

#### 使用设计令牌

```css
/* 之前（Element Plus） */
.my-component {
  color: #303133;
  background-color: #fff;
  border: 1px solid #dcdfe6;
}

/* 之后（@apform-ui） */
.my-component {
  color: var(--text-color-primary);
  background-color: var(--bg-color-white);
  border: 1px solid var(--border-color);
}
```

#### 使用 CSS 变量

```css
/* 之前（Element Plus） */
.my-component {
  padding: 16px;
  margin-bottom: 20px;
  border-radius: 4px;
}

/* 之后（@apform-ui） */
.my-component {
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  border-radius: var(--border-radius-md);
}
```

### 5. 更新主题

#### 暗色主题

```typescript
// 之前（Element Plus）
import 'element-plus/theme-chalk/dark/css-vars.css'

// 之后（@apform-ui）
import '@apform-ui/core/theme/dark.css'
```

或者通过 HTML 属性：

```html
<!-- 之前（Element Plus） -->
<html class="dark">
  <!-- 内容 -->
</html>

<!-- 之后（@apform-ui） -->
<html data-theme="dark">
  <!-- 内容 -->
</html>
```

## 组件映射表

| Element Plus 组件 | @apform-ui 组件 | 说明 |
|-------------------|-----------------|------|
| el-container | PageShell | 页面容器 |
| el-header | PageHeader | 页面头部 |
| el-main | ContentPanel | 内容面板 |
| el-aside | SessionSidebar | 侧边栏 |
| el-pagination | AppPagination | 分页器 |
| el-dialog | AppDialog | 对话框 |
| el-button | (保持原样) | 按钮组件 |
| el-input | (保持原样) | 输入框 |
| el-table | (保持原样) | 表格 |
| el-form | (保持原样) | 表单 |
| el-select | (保持原样) | 选择器 |
| el-checkbox | (保持原样) | 复选框 |
| el-radio | (保持原样) | 单选框 |
| el-switch | (保持原样) | 开关 |
| el-slider | (保持原样) | 滑块 |
| el-time-picker | (保持原样) | 时间选择器 |
| el-date-picker | (保持原样) | 日期选择器 |
| el-upload | (保持原样) | 上传 |
| el-rate | (保持原样) | 评分 |
| el-color-picker | (保持原样) | 颜色选择器 |
| el-transfer | (保持原样) | 穿梭框 |

## 新增组件

@apform-ui 提供了许多 Element Plus 没有的组件：

### 布局组件
- **PageShell**：页面容器
- **PageHeader**：页面头部
- **ContentPanel**：内容面板
- **FilterBar**：筛选栏
- **SearchForm**：搜索表单

### 列表组件
- **CardTable**：卡片表格
- **TableRowActions**：表格行操作
- **EmptyState**：空状态
- **CardGridSkeleton**：卡片网格骨架屏

### 属性组件
- **FieldRow**：字段行
- **SectionToggle**：折叠区域
- **HintText**：提示文本
- **TruncatedTooltipText**：截断文本
- **LoadingDots**：加载动画

### 预览组件
- **JsonCard**：JSON 卡片
- **JsonDetailDialog**：JSON 详情对话框
- **SchemaLitePreview**：Schema 预览
- **DocumentPreviewPanel**：文档预览面板

### 对话组件
- **MessageBubble**：消息气泡
- **MessageList**：消息列表
- **Composer**：消息输入框
- **SessionSidebar**：会话侧栏
- **ConversationHeader**：对话头部
- **RunStatusBar**：运行状态栏
- **ApprovalCard**：审批卡片

### 反馈组件
- **Toast**：轻提示
- **StatusTag**：状态标签
- **ErrorBoundary**：错误边界
- **Skeleton**：骨架屏

## 常见问题

### Q: 为什么不直接使用 Element Plus？

A: @apform-ui 提供了以下优势：
1. 完整的设计令牌系统
2. 企业级组件库
3. 对话系统组件
4. 更好的 TypeScript 支持
5. 更小的打包体积

### Q: 如何回退到 Element Plus？

A: 如果需要回退到 Element Plus：
1. 卸载 @apform-ui
2. 安装 Element Plus
3. 更新导入语句
4. 更新组件使用

### Q: @apform-ui 是否支持 Element Plus 的所有功能？

A: @apform-ui 基于 Element Plus 2.14.2，支持 Element Plus 的所有功能，并增加了许多新组件。

### Q: 如何报告问题？

A: 请在 GitHub 上提交 issue：
- 问题描述
- 复现步骤
- 期望行为
- 实际行为
- 环境信息

## 从 platform-shared 迁移（可选 · 试点）

> **说明：** 全平台基建替换尚未开始。以下仅适用于新页面或试点模块。

`platform-shared` 已对以下组件做薄 re-export，可逐步改为直接依赖 core：

| shared 路径 | 改用 |
|-------------|------|
| `AppDialog` | `@apform-ui/core` → `AppDialog` |
| `AppPagination` | `AppPagination` |
| `FilterTabs` | `FilterTabs` |
| `FormDialog` / `ConfirmDialog` | 同名 |

`AppIcon` 仍建议经 `platform-shared`（ICON_MAP + fallback），或直接使用 core 并遵守 `iconRegistry`。

列表页推荐组合见 [列表页配方](/components/list-page-recipe)。

## 版本兼容性

| @apform-ui 版本 | Element Plus 版本 | Vue 版本 |
|-----------------|-------------------|----------|
| 1.5.0 | 2.14.2 | ^3.5.0 |
| 1.4.3 | 2.14.2 | ^3.5.0 |

## 迁移检查清单

- [ ] 安装 @apform-ui/core
- [ ] 更新导入语句
- [ ] 更新组件使用
- [ ] 更新样式变量
- [ ] 测试所有功能
- [ ] 检查暗色主题
- [ ] 验证打包体积
- [ ] 更新文档

## 技术支持

如果在迁移过程中遇到问题，请：

1. 查看本文档
2. 检查 GitHub Issues
3. 提交新的 Issue
4. 联系维护团队

## 更新日志

查看 [更新日志](/changelog) 了解版本更新信息。

## 贡献指南

查看 [贡献指南](/contributing) 了解如何参与贡献。