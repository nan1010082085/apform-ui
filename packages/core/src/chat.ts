/**
 * @apform-ui/core/chat — 对话轻量入口
 *
 * 不含 BpmnFlowPreviewCanvas（及 @vue-flow peer）。
 * 需要 BPMN 预览请从 `@apform-ui/core/bpmn` 引入。
 */

// ========== 类型 ==========
export type * from './types/chat'

// ========== 组件 — 对话（无 vue-flow） ==========
export { MessageBubble } from './components/Chat/MessageBubble'
export { TipBanner } from './components/Chat/TipBanner'
export { StarterPromptGrid } from './components/Chat/StarterPromptGrid'
export type { StarterPromptItem } from './components/Chat/StarterPromptGrid'
export { MessageList } from './components/Chat/MessageList'
export { Composer } from './components/Chat/Composer'
export { RunStatusBar } from './components/Chat/RunStatusBar'
export { StreamStatusBanner } from './components/Chat/StreamStatusBanner'
export { ApprovalCard } from './components/Chat/ApprovalCard'
export {
  MessageParts,
  MessageAttachmentList,
  DocumentSummaryList,
  AttachmentPreviewModal,
} from './components/Chat/message'
export { SessionSidebar } from './components/Chat/SessionSidebar'
export { SessionHistoryDrawer } from './components/Chat/SessionHistoryDrawer'
export { VirtualMessageScroller } from './components/Chat/VirtualMessageScroller'
export { ProcessingDrawer } from './components/Chat/ProcessingDrawer'
export { ConversationHeader } from './components/Chat/ConversationHeader'
export { PendingAttachmentChip } from './components/Chat/PendingAttachmentChip'
export { MentionInput } from './components/Chat/MentionInput'
export type {
  MentionTab,
  MentionResultItem,
  MentionChip,
  MentionSearchFn,
} from './components/Chat/MentionInput'
export { ThinkingBlock } from './components/Chat/ThinkingBlock'
export { EditableArtifactCard } from './components/Chat/EditableArtifactCard'
export { MessageActionBar } from './components/Chat/MessageActionBar'
export { CollapsibleStepCard } from './components/Chat/CollapsibleStepCard'
export type { StepCardTone } from './components/Chat/CollapsibleStepCard'
export { AgentTransferCard } from './components/Chat/AgentTransferCard'
export { FieldListCard } from './components/Chat/FieldListCard'
export type { FieldListItem } from './components/Chat/FieldListCard'
export { FlowNodeStripCard } from './components/Chat/FlowNodeStripCard'
export type { FlowStripNode } from './components/Chat/FlowNodeStripCard'
export { TokenUsageCard } from './components/Chat/TokenUsageCard'
export { QuestionnaireCard } from './components/Chat/QuestionnaireCard'
export type { QuestionnaireQuestion } from './components/Chat/QuestionnaireCard'
export { ChecklistProposalCard } from './components/Chat/ChecklistProposalCard'
export type {
  ChecklistProposal,
  ChecklistProposalItem,
  ChecklistItemPriority,
  ChecklistItemKind,
} from './components/Chat/ChecklistProposalCard'
export { RequirementAnalysisCard } from './components/Chat/RequirementAnalysisCard'
export type {
  RequirementAnalysis,
  RequirementConfirmQuestion,
} from './components/Chat/RequirementAnalysisCard'
export { DocumentDetailSummaryCard } from './components/Chat/DocumentDetailSummaryCard'
export type {
  DocumentDetailSummaryItem,
  DocumentDetailSummaryBody,
} from './components/Chat/DocumentDetailSummaryCard'
export { ErrorRecoveryCard } from './components/Chat/ErrorRecoveryCard'
export type { ErrorRecoveryStrategy } from './components/Chat/ErrorRecoveryCard'
export { VariableDiffCard } from './components/Chat/VariableDiffCard'
export type { VariableDiffChange } from './components/Chat/VariableDiffCard'
export { SubWorkflowStatusCard } from './components/Chat/SubWorkflowStatusCard'
export { PptPreviewCard } from './components/Chat/PptPreviewCard'
export type { PptSlide, PptMetadata } from './components/Chat/PptPreviewCard'
export { FlowPreviewShell } from './components/Chat/FlowPreviewShell'
export type { FlowPreviewShellProps } from './components/Chat/FlowPreviewShell'
export { Model3dPreviewCard } from './components/Chat/Model3dPreviewCard'
export type { Model3dPreviewCardProps } from './components/Chat/Model3dPreviewCard'
export { ImageGenerateCard } from './components/Chat/ImageGenerateCard'
export type { ImageGenerateCardProps } from './components/Chat/ImageGenerateCard'
export { SchemaFormPreview } from './components/Chat/SchemaFormPreview'
export type { SchemaFormPreviewField } from './components/Chat/SchemaFormPreview'
export { WorkflowRunTimeline } from './components/Chat/WorkflowRunTimeline'
export type { WorkflowRunStep } from './components/Chat/WorkflowRunTimeline'
export { SuggestionCard } from './components/Chat/SuggestionCard'
export type { SuggestionItem } from './components/Chat/SuggestionCard'
export { ConversationSearchBar } from './components/Chat/ConversationSearchBar'
export type {
  ConversationSearchResult,
  ConversationSearchSourceOption,
} from './components/Chat/ConversationSearchBar'
export { TaskChainBar } from './components/Chat/TaskChainBar'
export type {
  TaskChainStepItem,
  TaskChainStepStatus,
} from './components/Chat/TaskChainBar'
export { RagContextPanel } from './components/Chat/RagContextPanel'
export type { RagContextItem } from './components/Chat/RagContextPanel'
export { AssistantPicker } from './components/Chat/AssistantPicker'
export type { AssistantPickerItem } from './components/Chat/AssistantPicker'
export { ModelPicker } from './components/Chat/ModelPicker'
export type { ModelPickerItem } from './components/Chat/ModelPicker'

// ========== Composables / Utils（对话常用） ==========
export { useChatScroll } from './composables/useChatScroll'
export type { UseChatScrollOptions, UseChatScrollReturn } from './composables/useChatScroll'
export { renderMarkdown, splitTextAndCodeBlocks } from './utils/textParser'
export type { TextPart } from './utils/textParser'
export { isImage, isPdf, isOffice, isPreviewable, fileKind, formatSize } from './utils/attachmentKind'
