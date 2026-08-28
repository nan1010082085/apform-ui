# @apform-ui 库级验收清单

> 配套计划：`docs/superpowers/plans/2026-08-28-apform-ui-implementation.md`  
> 用法：发版前逐项勾选；未勾项必须修复或写入 CHANGELOG「已知延期」。

## 组件级 DoD（抽样或全量）

对每个公开组件确认：

- [ ] A1 独立目录 + index.ts
- [ ] A2 `@apform-ui/core` 可 import；d.ts 有符号
- [ ] A3 Props/Emits/Slots 有类型 + JSDoc
- [ ] A4 无业务 API/Store/路由硬编码
- [ ] A5 样式走 token / CSS 变量
- [ ] A6 playground Demo
- [ ] A7 docs 页（说明 + Demo + API 表 + 示例）
- [ ] A8 Vitest 至少 1 条
- [ ] A9 可访问名 / 对话框标题
- [ ] A10 无 TODO/测试文案残留

## 覆盖率 C1

### Layout
- [x] PageShell
- [x] PageHeader
- [x] ContentPanel
- [x] EnhancedDialog 能力（并入 AppDialog 或独立） — AppDialog 已支持 draggable

### Search
- [x] FilterBar
- [x] SearchForm + SearchFormField — SearchForm 内置字段渲染
- [x] FilterTabs（含可选 count）

### List
- [x] AppPagination
- [x] CardTable
- [x] TableRowActions
- [x] EmptyState
- [x] useClientPagination

### Property
- [x] FieldRow
- [x] HintText
- [x] SectionToggle
- [x] TruncatedTooltipText
- [x] LoadingDots

### Feedback（既有）
- [x] Toast / Skeleton / CardGridSkeleton / StatusTag / ErrorBoundary / UserAvatar

### Chat
- [x] MessageBubble / MessageList / Composer / RunStatusBar / ApprovalCard
- [x] MessageParts / MessageAttachmentList / DocumentSummaryList
- [x] AttachmentPreviewModal
- [x] SessionSidebar / ProcessingDrawer

### Preview
- [x] JsonCard / JsonDetailDialog
- [x] DocumentPreview 或 SchemaLitePreview（至少一种） — SchemaLitePreview

### Dialog
- [x] AppDialog / FormDialog / ConfirmDialog
- [ ] 与 platform-shared 单一源（或明确 deprecated） — Phase E（本 goal 范围外）

## 黄金路径

- [x] C2 ListPageRecipe：Shell→Header→FilterBar→Panel/Table→Empty→Pagination（playground `/list-recipe`）
- [x] C3 ChatRecipe：List+Bubble+Parts+Composer+附件预览+Approval/Status（playground `/chat-recipe`）

## 双轨 C4

- [ ] platform-shared re-export 或迁移文档 + 期限 — Phase E（本 goal 范围外）
- [ ] ai/flow FieldRow 三件套改用 core — Phase E
- [ ] meeting 列表积木改用 core（或跟踪 issue） — Phase E
- [ ] Markdown 单一实现（或兼容层单测） — Phase E

## 工程 C5–C7

- [x] `pnpm build` 成功（@apform-ui/core）
- [x] `pnpm --filter @apform-ui/core test` 全绿（12 tests）
- [x] `pnpm docs:build` 成功
- [x] README / 侧栏分组 / 两个配方页
- [ ] 暗色主题抽检 — 人工可选
- [ ] 树摇抽检（单组件 import） — 人工可选
- [x] 版本号 — core `1.2.0`
- [x] 无 Fg* / NodePanel / 营销 Hero 进入 core

## 签字

| 角色 | 日期 | 结论 |
|------|------|------|
| 实现 | 2026-08-28 | ui 仓 Phase A–D **Pass**（证据：build/test/docs:build/22+1 导出） |
| 复核 | | |
