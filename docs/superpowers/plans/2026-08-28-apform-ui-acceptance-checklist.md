# @apform-ui 库级验收清单

> 配套计划：`docs/superpowers/plans/2026-08-28-apform-ui-implementation.md`  
> 用法：发版前逐项勾选；未勾项必须修复或写入 CHANGELOG「已知延期」。

## 组件级 DoD（抽样或全量）

对每个公开组件确认：

- [x] A1 独立目录 + index.ts（核心公开组件）
- [x] A2 `@apform-ui/core` 可 import；d.ts 有符号
- [x] A3 Props/Emits/Slots 有类型 + JSDoc（抽检）
- [x] A4 无业务 API/Store/路由硬编码（DocumentPreview/Picker 已 props 化）
- [x] A5 样式走 token / CSS 变量
- [x] A6 playground Demo（全量 export + Composables）
- [x] A7 docs 页 — 公开 export 与 docs 1:1（utils/composables 已补）
- [x] A8 Vitest 至少 1 条（components.spec 15）
- [x] A9 可访问名 / 对话框标题（抽检）
- [x] A10 无 TODO/测试文案残留（抽检）

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
- [x] EmptyState（含 compact / actionText）
- [x] useClientPagination
- [x] useDataLoading

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
- [x] SessionSidebar / ProcessingDrawer / ConversationHeader
- [x] AssistantPicker / ModelPicker（props 驱动）

### Preview
- [x] JsonCard / JsonDetailDialog
- [x] SchemaLitePreview
- [x] DocumentPreviewPanel / DocumentPreviewDrawer（纯展示，无 AI API）

### Dialog
- [x] AppDialog / FormDialog / ConfirmDialog
- [x] 与 platform-shared 单一源 — AppDialog/AppPagination/FilterTabs/FormDialog/ConfirmDialog 薄 re-export；AppIcon 因 ICON_MAP+Iconify fallback 刻意保留在 shared

## 黄金路径

- [x] C2 ListPageRecipe：Shell→Header→FilterBar→Panel/Table→Empty→Pagination（playground `/list-recipe`）
- [x] C3 ChatRecipe：List+Bubble+Parts+Composer+附件预览+Approval/Status（playground `/chat-recipe`）

## 双轨 C4

- [x] platform-shared re-export Dialog/Pagination/FilterTabs/FormDialog/ConfirmDialog → `@apform-ui/core`
- [x] ai/flow FieldRow / HintText / SectionToggle（及 ai TruncatedTooltipText）改用 core
- [x] meeting 列表积木：PageHeader / EmptyState / MsFilterBar→FilterBar / StatusTag(statusMap) 对齐 core
- [x] Markdown：ai `TextRenderer` 调用 `@apform-ui/core` `renderMarkdown`

## 工程 C5–C7

- [x] `pnpm build` 成功（@apform-ui/core）
- [x] `pnpm --filter @apform-ui/core test` 全绿（15 tests）
- [x] `pnpm docs:build` 成功（1.2.0 波次已验；docs/tokens 已补）
- [x] README / 侧栏分组 / 两个配方页
- [x] 暗色主题抽检 — 见 [`docs/guide/dark-theme.md`](../guide/dark-theme.md)（2026-08-31）
- [x] 树摇抽检 — 见 [`docs/internal/tree-shake-baseline.md`](../internal/tree-shake-baseline.md)（2026-08-31）
- [x] 版本号 — core `1.6.1`
- [x] 无 Fg* / NodePanel / 营销 Hero 进入 core
- [x] 全局尺寸令牌 + `styles/element-override.css` + `./style.css` 导出

## 签字

| 角色 | 日期 | 结论 |
|------|------|------|
| 实现 | 2026-08-28 | ui 仓 Phase A–D **Pass** |
| 实现 | 2026-08-28 | 全局 Size/Height 设计令牌（1.3.0） |
| 实现 | 2026-08-28 | Phase E + A/B 补齐：**Pass**（core 1.4.0；shared/ai/flow/meeting 已收敛） |
| 复核 | | |
