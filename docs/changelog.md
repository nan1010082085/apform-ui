# 更新日志

本文件记录 @apform-ui 的所有重要更改。

## [1.6.1] - 2026-08-31

### Phase 3
- 新增 `PdfPreviewCard`（iframe，无 pdfjs 依赖，支持 slot）
- 新增 `ExcelPreviewCard`（props 驱动表格壳，无 xlsx 依赖）

### Phase 4
- 新增 `docs/guide/dark-theme.md`（10 组件暗色抽检清单）
- 新增 `scripts/tree-shake-baseline.mjs` + `docs/internal/tree-shake-baseline.md`
- 树摇指南补充基线与复测命令

## [1.6.0] - 2026-08-31

### Phase 3 — B 级扩展
- 新增 `BreadcrumbNav`（props 驱动，无 vue-router 硬编码）

### Phase 2/4
- 修复 docs 构建：补 `@ctrl/tinycolor` 依赖
- Playground 首页组件搜索、暗色主题切换
- `getting-started.md` 三步集成

## [1.5.0] - 2026-08-31

### Phase 1 — 库完整性
- Playground 路由与公开 export 1:1（`playground/src/routes.ts` 分组侧栏）
- 新增 Composables Demo：useChatScroll、useToast、useClientPagination 等
- Vitest 扩展至 **46** 条（含 Toast / EmptyState compact）
- 新增 `docs/internal/export-dod-audit.md`、`RELEASE.md`

### Phase 2 — 文档
- 新增 docs：useDataLoading、useChatScroll、useToast、renderMarkdown、attachmentKind、iconRegistry、pagination-constants
- VitePress 侧栏补全 Chat / Preview / 工具
- `getting-started.md`、`migration.md` 更新（platform-shared 试点说明）

## [1.4.3] - 2026-08-31

### 修复
- 修复 `ApprovalCard` 未使用 props 的 TypeScript 报错
- 修复 `useChatScroll` 中 `autoScrollEnabled` 未读取的 TS6133；导出 `autoScrollEnabled` ref，`scrollToBottom(force?)` 支持受控滚动
- 同步 `SCHEMA_UI_VERSION` 与 `package.json` 版本号

### 工程
- 根目录新增 `pnpm gate` / `pnpm gate:core` 发布门禁（build:check + test + docs:build）
- Vitest 扩展至 44 条（core-feedback + composables-utils）
- Playground 路由与侧栏分组对齐全部公开 export

## [1.4.2] - 2026-08-31

### 说明
- Phase E 跨仓试点与 DocumentPreview / Picker 入库（见历史提交）

### 修复
- 修复 ConversationHeader.vue 中的类型错误
- 修复 MessageBubble.vue 中未使用的变量
- 修复 SessionSidebar.vue 中的模块导入问题
- 修复 ErrorBoundary.vue 中未使用的变量
- 修复 useConfirm.ts 中的类型不匹配
- 修复 Storybook 文件中的模块导入问题

### 新增
- 新增 useChatScroll composable
- 新增暗色主题文件 (theme/dark.css)
- 新增树摇测试文件
- 新增 Element Plus 风格文档

### 改进
- 优化组件 TypeScript 类型定义
- 完善组件样式系统
- 增强组件单元测试

## [1.4.0] - 2026-08-28

### 新增
- 新增 AttachmentPreviewModal 组件
- 新增 SessionSidebar 组件
- 新增 ProcessingDrawer 组件
- 新增 ConversationHeader 组件
- 新增 AssistantPicker 组件
- 新增 ModelPicker 组件
- 新增 MessageAttachmentList 组件
- 新增 DocumentSummaryList 组件
- 新增 useDataLoading composable
- 新增 useChatScroll composable

### 改进
- 优化 MessageParts 组件
- 优化 FilterBar 组件
- 优化 PageHeader 组件
- 优化 PageShell 组件
- 优化 ContentPanel 组件
- 优化 CardTable 组件
- 优化 TableRowActions 组件
- 优化 SearchForm 组件

## [1.3.0] - 2026-08-27

### 新增
- 新增全局尺寸令牌
- 新增高度设计令牌
- 新增样式覆盖文件 (styles/element-override.css)

### 改进
- 优化设计令牌系统
- 优化组件样式
- 增强主题切换功能

## [1.2.0] - 2026-08-26

### 新增
- 新增 JsonCard 组件
- 新增 JsonDetailDialog 组件
- 新增 SchemaLitePreview 组件
- 新增 DocumentPreviewPanel 组件
- 新增 DocumentPreviewDrawer 组件

### 改进
- 优化预览组件
- 增强文档预览功能
- 优化组件样式

## [1.1.0] - 2026-08-25

### 新增
- 新增 FieldRow 组件
- 新增 HintText 组件
- 新增 SectionToggle 组件
- 新增 TruncatedTooltipText 组件
- 新增 LoadingDots 组件

### 改进
- 优化属性组件
- 增强组件交互
- 优化组件样式

## [1.0.0] - 2026-08-24

### 新增
- 新增 AppDialog 组件
- 新增 AppIcon 组件
- 新增 AppPagination 组件
- 新增 ConfirmDialog 组件
- 新增 FormDialog 组件
- 新增 FilterTabs 组件
- 新增 Toast 组件
- 新增 EmptyState 组件
- 新增 ErrorBoundary 组件
- 新增 StatusTag 组件
- 新增 Skeleton 组件
- 新增 CardGridSkeleton 组件
- 新增 UserAvatar 组件
- 新增 PageShell 组件
- 新增 PageHeader 组件
- 新增 ContentPanel 组件
- 新增 FilterBar 组件
- 新增 CardTable 组件
- 新增 TableRowActions 组件
- 新增 SearchForm 组件

### 基础设施
- 建立 monorepo 结构
- 实现设计令牌系统
- 配置构建工具链
- 设置测试框架
- 创建文档站点

## [0.9.0] - 2026-08-23

### 新增
- 基于 Element Plus 2.14.2 fork
- 初始化项目结构
- 配置 TypeScript
- 配置 Vite
- 配置 Vitest

## [0.8.0] - 2026-08-22

### 规划
- 确定组件库架构
- 设计组件 API
- 规划文档结构
- 制定测试策略

---

## 版本说明

- **主版本号 (Major)**：不兼容的 API 更改
- **次版本号 (Minor)**：向后兼容的功能性新增
- **修订号 (Patch)**：向后兼容的问题修复

## 如何更新

### 使用 npm

```bash
npm update @apform-ui/core
```

### 使用 yarn

```bash
yarn upgrade @apform-ui/core
```

### 使用 pnpm

```bash
pnpm update @apform-ui/core
```

## 迁移指南

查看 [从 Element Plus 迁移](/migration) 了解详细的迁移步骤。

## 技术支持

如果在更新过程中遇到问题，请：

1. 查看本文档
2. 检查 GitHub Issues
3. 提交新的 Issue
4. 联系维护团队

## 贡献指南

查看 [贡献指南](/contributing) 了解如何参与贡献。

## 许可证

MIT License