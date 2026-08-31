# 公开 Export DoD 审计

> 对照 `packages/core/src/index.ts` · 更新：2026-08-31 · **Phase 1 目标：1.5.0 · 当前 1.6.1**

| Export | A6 Demo | A7 Docs | A8 Test | 备注 |
|--------|---------|---------|---------|------|
| 通用 Dialog/Feedback 13 | ✅ | ✅ | ✅ | Toast/EmptyState 已单测 |
| Layout/List/Search 8 | ✅ | ✅ | ✅ | 含 BreadcrumbNav |
| Property 5 | ✅ | ✅ | ✅ | |
| Preview 7 | ✅ | ✅ | ✅ | 含 Pdf/ExcelPreviewCard |
| Chat 15 | ✅ | ✅ | ✅ | |
| useConfirm/useMessage/useDebounceFn | ✅ | ✅ | 部分 | composables 有 Demo |
| useClientPagination | ✅ | ✅ | ✅ | |
| useDataLoading | ✅ | ✅ | ✅ | |
| useChatScroll | ✅ | ✅ | ✅ | |
| useToast | ✅ | ✅ | — | 经 Toast + UseToastDemo |
| renderMarkdown / attachmentKind | ✅ | ✅ | ✅ | |
| iconRegistry / pagination | — | ✅ | ✅ | |
| resolveApiErrorMessage | — | ✅ | ✅ | |
| tokens 常量 | — | ✅ tokens/ | — | |

**Vitest：** 48 passed

**Phase 4：** 暗色主题指南 [`docs/guide/dark-theme.md`](../guide/dark-theme.md) · 树摇基线 [`docs/internal/tree-shake-baseline.md`](./tree-shake-baseline.md)

**版本：** 1.6.1（待发 npm）
