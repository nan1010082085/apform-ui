/**
 * 组件文档元数据聚合出口
 * playground 通过 `@apform-ui/core/docs` 消费
 */
export type { ComponentDoc, PropDoc, EmitDoc, SlotDoc } from './types'

export { AppDialogDoc } from '../components/AppDialog/doc'
export { AppIconDoc } from '../components/AppIcon/doc'
export { AppPaginationDoc } from '../components/AppPagination/doc'
export { BreadcrumbNavDoc } from '../components/BreadcrumbNav/doc'
export { CardGridSkeletonDoc } from '../components/CardGridSkeleton/doc'
export { CardTableDoc } from '../components/CardTable/doc'
export { ApprovalCardDoc } from '../components/Chat/ApprovalCard/doc'
export { AssistantPickerDoc } from '../components/Chat/AssistantPicker/doc'
export { ComposerDoc } from '../components/Chat/Composer/doc'
export { ConversationHeaderDoc } from '../components/Chat/ConversationHeader/doc'
export { MessageBubbleDoc } from '../components/Chat/MessageBubble/doc'
export { MessageListDoc } from '../components/Chat/MessageList/doc'
export { ModelPickerDoc } from '../components/Chat/ModelPicker/doc'
export { ProcessingDrawerDoc } from '../components/Chat/ProcessingDrawer/doc'
export { RunStatusBarDoc } from '../components/Chat/RunStatusBar/doc'
export { SessionSidebarDoc } from '../components/Chat/SessionSidebar/doc'
export { AttachmentPreviewModalDoc } from '../components/Chat/message/AttachmentPreviewModal.doc'
export { DocumentSummaryListDoc } from '../components/Chat/message/DocumentSummaryList.doc'
export { MessageAttachmentListDoc } from '../components/Chat/message/MessageAttachmentList.doc'
export { MessagePartsDoc } from '../components/Chat/message/MessageParts.doc'
export { ConfirmDialogDoc } from '../components/ConfirmDialog/doc'
export { ContentPanelDoc } from '../components/ContentPanel/doc'
export { DocumentPreviewDrawerDoc } from '../components/DocumentPreview/DocumentPreviewDrawer.doc'
export { DocumentPreviewPanelDoc } from '../components/DocumentPreview/DocumentPreviewPanel.doc'
export { EmptyStateDoc } from '../components/EmptyState/doc'
export { ErrorBoundaryDoc } from '../components/ErrorBoundary/doc'
export { ExcelPreviewCardDoc } from '../components/ExcelPreviewCard/doc'
export { FieldRowDoc } from '../components/FieldRow/doc'
export { FilterBarDoc } from '../components/FilterBar/doc'
export { FilterTabsDoc } from '../components/FilterTabs/doc'
export { FormDialogDoc } from '../components/FormDialog/doc'
export { HintTextDoc } from '../components/HintText/doc'
export { JsonCardDoc } from '../components/JsonCard/doc'
export { JsonDetailDialogDoc } from '../components/JsonDetailDialog/doc'
export { LoadingDotsDoc } from '../components/LoadingDots/doc'
export { PageHeaderDoc } from '../components/PageHeader/doc'
export { PageShellDoc } from '../components/PageShell/doc'
export { PdfPreviewCardDoc } from '../components/PdfPreviewCard/doc'
export { SchemaLitePreviewDoc } from '../components/SchemaLitePreview/doc'
export { SearchFormDoc } from '../components/SearchForm/doc'
export { SectionToggleDoc } from '../components/SectionToggle/doc'
export { SkeletonDoc } from '../components/Skeleton/doc'
export { StatusTagDoc } from '../components/StatusTag/doc'
export { TableRowActionsDoc } from '../components/TableRowActions/doc'
export { ToastDoc } from '../components/Toast/doc'
export { TruncatedTooltipTextDoc } from '../components/TruncatedTooltipText/doc'
export { UserAvatarDoc } from '../components/UserAvatar/doc'

import type { ComponentDoc } from './types'
import { AppDialogDoc } from '../components/AppDialog/doc'
import { AppIconDoc } from '../components/AppIcon/doc'
import { AppPaginationDoc } from '../components/AppPagination/doc'
import { BreadcrumbNavDoc } from '../components/BreadcrumbNav/doc'
import { CardGridSkeletonDoc } from '../components/CardGridSkeleton/doc'
import { CardTableDoc } from '../components/CardTable/doc'
import { ApprovalCardDoc } from '../components/Chat/ApprovalCard/doc'
import { AssistantPickerDoc } from '../components/Chat/AssistantPicker/doc'
import { ComposerDoc } from '../components/Chat/Composer/doc'
import { ConversationHeaderDoc } from '../components/Chat/ConversationHeader/doc'
import { MessageBubbleDoc } from '../components/Chat/MessageBubble/doc'
import { MessageListDoc } from '../components/Chat/MessageList/doc'
import { ModelPickerDoc } from '../components/Chat/ModelPicker/doc'
import { ProcessingDrawerDoc } from '../components/Chat/ProcessingDrawer/doc'
import { RunStatusBarDoc } from '../components/Chat/RunStatusBar/doc'
import { SessionSidebarDoc } from '../components/Chat/SessionSidebar/doc'
import { AttachmentPreviewModalDoc } from '../components/Chat/message/AttachmentPreviewModal.doc'
import { DocumentSummaryListDoc } from '../components/Chat/message/DocumentSummaryList.doc'
import { MessageAttachmentListDoc } from '../components/Chat/message/MessageAttachmentList.doc'
import { MessagePartsDoc } from '../components/Chat/message/MessageParts.doc'
import { ConfirmDialogDoc } from '../components/ConfirmDialog/doc'
import { ContentPanelDoc } from '../components/ContentPanel/doc'
import { DocumentPreviewDrawerDoc } from '../components/DocumentPreview/DocumentPreviewDrawer.doc'
import { DocumentPreviewPanelDoc } from '../components/DocumentPreview/DocumentPreviewPanel.doc'
import { EmptyStateDoc } from '../components/EmptyState/doc'
import { ErrorBoundaryDoc } from '../components/ErrorBoundary/doc'
import { ExcelPreviewCardDoc } from '../components/ExcelPreviewCard/doc'
import { FieldRowDoc } from '../components/FieldRow/doc'
import { FilterBarDoc } from '../components/FilterBar/doc'
import { FilterTabsDoc } from '../components/FilterTabs/doc'
import { FormDialogDoc } from '../components/FormDialog/doc'
import { HintTextDoc } from '../components/HintText/doc'
import { JsonCardDoc } from '../components/JsonCard/doc'
import { JsonDetailDialogDoc } from '../components/JsonDetailDialog/doc'
import { LoadingDotsDoc } from '../components/LoadingDots/doc'
import { PageHeaderDoc } from '../components/PageHeader/doc'
import { PageShellDoc } from '../components/PageShell/doc'
import { PdfPreviewCardDoc } from '../components/PdfPreviewCard/doc'
import { SchemaLitePreviewDoc } from '../components/SchemaLitePreview/doc'
import { SearchFormDoc } from '../components/SearchForm/doc'
import { SectionToggleDoc } from '../components/SectionToggle/doc'
import { SkeletonDoc } from '../components/Skeleton/doc'
import { StatusTagDoc } from '../components/StatusTag/doc'
import { TableRowActionsDoc } from '../components/TableRowActions/doc'
import { ToastDoc } from '../components/Toast/doc'
import { TruncatedTooltipTextDoc } from '../components/TruncatedTooltipText/doc'
import { UserAvatarDoc } from '../components/UserAvatar/doc'

/** 按组件名索引的文档表 */
export const componentDocs: Record<string, ComponentDoc> = {
  AppDialog: AppDialogDoc,
  AppIcon: AppIconDoc,
  AppPagination: AppPaginationDoc,
  BreadcrumbNav: BreadcrumbNavDoc,
  CardGridSkeleton: CardGridSkeletonDoc,
  CardTable: CardTableDoc,
  ApprovalCard: ApprovalCardDoc,
  AssistantPicker: AssistantPickerDoc,
  Composer: ComposerDoc,
  ConversationHeader: ConversationHeaderDoc,
  MessageBubble: MessageBubbleDoc,
  MessageList: MessageListDoc,
  ModelPicker: ModelPickerDoc,
  ProcessingDrawer: ProcessingDrawerDoc,
  RunStatusBar: RunStatusBarDoc,
  SessionSidebar: SessionSidebarDoc,
  AttachmentPreviewModal: AttachmentPreviewModalDoc,
  DocumentSummaryList: DocumentSummaryListDoc,
  MessageAttachmentList: MessageAttachmentListDoc,
  MessageParts: MessagePartsDoc,
  ConfirmDialog: ConfirmDialogDoc,
  ContentPanel: ContentPanelDoc,
  DocumentPreviewDrawer: DocumentPreviewDrawerDoc,
  DocumentPreviewPanel: DocumentPreviewPanelDoc,
  EmptyState: EmptyStateDoc,
  ErrorBoundary: ErrorBoundaryDoc,
  ExcelPreviewCard: ExcelPreviewCardDoc,
  FieldRow: FieldRowDoc,
  FilterBar: FilterBarDoc,
  FilterTabs: FilterTabsDoc,
  FormDialog: FormDialogDoc,
  HintText: HintTextDoc,
  JsonCard: JsonCardDoc,
  JsonDetailDialog: JsonDetailDialogDoc,
  LoadingDots: LoadingDotsDoc,
  PageHeader: PageHeaderDoc,
  PageShell: PageShellDoc,
  PdfPreviewCard: PdfPreviewCardDoc,
  SchemaLitePreview: SchemaLitePreviewDoc,
  SearchForm: SearchFormDoc,
  SectionToggle: SectionToggleDoc,
  Skeleton: SkeletonDoc,
  StatusTag: StatusTagDoc,
  TableRowActions: TableRowActionsDoc,
  Toast: ToastDoc,
  TruncatedTooltipText: TruncatedTooltipTextDoc,
  UserAvatar: UserAvatarDoc,
}
