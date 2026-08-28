# @apform-ui 组件库规划

> **实施计划（含完整验收标准）：** [`docs/superpowers/plans/2026-08-28-apform-ui-implementation.md`](docs/superpowers/plans/2026-08-28-apform-ui-implementation.md)  
> **验收勾选清单：** [`docs/superpowers/plans/2026-08-28-apform-ui-acceptance-checklist.md`](docs/superpowers/plans/2026-08-28-apform-ui-acceptance-checklist.md)  
> **全量盘点真相源：** [`COMPONENT_LIBRARY_INVENTORY.md`](COMPONENT_LIBRARY_INVENTORY.md)

## 一、组件清单（按优先级排序）

### 第一批：基础 UI 组件（从项目中提取，无业务耦合）

| 组件 | 来源 | 说明 | 状态 |
|------|------|------|------|
| AppDialog | shared | 通用弹框（全屏、拖拽） | ✅ 已有 |
| AppIcon | shared | 统一图标（Iconify） | ✅ 已有 |
| AppPagination | shared | 统一分页器 | ✅ 已有 |
| EmptyState | editor | 空状态占位 | ✅ 已有 |
| ErrorBoundary | editor | 错误边界 | ✅ 已有 |
| FilterTabs | shared | 筛选标签栏 | ✅ 已有 |
| StatusTag | 新建 | 状态标签（15种预设） | ✅ 已有 |
| Skeleton | 新建 | 骨架屏 | ✅ 已有 |
| CardGridSkeleton | 新建 | 卡片网格骨架 | ✅ 已有 |
| UserAvatar | 新建 | 用户头像 | ✅ 已有 |
| Toast | portal | 轻提示 | ✅ 已有 |
| ConfirmDialog | shared | 确认弹框 | ✅ 已有 |
| FormDialog | shared | 表单弹框 | ✅ 已有 |
| PageHeader | ai/app | 页面标题栏 | ✅ 已有 |
| PageShell | ai/app | 页面容器 | ✅ 已有 |
| CardTable | ai/app | 卡片表格容器 | ✅ 已有 |
| TableRowActions | ai/app | 表格操作列折叠 | ✅ 已有 |
| ContentPanel | meeting | 内容面板 | ✅ 已有 |
| FilterBar | meeting | 列表筛选条 | ✅ 已有 |
| SearchForm | editor | 可折叠搜索表单 | ✅ 已有 |
| PropertySection | editor | 可折叠面板段 | 📋 待提取（用 SectionToggle） |
| FieldRow | flow/ai | 字段行布局 | ✅ 已有 |
| SectionToggle | flow/ai | 可折叠段 | ✅ 已有 |
| HintText | flow/ai | 提示文本 popover | ✅ 已有 |
| AiLoadingDots | ai | 加载动画三点 | ✅ LoadingDots |
| TruncatedTooltipText | ai | 截断文本+tooltip | ✅ 已有 |

### 第二批：对话组件（从 workflow-agent-chat 提取）

| 组件 | 来源 | 说明 | 状态 |
|------|------|------|------|
| MessageBubble | workflow-agent-chat | 消息气泡 | ✅ 已有 |
| MessageList | workflow-agent-chat | 消息列表 | ✅ 已有 |
| Composer | workflow-agent-chat | 消息输入 | ✅ 已有 |
| RunStatusBar | workflow-agent-chat | 运行状态栏 | ✅ 已有 |
| ApprovalCard | workflow-agent-chat | 审批确认卡 | ✅ 已有 |
| MessageParts | workflow-agent-chat | 消息段渲染 | ✅ 已有 |
| MessageAttachmentList | workflow-agent-chat | 附件列表 | ✅ 已有 |
| DocumentSummaryList | workflow-agent-chat | 文档摘要列表 | ✅ 已有 |
| AttachmentPreviewModal | workflow-agent-chat | 附件预览 | ✅ 已有 |
| SessionSidebar | workflow-agent-chat | 会话侧栏 | ✅ 已有 |
| ProcessingDrawer | workflow-agent-chat | 处理抽屉 | ✅ 已有 |
| ConversationHeader | workflow-agent-chat | 对话顶栏 | ✅ 已有 |

### 第三批：展示组件（从 ai/app 提取）

| 组件 | 来源 | 说明 | 状态 |
|------|------|------|------|
| FlowCard | ai/app | 流程节点卡片 | 📋 待提取 |
| JsonCard | ai/app | JSON 信息卡片 | ✅ 已有 |
| JsonDetailDialog | ai/app | JSON 详情弹框 | ✅ 已有 |
| SchemaLitePreview | flow/ai | 轻量 Schema 预览 | ✅ 已有 |
| SchemaCard | ai/app | Schema 字段卡片 | 📋 待提取 |
| SchemaDiffPanel | ai/app | Schema 差异面板 | 📋 待提取 |
| DocumentSummaryCard | ai/app | 文档摘要卡片 | 📋 待提取 |
| SmartSuggestionCard | ai/app | 智能建议卡片 | 📋 待提取 |
| TaskChainBar | ai/app | 任务链进度条 | 📋 待提取 |
| ProjectCard | portal | 项目卡片 | 📋 待提取（营销，可不进） |
| CategoryFilter | portal | 分类筛选器 | ✅ FilterTabs count |
| Hero | portal | 页面 Hero 区 | 📋 不进库 |

### 第四批：编辑器组件（从 editor 提取）

| 组件 | 来源 | 说明 | 状态 |
|------|------|------|------|
| BackgroundEditor | editor | 背景编辑器 | 📋 待提取 |
| BorderEditor | editor | 边框编辑器 | 📋 待提取 |
| BorderRadiusEditor | editor | 圆角编辑器 | 📋 待提取 |
| SpacingEditor | editor | 间距编辑器 | 📋 待提取 |
| ShadowEditor | editor | 阴影编辑器 | 📋 待提取 |
| OptionsEditor | editor | 选项列表编辑器 | 📋 待提取 |
| NumberArrayEditor | editor | 数字数组编辑器 | 📋 待提取 |
| GenericArrayEditor | editor | 通用数组编辑器 | 📋 待提取 |
| RulesEditor | editor | 验证规则编辑器 | 📋 待提取 |

## 二、Composables

| Composable | 说明 | 状态 |
|------------|------|------|
| useMessage | 消息提示（替代 ElMessage） | ✅ 已有 |
| useConfirm | 确认弹框（替代 ElMessageBox.confirm） | ✅ 已有 |
| useDebounceFn | 防抖函数 | ✅ 已有 |
| useClientPagination | 客户端分页 | ✅ 已有 |
| useToast | 轻提示（编程式） | ✅ 已有 |

## 三、Utils

| 工具 | 说明 | 状态 |
|------|------|------|
| iconRegistry | 图标注册表 | ✅ 已有 |
| pagination | 分页常量 | ✅ 已有 |
| resolveApiErrorMessage | API 错误消息标准化 | ✅ 已有 |
| textParser | Markdown + 代码块分割 | ✅ 已有 |
| attachmentKind | 附件类型判断 | ✅ 已有 |

## 四、文档设计

### 文档站结构

```
首页
├── 组件总览（分类展示所有组件）
├── 搜索（按名称搜索组件）
└── 快速开始

基础组件
├── AppDialog 弹框
├── AppIcon 图标
├── AppPagination 分页
├── EmptyState 空状态
├── ErrorBoundary 错误边界
├── FilterTabs 筛选标签
├── StatusTag 状态标签
├── Skeleton 骨架屏
├── CardGridSkeleton 卡片骨架
├── UserAvatar 头像
├── Toast 轻提示
├── ConfirmDialog 确认弹框
├── FormDialog 表单弹框
├── PageHeader 页面标题
├── PageShell 页面容器
├── CardTable 卡片表格
├── TableRowActions 表格操作
├── PropertySection 可折叠段
├── FieldRow 字段行
├── SectionToggle 可折叠段
├── HintText 提示文本
├── AiLoadingDots 加载动画
└── TruncatedTooltipText 截断文本

对话组件
├── MessageBubble 消息气泡
├── MessageList 消息列表
├── Composer 消息输入
├── RunStatusBar 运行状态
├── ApprovalCard 审批确认
├── MessageParts 消息段
├── MessageAttachmentList 附件列表
└── DocumentSummaryList 文档摘要

展示组件
├── FlowCard 流程卡片
├── JsonCard JSON 卡片
├── SchemaCard Schema 卡片
├── SchemaDiffPanel 差异面板
├── DocumentSummaryCard 文档摘要
├── SmartSuggestionCard 智能建议
├── TaskChainBar 任务链
├── ProjectCard 项目卡片
├── CategoryFilter 分类筛选
└── Hero 页面 Hero

编辑器组件
├── BackgroundEditor 背景编辑
├── BorderEditor 边框编辑
├── BorderRadiusEditor 圆角编辑
├── SpacingEditor 间距编辑
├── ShadowEditor 阴影编辑
├── OptionsEditor 选项编辑
├── NumberArrayEditor 数字数组
├── GenericArrayEditor 通用数组
└── RulesEditor 验证规则

设计令牌
├── 颜色系统
├── 字体系统
├── 间距系统
├── 阴影系统
├── 动画系统
└── Z-Index 系统

主题
├── 明亮主题
└── 暗色主题
```

### 每个组件页面结构

```
┌─────────────────────────────────────────────┐
│ 组件名称                                     │
│ 一句话说明                                    │
├─────────────────────────────────────────────┤
│ 交互式 Demo                                  │
│ ┌─────────────────────────────────────────┐ │
│ │                                         │ │
│ │   [组件实际渲染，可操作]                  │ │
│ │                                         │ │
│ └─────────────────────────────────────────┘ │
├─────────────────────────────────────────────┤
│ API 文档                                     │
│ ┌─────────────────────────────────────────┐ │
│ │ Props                                   │ │
│ │ ┌─────────┬────────┬─────────┬────────┐ │ │
│ │ │ 属性     │ 类型    │ 默认值   │ 说明   │ │ │
│ │ ├─────────┼────────┼─────────┼────────┤ │ │
│ │ │ ...      │ ...    │ ...     │ ...    │ │ │
│ │ └─────────┴────────┴─────────┴────────┘ │ │
│ │                                         │ │
│ │ Events                                  │ │
│ │ ┌─────────┬────────┬─────────┐          │ │
│ │ │ 事件     │ 参数    │ 说明     │          │ │
│ │ ├─────────┼────────┼─────────┤          │ │
│ │ │ ...      │ ...    │ ...     │          │ │
│ │ └─────────┴────────┴─────────┘          │ │
│ │                                         │ │
│ │ Slots                                   │ │
│ │ ┌─────────┬─────────┐                   │ │
│ │ │ 插槽     │ 说明     │                   │ │
│ │ ├─────────┼─────────┤                   │ │
│ │ │ ...      │ ...     │                   │ │
│ │ └─────────┴─────────┘                   │ │
│ └─────────────────────────────────────────┘ │
├─────────────────────────────────────────────┤
│ 用法示例                                     │
│ ┌─────────────────────────────────────────┐ │
│ │ ```vue                                  │ │
│ │ <script setup>                          │ │
│ │ import { AppDialog } from '@apform-ui/core' │ │
│ │ </script>                               │ │
│ │                                         │ │
│ │ <template>                              │ │
│ │   <AppDialog v-model="visible" title="">│ │
│ │     内容                                 │ │
│ │   </AppDialog>                          │ │
│ │ </template>                             │ │
│ │ ```                                     │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

## 五、技术方案

### 文档站
- 使用独立 Vue 应用（playground）作为文档站
- 不使用 VitePress（不适合组件演示）
- 不使用 Storybook（构建有问题，且过重）
- 每个组件一个页面，包含交互式 Demo + API 文档 + 用法代码

### 部署
- 部署到 schema-platform/apps/apform-ui/
- 通过 https://pyflow.icu/schema-platform/apform-ui/ 访问
- 跟其他子应用（editor、flow、ai）同级

### 版本管理
- 每次发布新组件，更新 package.json 版本号
- 遵循 semver：patch=修复、minor=新组件、major=破坏性变更
- 先写 README，再发布

## 六、执行计划

### Phase 1：完善基础组件（当前）
- [x] 提取基础 UI 组件（13个）
- [x] 提取对话组件（5个 + MessageParts 族 + 预览/侧栏）
- [x] 提取剩余基础组件（PageHeader、PageShell、CardTable、FilterBar、Property kit 等）
- [x] 完善核心组件的 API 文档与 playground 配方
- [x] Phase E：platform-shared 双轨收敛（跨仓）
  - AppDialog / AppPagination / FilterTabs / FormDialog / ConfirmDialog → re-export `@apform-ui/core`
  - AppIcon 保留 shared（ICON_MAP + Iconify fallback）
  - ai/flow FieldRow 三件套 + TextRenderer→renderMarkdown
  - meeting PageHeader/EmptyState/FilterBar/StatusTag 对齐 core
  - DocumentPreview / AssistantPicker / ModelPicker / useDataLoading 已入库（1.4.0）

### Phase 2：提取展示组件
- [ ] 提取 ai/app 的展示组件（FlowCard、JsonCard 等）
- [ ] 提取 portal 的展示组件（ProjectCard、CategoryFilter 等）

### Phase 3：提取编辑器组件
- [ ] 提取 editor 的可视化编辑器组件
- [ ] 抽象编辑器组件接口

### Phase 4：文档完善
- [ ] 为所有组件创建交互式 Demo
- [ ] 完善 API 文档
- [ ] 添加用法示例
- [ ] 部署文档站

### Phase 5：主题和扩展
- [ ] 完善暗色主题
- [ ] 创建 @schema-ui/icons 包
- [ ] 创建 @schema-ui/utils 包
- [ ] 创建 @schema-ui/plugins 包
