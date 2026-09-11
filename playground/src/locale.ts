/**
 * 文档站文案 — 侧栏分组与总览页中英文对照
 */

/** 文档界面语言 */
export type DocsLocale = 'zh' | 'en'

/** 侧栏 / 总览分组稳定 key（路由 `group` 字段） */
export type NavGroupKey =
  | 'guide'
  | 'basic'
  | 'data'
  | 'dialog'
  | 'layout'
  | 'property'
  | 'chat'
  | 'preview'
  | 'feedback'
  | 'monitoring'
  | 'composables'

/** 单个分组的展示文案 */
export interface GroupCopy {
  /** 侧栏与总览标题 */
  label: string
  /** 总览页分组简介 */
  desc: string
}

/** 某一语言下的全部文案 */
export interface DocsMessages {
  overviewNav: string
  searchPlaceholder: string
  themeLight: string
  themeDark: string
  langSwitch: string
  overview: {
    title: string
    lead: string
    entriesLabel: string
    browse: string
    componentsUnit: string
    packages: Array<{ name: string; note: string }>
  }
  groups: Record<NavGroupKey, GroupCopy>
}

const zh: DocsMessages = {
  overviewNav: '组件总览',
  searchPlaceholder: '搜索组件…',
  themeLight: '切换浅色',
  themeDark: '切换暗色',
  langSwitch: 'EN',
  overview: {
    title: '组件总览',
    lead: '文档对齐 Element Plus / Arco：实时预览、源码、Attributes / Events / Slots。',
    entriesLabel: '安装入口',
    browse: '按分类浏览',
    componentsUnit: '个组件与 Composable',
    packages: [
      { name: '@apform-ui/core', note: '通用' },
      { name: '@apform-ui/core/chat', note: '对话，无 vue-flow' },
      { name: '@apform-ui/core/bpmn', note: 'BPMN，需 vue-flow peer' },
    ],
  },
  groups: {
    guide: { label: '指南', desc: '快速开始与文档导航' },
    basic: { label: '基础', desc: '图标、筛选、分页等通用基础件' },
    data: { label: '数据展示', desc: '列表与分页等数据呈现' },
    dialog: { label: '弹框', desc: '确认、表单等对话框模式' },
    layout: { label: '布局', desc: '页面壳层、面板与筛选条' },
    property: { label: '属性面板', desc: '属性编辑与字段行组件' },
    chat: { label: '对话', desc: '消息、输入与 Agent 卡片' },
    preview: { label: '预览', desc: '文档、JSON、产物预览' },
    feedback: { label: '反馈', desc: '空态、骨架、Toast 与用户态' },
    monitoring: { label: '监控', desc: '指标、日志与服务状态' },
    composables: { label: '组合式 API', desc: '确认、分页、实时等逻辑复用' },
  },
}

const en: DocsMessages = {
  overviewNav: 'Overview',
  searchPlaceholder: 'Search components…',
  themeLight: 'Light mode',
  themeDark: 'Dark mode',
  langSwitch: '中文',
  overview: {
    title: 'Overview',
    lead: 'Docs aligned with Element Plus / Arco: live demos, source, Attributes / Events / Slots.',
    entriesLabel: 'Entry points',
    browse: 'Browse by category',
    componentsUnit: 'components & composables',
    packages: [
      { name: '@apform-ui/core', note: 'General' },
      { name: '@apform-ui/core/chat', note: 'Chat, no vue-flow' },
      { name: '@apform-ui/core/bpmn', note: 'BPMN, vue-flow peer' },
    ],
  },
  groups: {
    guide: { label: 'Guide', desc: 'Getting started and navigation' },
    basic: { label: 'Basic', desc: 'Icons, filters, pagination primitives' },
    data: { label: 'Data Display', desc: 'Lists and pagination surfaces' },
    dialog: { label: 'Dialog', desc: 'Confirm and form dialog patterns' },
    layout: { label: 'Layout', desc: 'Page shells, panels, and filter bars' },
    property: { label: 'Property', desc: 'Property editors and field rows' },
    chat: { label: 'Chat', desc: 'Messages, composer, and agent cards' },
    preview: { label: 'Preview', desc: 'Documents, JSON, and artifacts' },
    feedback: { label: 'Feedback', desc: 'Empty states, skeletons, toast' },
    monitoring: { label: 'Monitoring', desc: 'Metrics, logs, and service status' },
    composables: { label: 'Composables', desc: 'Confirm, pagination, realtime helpers' },
  },
}

/** 语言 → 文案 */
export const docsMessages: Record<DocsLocale, DocsMessages> = { zh, en }
