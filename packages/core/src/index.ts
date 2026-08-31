/**
 * @apform-ui/core — Apform UI 企业级 Vue 3 UI 组件库（基于 Element Plus 2.14.2 fork）
 *
 * Fork 基准版本：Element Plus 2.14.2
 * Fork 日期：2026-08-27
 */

// ========== 类型 ==========
export * from './types'

// ========== 组件 — 通用 ==========
export { AppDialog } from './components/AppDialog'
export { AppIcon } from './components/AppIcon'
export { AppPagination } from './components/AppPagination'
export { ConfirmDialog } from './components/ConfirmDialog'
export { FormDialog } from './components/FormDialog'
export { FilterTabs } from './components/FilterTabs'
export { Toast } from './components/Toast'
export type { ToastItem } from './components/Toast'
export { EmptyState } from './components/EmptyState'
export { ErrorBoundary } from './components/ErrorBoundary'
export { StatusTag } from './components/StatusTag'
export type { StatusConfig } from './components/StatusTag'
export { Skeleton } from './components/Skeleton'
export { CardGridSkeleton } from './components/CardGridSkeleton'
export { UserAvatar } from './components/UserAvatar'

// ========== 组件 — Layout / List / Search ==========
export { PageShell } from './components/PageShell'
export { PageHeader } from './components/PageHeader'
export { ContentPanel } from './components/ContentPanel'
export { FilterBar } from './components/FilterBar'
export { CardTable } from './components/CardTable'
export { TableRowActions } from './components/TableRowActions'
export type { TableRowAction } from './components/TableRowActions'
export { SearchForm } from './components/SearchForm'
export type { SearchFieldConfig } from './components/SearchForm'

// ========== 组件 — Property ==========
export { FieldRow } from './components/FieldRow'
export { HintText } from './components/HintText'
export { SectionToggle } from './components/SectionToggle'
export { TruncatedTooltipText } from './components/TruncatedTooltipText'
export { LoadingDots } from './components/LoadingDots'

// ========== 组件 — Preview ==========
export { JsonCard } from './components/JsonCard'
export { JsonDetailDialog } from './components/JsonDetailDialog'
export { SchemaLitePreview } from './components/SchemaLitePreview'
export type { SchemaLiteField } from './components/SchemaLitePreview'
export {
  DocumentPreviewPanel,
  DocumentPreviewDrawer,
} from './components/DocumentPreview'
export type {
  DocumentPreviewChunk,
  DocumentPreviewPanelProps,
} from './components/DocumentPreview'

// ========== 组件 — 对话 ==========
export { MessageBubble } from './components/Chat/MessageBubble'
export { MessageList } from './components/Chat/MessageList'
export { Composer } from './components/Chat/Composer'
export { RunStatusBar } from './components/Chat/RunStatusBar'
export { ApprovalCard } from './components/Chat/ApprovalCard'
export {
  MessageParts,
  MessageAttachmentList,
  DocumentSummaryList,
  AttachmentPreviewModal,
} from './components/Chat/message'
export { SessionSidebar } from './components/Chat/SessionSidebar'
export { ProcessingDrawer } from './components/Chat/ProcessingDrawer'
export { ConversationHeader } from './components/Chat/ConversationHeader'
export { AssistantPicker } from './components/Chat/AssistantPicker'
export type { AssistantPickerItem } from './components/Chat/AssistantPicker'
export { ModelPicker } from './components/Chat/ModelPicker'
export type { ModelPickerItem } from './components/Chat/ModelPicker'

// ---------- Composables ----------
export { useToast, provideToast } from './composables'
export { useConfirm } from './composables'
export type { ConfirmOptions } from './composables'
export { useMessage } from './composables'
export type { MessageApi } from './composables'
export { useDebounceFn } from './composables'
export { useClientPagination } from './composables'
export { useDataLoading } from './composables'
export type { UseDataLoadingOptions, UseDataLoadingReturn } from './composables'

// ---------- Utils ----------
export { ICON_MAP, APP_ICON_NAMES, isRegisteredAppIcon } from './utils'
export type { AppIconName } from './utils'
export { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS, PAGINATION_LAYOUT } from './utils'
export type { PageSizeOption } from './utils'
export { resolveApiErrorMessage } from './utils'
export type { ApiError } from './utils'
export { renderMarkdown, splitTextAndCodeBlocks } from './utils/textParser'
export type { TextPart } from './utils/textParser'
export { isImage, isPdf, isOffice, isPreviewable, fileKind, formatSize } from './utils/attachmentKind'

// ---------- 设计令牌（JS 常量） ----------
export {
  COLORS,
  TEXT_COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  DURATION,
  Z_INDEX,
  FONT_SIZE,
  CONTROL_HEIGHT,
  LAYOUT_HEIGHT,
  ICON_SIZE,
  PAGE,
  FORM,
  AVATAR_SIZE,
} from './tokens'

// ---------- 版本信息 ----------
export const SCHEMA_UI_VERSION = '1.4.2'
export const EP_FORK_BASE = '2.14.2'
export const EP_FORK_DATE = '2026-08-27'
