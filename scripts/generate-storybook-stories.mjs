/**
 * 从 playground 路由生成 Storybook stories。
 * 展示源 = playground Demo，保证与真实使用一致。
 */
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const outDir = join(root, 'packages/core/src/stories')

/** @type {{ path: string, label: string, group: string, view: string }[]} */
const entries = [
  { path: '/list-recipe', label: 'ListPageRecipe', group: '配方', view: 'ListPageRecipeDemo.vue' },
  { path: '/chat-recipe', label: 'ChatRecipe', group: '配方', view: 'ChatRecipeDemo.vue' },
  { path: '/app-dialog', label: 'AppDialog', group: '基础', view: 'AppDialogDemo.vue' },
  { path: '/app-icon', label: 'AppIcon', group: '基础', view: 'AppIconDemo.vue' },
  { path: '/filter-tabs', label: 'FilterTabs', group: '基础', view: 'FilterTabsDemo.vue' },
  { path: '/user-avatar', label: 'UserAvatar', group: '基础', view: 'UserAvatarDemo.vue' },
  { path: '/page-shell', label: 'PageShell', group: 'Layout', view: 'PageShellDemo.vue' },
  { path: '/page-header', label: 'PageHeader', group: 'Layout', view: 'PageHeaderDemo.vue' },
  { path: '/breadcrumb-nav', label: 'BreadcrumbNav', group: 'Layout', view: 'BreadcrumbNavDemo.vue' },
  { path: '/content-panel', label: 'ContentPanel', group: 'Layout', view: 'ContentPanelDemo.vue' },
  { path: '/filter-bar', label: 'FilterBar', group: 'Layout', view: 'FilterBarDemo.vue' },
  { path: '/card-table', label: 'CardTable', group: 'Layout', view: 'CardTableDemo.vue' },
  { path: '/table-row-actions', label: 'TableRowActions', group: 'Layout', view: 'TableRowActionsDemo.vue' },
  { path: '/search-form', label: 'SearchForm', group: 'Layout', view: 'SearchFormDemo.vue' },
  { path: '/field-row', label: 'FieldRow', group: 'Property', view: 'FieldRowDemo.vue' },
  { path: '/hint-text', label: 'HintText', group: 'Property', view: 'HintTextDemo.vue' },
  { path: '/section-toggle', label: 'SectionToggle', group: 'Property', view: 'SectionToggleDemo.vue' },
  { path: '/truncated-tooltip', label: 'TruncatedTooltipText', group: 'Property', view: 'TruncatedTooltipTextDemo.vue' },
  { path: '/loading-dots', label: 'LoadingDots', group: 'Property', view: 'LoadingDotsDemo.vue' },
  { path: '/message-bubble', label: 'MessageBubble', group: 'Chat', view: 'MessageBubbleDemo.vue' },
  { path: '/message-list', label: 'MessageList', group: 'Chat', view: 'MessageListDemo.vue' },
  { path: '/composer', label: 'Composer', group: 'Chat', view: 'ComposerDemo.vue' },
  { path: '/run-status-bar', label: 'RunStatusBar', group: 'Chat', view: 'RunStatusBarDemo.vue' },
  { path: '/approval-card', label: 'ApprovalCard', group: 'Chat', view: 'ApprovalCardDemo.vue' },
  { path: '/message-parts', label: 'MessageParts', group: 'Chat', view: 'MessagePartsDemo.vue' },
  { path: '/message-attachment-list', label: 'MessageAttachmentList', group: 'Chat', view: 'MessageAttachmentListDemo.vue' },
  { path: '/document-summary-list', label: 'DocumentSummaryList', group: 'Chat', view: 'DocumentSummaryListDemo.vue' },
  { path: '/attachment-preview-modal', label: 'AttachmentPreviewModal', group: 'Chat', view: 'AttachmentPreviewModalDemo.vue' },
  { path: '/session-sidebar', label: 'SessionSidebar', group: 'Chat', view: 'SessionSidebarDemo.vue' },
  { path: '/processing-drawer', label: 'ProcessingDrawer', group: 'Chat', view: 'ProcessingDrawerDemo.vue' },
  { path: '/conversation-header', label: 'ConversationHeader', group: 'Chat', view: 'ConversationHeaderDemo.vue' },
  { path: '/assistant-picker', label: 'AssistantPicker', group: 'Chat', view: 'AssistantPickerDemo.vue' },
  { path: '/model-picker', label: 'ModelPicker', group: 'Chat', view: 'ModelPickerDemo.vue' },
  { path: '/json-card', label: 'JsonCard', group: 'Preview', view: 'JsonCardDemo.vue' },
  { path: '/json-detail-dialog', label: 'JsonDetailDialog', group: 'Preview', view: 'JsonDetailDialogDemo.vue' },
  { path: '/schema-lite-preview', label: 'SchemaLitePreview', group: 'Preview', view: 'SchemaLitePreviewDemo.vue' },
  { path: '/document-preview', label: 'DocumentPreview', group: 'Preview', view: 'DocumentPreviewDemo.vue' },
  { path: '/pdf-preview-card', label: 'PdfPreviewCard', group: 'Preview', view: 'PdfPreviewCardDemo.vue' },
  { path: '/excel-preview-card', label: 'ExcelPreviewCard', group: 'Preview', view: 'ExcelPreviewCardDemo.vue' },
  { path: '/empty-state', label: 'EmptyState', group: '反馈', view: 'EmptyStateDemo.vue' },
  { path: '/error-boundary', label: 'ErrorBoundary', group: '反馈', view: 'ErrorBoundaryDemo.vue' },
  { path: '/status-tag', label: 'StatusTag', group: '反馈', view: 'StatusTagDemo.vue' },
  { path: '/skeleton', label: 'Skeleton', group: '反馈', view: 'SkeletonDemo.vue' },
  { path: '/card-grid-skeleton', label: 'CardGridSkeleton', group: '反馈', view: 'CardGridSkeletonDemo.vue' },
  { path: '/toast', label: 'Toast', group: '反馈', view: 'ToastDemo.vue' },
  { path: '/app-pagination', label: 'AppPagination', group: '反馈', view: 'AppPaginationDemo.vue' },
  { path: '/form-dialog', label: 'FormDialog', group: '弹框', view: 'FormDialogDemo.vue' },
  { path: '/confirm-dialog', label: 'ConfirmDialog', group: '弹框', view: 'ConfirmDialogDemo.vue' },
  { path: '/use-confirm', label: 'useConfirm', group: 'Composables', view: 'ConfirmDemo.vue' },
  { path: '/use-message', label: 'useMessage', group: 'Composables', view: 'MessageDemo.vue' },
  { path: '/use-debounce-fn', label: 'useDebounceFn', group: 'Composables', view: 'DebounceDemo.vue' },
  { path: '/use-client-pagination', label: 'useClientPagination', group: 'Composables', view: 'PaginationDemo.vue' },
  { path: '/use-data-loading', label: 'useDataLoading', group: 'Composables', view: 'UseDataLoadingDemo.vue' },
  { path: '/use-chat-scroll', label: 'useChatScroll', group: 'Composables', view: 'UseChatScrollDemo.vue' },
  { path: '/use-toast', label: 'useToast', group: 'Composables', view: 'UseToastDemo.vue' },
]

/** 需要全屏画布的分组（布局/配方） */
const FULLSCREEN_GROUPS = new Set(['配方', 'Layout', 'Chat'])

function storySource(entry) {
  const fullscreen = FULLSCREEN_GROUPS.has(entry.group)
  const layout = fullscreen ? 'fullscreen' : 'padded'
  return `/**
 * ${entry.label} — 展示源：playground/${entry.view}
 * 与真实业务用法同源，禁止另写假 demo。
 */
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PlaygroundDemo from '../../../../playground/src/views/${entry.view}'

const meta = {
  title: '${entry.group}/${entry.label}',
  component: PlaygroundDemo,
  parameters: {
    layout: '${layout}',
    docs: {
      description: {
        component: '展示内容来自 playground \`${entry.view}\`，样式栈与业务应用一致。',
      },
    },
  },
} satisfies Meta<typeof PlaygroundDemo>

export default meta
type Story = StoryObj<typeof meta>

/** 真实用法预览（playground 同源） */
export const RealPreview: Story = {
  name: '真实预览',
  render: () => ({
    components: { PlaygroundDemo },
    template: '<PlaygroundDemo />',
  }),
}
`
}

// 清空旧 stories（保留目录），重新生成
if (existsSync(outDir)) {
  rmSync(outDir, { recursive: true, force: true })
}
mkdirSync(outDir, { recursive: true })

for (const entry of entries) {
  const file = join(outDir, `${entry.label}.stories.ts`)
  writeFileSync(file, storySource(entry), 'utf8')
  console.log('wrote', entry.group + '/' + entry.label)
}

console.log(`\n生成 ${entries.length} 个 stories → ${outDir}`)
