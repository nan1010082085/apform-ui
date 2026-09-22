/**
 * @apform-ui/core — Apform UI 企业级 Vue 3 UI 组件库
 *
 * Element Plus 2.14.2 为底座 peer，包装在本库消费栈下：
 * el-* 原语算本库可用能力；视觉以 tokens + element-override 为准。
 * Fork 基准：Element Plus 2.14.2（2026-08-27）
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
export { AppUserPanel } from './components/AppUserPanel'
export type { AppUserPanelUser } from './components/AppUserPanel'
export { SliderCaptcha } from './components/SliderCaptcha'
export type { CaptchaPayload, SliderCaptchaValue } from './components/SliderCaptcha'

// ========== 组件 — 监控 ==========
export { TimeRangePicker } from './components/TimeRangePicker'
export type { TimeRange, TimeRangePreset } from './components/TimeRangePicker'
export { MetricChart } from './components/MetricChart'
export type { MetricSeries, MetricThreshold, MetricUnit } from './components/MetricChart'
export { ChartOptionPreview } from './components/ChartOptionPreview'
export { BusinessResultTables } from './components/BusinessResultTables'
export { KeyValuePreview } from './components/KeyValuePreview'
export { CodePreviewBlock } from './components/CodePreviewBlock'
export { HitlResultPreview } from './components/HitlResultPreview'
export { CharacterViewsPreview } from './components/CharacterViewsPreview'
export { NodeResultPreview } from './components/NodeResultPreview'
export { StatCard } from './components/StatCard'
export type { StatTrend } from './components/StatCard'
export { SeverityBadge } from './components/SeverityBadge'
export type { AlertSeverity } from './components/SeverityBadge'
export { ServiceGrid } from './components/ServiceGrid'
export type { ServiceItem } from './components/ServiceGrid'
export { StatusTimeline } from './components/StatusTimeline'
export type { TimelineSegment } from './components/StatusTimeline'
export { LogStream } from './components/LogStream'
export type { LogEntry } from './components/LogStream'
export { ThresholdSlider } from './components/ThresholdSlider'
export type { ThresholdType } from './components/ThresholdSlider'

// ========== 组件 — Layout / List / Search ==========
export { PageShell } from './components/PageShell'
export { PageHeader } from './components/PageHeader'
export { BreadcrumbNav } from './components/BreadcrumbNav'
export type { BreadcrumbNavItem } from './components/BreadcrumbNav'
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
export { PropertyField } from './components/PropertyField'
export { PropertyPanel } from './components/PropertyPanel'
export type {
  BuiltinPropertyFieldType,
  FetchRemoteOptionsFn,
  PropertyArrayEditorMode,
  PropertyFieldType,
  PropertyItem,
  PropertySection,
  PropertySelectOption,
  PropertyUpdatePayload,
} from './components/PropertyPanel'
export {
  PROPERTY_CONTROL_SIZE,
  PROPERTY_FETCH_REMOTE_KEY,
  evalVisibleOn,
  filterVisiblePropertyItems,
  filterVisiblePropertySections,
} from './components/PropertyPanel'

// ========== 组件 — Preview ==========
export { JsonCard } from './components/JsonCard'
export { JsonDetailDialog } from './components/JsonDetailDialog'
export { ScriptTablePreview } from './components/ScriptTablePreview'
export { StoryboardTablePreview } from './components/StoryboardTablePreview'
export { StructuredJsonPreview } from './components/StructuredJsonPreview'
export { SchemaLitePreview } from './components/SchemaLitePreview'
export type { SchemaLiteField } from './components/SchemaLitePreview'
export {
  DocumentPreviewPanel,
  DocumentPreviewDrawer,
} from './components/DocumentPreview'
export { PdfPreviewCard } from './components/PdfPreviewCard'
export { ExcelPreviewCard } from './components/ExcelPreviewCard'
export type {
  DocumentPreviewChunk,
  DocumentPreviewPanelProps,
} from './components/DocumentPreview'
export { ImagePreviewCard } from './components/ImagePreviewCard'
export { VideoPreviewCard } from './components/VideoPreviewCard'
export { TextPreviewCard } from './components/TextPreviewCard'
export { FileChip } from './components/FileChip'
export { ArtifactGallery } from './components/ArtifactGallery'
export { NodeArtifactStrip } from './components/NodeArtifactStrip'
export { HitlArtifactPanel } from './components/HitlArtifactPanel'
export { ExecutionArtifactPanel } from './components/ExecutionArtifactPanel'

// ========== 组件 — 对话（轻量清单见 ./chat；BPMN 见 ./bpmn，不进主入口） ==========
export {
  MessageBubble,
  TipBanner,
  StarterPromptGrid,
  MessageList,
  Composer,
  PromptOptimizeButton,
  RunStatusBar,
  StreamStatusBanner,
  ApprovalCard,
  MessageParts,
  MessageAttachmentList,
  DocumentSummaryList,
  AttachmentPreviewModal,
  SessionSidebar,
  SessionHistoryDrawer,
  VirtualMessageScroller,
  ProcessingDrawer,
  ConversationHeader,
  PendingAttachmentChip,
  MentionInput,
  ThinkingBlock,
  EditableArtifactCard,
  MessageActionBar,
  CollapsibleStepCard,
  AgentTransferCard,
  FieldListCard,
  FlowNodeStripCard,
  TokenUsageCard,
  QuestionnaireCard,
  ChecklistProposalCard,
  RequirementAnalysisCard,
  DocumentDetailSummaryCard,
  ErrorRecoveryCard,
  VariableDiffCard,
  SubWorkflowStatusCard,
  PptPreviewCard,
  FlowPreviewShell,
  Model3dPreviewCard,
  ImageGenerateCard,
  GeneratingPlaceholder,
  SchemaFormPreview,
  WorkflowRunTimeline,
  SuggestionCard,
  ConversationSearchBar,
  TaskChainBar,
  RagContextPanel,
  AssistantPicker,
  ModelPicker,
  useChatScroll,
  renderMarkdown,
  splitTextAndCodeBlocks,
  isImage,
  isPdf,
  isOffice,
  isPreviewable,
  fileKind,
  formatSize,
} from './chat'
export type {
  StarterPromptItem,
  MentionTab,
  MentionResultItem,
  MentionChip,
  MentionSearchFn,
  StepCardTone,
  FieldListItem,
  FlowStripNode,
  QuestionnaireQuestion,
  ChecklistProposal,
  ChecklistProposalItem,
  ChecklistItemPriority,
  ChecklistItemKind,
  RequirementAnalysis,
  RequirementConfirmQuestion,
  DocumentDetailSummaryItem,
  DocumentDetailSummaryBody,
  ErrorRecoveryStrategy,
  VariableDiffChange,
  PptSlide,
  PptMetadata,
  FlowPreviewShellProps,
  Model3dPreviewCardProps,
  ImageGenerateCardProps,
  GeneratingPlaceholderProps,
  GeneratingPlaceholderVariant,
  SchemaFormPreviewField,
  WorkflowRunStep,
  SuggestionItem,
  ConversationSearchResult,
  ConversationSearchSourceOption,
  TaskChainStepItem,
  TaskChainStepStatus,
  RagContextItem,
  AssistantPickerItem,
  ModelPickerItem,
  PromptOptimizeConfig,
  PromptOptimizeSlotProps,
  ControlShape,
  UseChatScrollOptions,
  UseChatScrollReturn,
  TextPart,
} from './chat'
// BPMN 预览（vue-flow）见 `@apform-ui/core/bpmn`，不进入主入口。

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
export { useClipboard } from './composables'
export type { UseClipboardOptions } from './composables'
export { useRealtime } from './composables'
export type {
  RealtimeEventType,
  RealtimeMessage,
  UseRealtimeOptions,
  UseRealtimeReturn,
} from './composables'

// ---------- Utils ----------
export { ICON_MAP, APP_ICON_NAMES, isRegisteredAppIcon } from './utils'
export type { AppIconName } from './utils'
export { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS, PAGINATION_LAYOUT } from './utils'
export type { PageSizeOption } from './utils'
export { resolveApiErrorMessage } from './utils'
export type { ApiError } from './utils'
export {
  extractDocumentId,
  detectArtifactKind,
  normalizeNodeOutput,
  normalizeAttachments,
  tryParseJsonText,
} from './utils/normalizeArtifact'
export {
  detectStructuredJsonKind,
  extractEmbeddedJson,
  findEmbeddedJsonSpan,
  parseStructuredJsonContent,
  structuredJsonLabel,
} from './utils/structuredJson'
export type { StructuredJsonKind } from './utils/structuredJson'
export {
  extractBusinessResultTables,
  extractChartOption,
} from './utils/businessResultTables'
export type {
  BusinessResultTable,
  ChartOptionExtract,
} from './utils/businessResultTables'
export { resolveResultBlocks } from './utils/resolveResultBlocks'
export type {
  ResultKind,
  ResultBlock,
  ResultBlockEntry,
  ResultHitlItem,
  CharacterViewGroup,
  ResultAudience,
  ResolveResultOptions,
} from './utils/resolveResultBlocks'

// ---------- 设计令牌（JS 常量） ----------
export {
  COLORS,
  CHART_COLORS,
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

export { SCHEMA_UI_VERSION, EP_FORK_BASE, EP_FORK_DATE } from './version'