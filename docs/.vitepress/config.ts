import { defineConfig } from 'vitepress'
import { resolve } from 'path'

export default defineConfig({
  title: '@apform-ui',
  description: 'Apform UI 企业级 Vue 3 UI 组件库',
  base: '/apform-ui/',
  outDir: '../dist-docs',
  srcExclude: ['**/superpowers/**'],
  ignoreDeadLinks: [
    /^https?:\/\//,
  ],

  vite: {
    resolve: {
      alias: {
        '@apform-ui/core': resolve(__dirname, '../../packages/core/dist/apform-ui.js'),
      },
    },
    optimizeDeps: {
      include: ['element-plus', '@element-plus/icons-vue', '@iconify/vue'],
    },
    ssr: {
      noExternal: ['element-plus', '@element-plus/icons-vue'],
    },
  },

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: '@apform-ui',

    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/app-dialog' },
      { text: '设计令牌', link: '/tokens/' },
      {
        text: '包',
        items: [
          { text: '@apform-ui/core', link: '/packages/core' },
          { text: '@apform-ui/icons', link: '/packages/icons' },
          { text: '@apform-ui/themes', link: '/packages/themes' },
          { text: '@apform-ui/utils', link: '/packages/utils' },
          { text: '@apform-ui/plugins', link: '/packages/plugins' },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '介绍', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '包结构', link: '/guide/packages' },
            { text: 'Fork 策略', link: '/guide/fork-strategy' },
            { text: '上游合并', link: '/guide/upstream-merge' },
            { text: '部署', link: '/guide/deployment' },
            { text: '暗色主题', link: '/guide/dark-theme' },
            { text: '树摇', link: '/guide/tree-shaking' },
            { text: 'AppIcon 策略', link: '/guide/app-icon-strategy' },
          ],
        },
      ],
      '/components/': [
        {
          text: '基础',
          items: [
            { text: 'AppDialog 弹框', link: '/components/app-dialog' },
            { text: 'AppIcon 图标', link: '/components/app-icon' },
            { text: 'UserAvatar 头像', link: '/components/user-avatar' },
            { text: 'FilterTabs 筛选标签', link: '/components/filter-tabs' },
          ],
        },
        {
          text: 'Layout / List',
          items: [
            { text: 'PageShell', link: '/components/page-shell' },
            { text: 'PageHeader', link: '/components/page-header' },
            { text: 'BreadcrumbNav', link: '/components/breadcrumb-nav' },
            { text: 'ContentPanel', link: '/components/content-panel' },
            { text: 'FilterBar', link: '/components/filter-bar' },
            { text: 'CardTable', link: '/components/card-table' },
            { text: 'TableRowActions', link: '/components/table-row-actions' },
            { text: 'SearchForm', link: '/components/search-form' },
            { text: '列表页配方', link: '/components/list-page-recipe' },
          ],
        },
        {
          text: 'Property',
          items: [
            { text: 'FieldRow', link: '/components/field-row' },
            { text: 'HintText', link: '/components/hint-text' },
            { text: 'SectionToggle', link: '/components/section-toggle' },
            { text: 'TruncatedTooltipText', link: '/components/truncated-tooltip-text' },
            { text: 'LoadingDots', link: '/components/loading-dots' },
          ],
        },
        {
          text: 'Chat',
          items: [
            { text: 'MessageBubble', link: '/components/message-bubble' },
            { text: 'MessageList', link: '/components/message-list' },
            { text: 'Composer', link: '/components/composer' },
            { text: 'RunStatusBar', link: '/components/run-status-bar' },
            { text: 'ApprovalCard', link: '/components/approval-card' },
            { text: 'MessageParts', link: '/components/message-parts' },
            { text: 'MessageAttachmentList', link: '/components/message-attachment-list' },
            { text: 'DocumentSummaryList', link: '/components/document-summary-list' },
            { text: 'AttachmentPreviewModal', link: '/components/attachment-preview-modal' },
            { text: 'SessionSidebar', link: '/components/session-sidebar' },
            { text: 'ProcessingDrawer', link: '/components/processing-drawer' },
            { text: 'ConversationHeader', link: '/components/conversation-header' },
            { text: 'AssistantPicker', link: '/components/assistant-picker' },
            { text: 'ModelPicker', link: '/components/model-picker' },
            { text: '对话配方', link: '/components/chat-recipe' },
          ],
        },
        {
          text: 'Preview',
          items: [
            { text: 'JsonCard', link: '/components/json-card' },
            { text: 'JsonDetailDialog', link: '/components/json-detail-dialog' },
            { text: 'SchemaLitePreview', link: '/components/schema-lite-preview' },
            { text: 'DocumentPreview', link: '/components/document-preview' },
            { text: 'PdfPreviewCard', link: '/components/pdf-preview-card' },
            { text: 'ExcelPreviewCard', link: '/components/excel-preview-card' },
          ],
        },
        {
          text: '反馈',
          items: [
            { text: 'useMessage 消息提示', link: '/components/use-message' },
            { text: 'useConfirm 确认弹框', link: '/components/use-confirm' },
            { text: 'Toast 轻提示', link: '/components/toast' },
            { text: 'ErrorBoundary 错误边界', link: '/components/error-boundary' },
          ],
        },
        {
          text: '数据展示',
          items: [
            { text: 'StatusTag 状态标签', link: '/components/status-tag' },
            { text: 'Skeleton 骨架屏', link: '/components/skeleton' },
            { text: 'CardGridSkeleton 卡片骨架', link: '/components/card-grid-skeleton' },
            { text: 'EmptyState 空状态', link: '/components/empty-state' },
            { text: 'AppPagination 分页', link: '/components/app-pagination' },
          ],
        },
        {
          text: '弹框',
          items: [
            { text: 'FormDialog 表单弹框', link: '/components/form-dialog' },
            { text: 'ConfirmDialog 确认弹框', link: '/components/confirm-dialog' },
          ],
        },
        {
          text: '工具',
          items: [
            { text: 'useDebounceFn 防抖', link: '/components/use-debounce-fn' },
            { text: 'useClientPagination', link: '/components/use-client-pagination' },
            { text: 'useDataLoading', link: '/components/use-data-loading' },
            { text: 'useChatScroll', link: '/components/use-chat-scroll' },
            { text: 'useToast', link: '/components/use-toast' },
            { text: 'renderMarkdown', link: '/components/render-markdown' },
            { text: 'attachmentKind', link: '/components/attachment-kind' },
            { text: 'iconRegistry', link: '/components/icon-registry' },
            { text: 'pagination 常量', link: '/components/pagination-constants' },
            { text: 'resolveApiErrorMessage', link: '/components/resolve-api-error-message' },
          ],
        },
      ],
      '/tokens/': [
        {
          text: '设计令牌',
          items: [
            { text: '概览', link: '/tokens/' },
            { text: '颜色', link: '/tokens/colors' },
            { text: '字体', link: '/tokens/typography' },
            { text: '尺寸与高度', link: '/tokens/sizing' },
            { text: '间距', link: '/tokens/spacing' },
            { text: '阴影', link: '/tokens/shadows' },
            { text: '动画', link: '/tokens/animation' },
            { text: 'Z-Index', link: '/tokens/z-index' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/apform-ui' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Schema Platform',
    },

    search: {
      provider: 'local',
    },
  },
})
