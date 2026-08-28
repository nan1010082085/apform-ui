# @apform-ui 全量 PC 端组件盘点

> 扫描日期：2026-08-28  
> 范围：所有本机 PC 端 Vue/React 前端（含最小积木；Flutter/小程序排除）  
> 评级：**A** 高度通用可进库 · **B** 去业务耦合后可进 · **C** 强业务/品牌留仓

---

## 一、扫描项目与规模

| 项目 | 路径 | Vue/组件数 | A 密度 |
|------|------|-----------|--------|
| ai/app | `schema-platform/ai/app` | components 156 | 高 |
| editor | `schema-platform/editor` | components 74 + widgets 113 | 中（积木多、业务也多） |
| flow | `schema-platform/flow` | components 45 | 高（Property 孪生） |
| ua | `schema-platform/ua` | 1 layout + views | 低（模式可抽） |
| forum-app / forum-admin | `schema-platform/forum-*` | ~4–6 | 低 |
| platform-shared | `shared/platform-shared` | 9 + composables | 已有 ↔ ui 双轨 |
| **ui（目标库）** | `schema-platform/ui` | core 21 | 对照基线 |
| workflow-agent-chat | `workflow-agent-chat/frontend` | components 16 | 高（Chat 源） |
| **会议系统** | `zkr/metting/meeting-system/frontend` | 21 | **最高**（列表页范式完整） |
| portal | `portal` | 11 | 中 |
| four-dimensional-analysis | `four-dimensional-analysis/frontend` | 16 | 低（行情域） |
| inspiration / amber / matrix / salary websites | 各 `website` | 营销页为主 | 极低 |
| deploy-gui | `deploy-gui` | React+AntD | 仅概念对齐，不迁 Vue |

排除：Flutter（inspiration/matrix/amber/salary 客户端）、uni-app 小程序、server、docs 站点正文。

---

## 二、目标库现状（@apform-ui/core）

### 已入库且已导出

AppDialog、FormDialog、ConfirmDialog、AppIcon、AppPagination、FilterTabs、EmptyState、ErrorBoundary、StatusTag、Skeleton、CardGridSkeleton、UserAvatar、Toast  
Layout/List：PageShell、PageHeader、ContentPanel、FilterBar、CardTable、TableRowActions、SearchForm  
Property：FieldRow、HintText、SectionToggle、TruncatedTooltipText、LoadingDots  
Preview：JsonCard、JsonDetailDialog、SchemaLitePreview  
Chat：MessageBubble、MessageList、Composer、RunStatusBar、ApprovalCard、MessageParts、MessageAttachmentList、DocumentSummaryList、AttachmentPreviewModal、SessionSidebar、ProcessingDrawer、ConversationHeader  
Composables：useConfirm、useToast、useMessage、useDebounceFn、useClientPagination  
Utils：iconRegistry、pagination、resolveApiErrorMessage、textParser、attachmentKind

### 已有文件但未导出 / 未齐

| 组件 | 状态 |
|------|------|
| ~~MessageParts~~ | ✅ 已导出（1.2.0） |
| ~~MessageAttachmentList~~ | ✅ 已导出 |
| ~~DocumentSummaryList~~ | ✅ 已导出 |
| ~~ProcessingDrawer / SessionSidebar~~ | ✅ 已实现并导出 |
| ~~AttachmentPreviewModal~~ | ✅ 已迁入 |

> 2026-08-28 实施：Phase A–D（B0–B4）已在 `ui` 仓落地；Phase E 跨仓双轨收敛未做。

---

## 三、A 级候选全集（应进库 · 含最小积木）

### 3.1 Layout

| 组件 | 最佳来源 | 说明 |
|------|----------|------|
| PageShell | ai `common/PageShell` | 路由页外沿/滚动/fill |
| PageHeader | ai `common/PageHeader` **且** meeting `PageHeader` | 标题+副标题+extra（两处应对齐 API） |
| ContentPanel / MsPanel | meeting `ui/MsPanel` | 白底内容面板 title/extra/flush |
| EnhancedDialog | editor `EnhancedDialog` | 可拖拽增强 Dialog（可并入 AppDialog） |

### 3.2 Search / Filter 集合

| 组件 | 最佳来源 | 说明 |
|------|----------|------|
| **FilterBar**（MsFilterBar） | meeting `ui/MsFilterBar` | fields slot + 查询/重置 —— **列表页刚需** |
| FilterTabs | ui / platform-shared（已有） | portal `CategoryFilter` 可增强 count |
| SearchForm + SearchFormField | editor `SearchForm/FgSearchForm` + `SearchFormField` | 可折叠搜索表单集合 |
| FgFilterBar | editor widgets | 与 FilterBar 对齐后二选一 |

**Search 集合建议 API（组合，非巨组件）：**

```
PageShell
  PageHeader
  FilterBar          ← 简单筛选（会议范式）
    slot: 字段
  或 SearchForm      ← 可折叠多字段（editor 范式）
  ContentPanel / CardTable
    Table | 列表
    EmptyState | Skeleton
    AppPagination
```

### 3.3 List / Table / Pagination

| 组件 | 最佳来源 | 说明 |
|------|----------|------|
| AppPagination | ui / shared（已有，需定单一源） | 全站分页 |
| useClientPagination | platform-shared | 客户端分页 composable |
| CardTable | ai `common/CardTable` | 卡片式表格容器 |
| TableRowActions | ai `common/TableRowActions` | 操作列折叠「更多」 |
| EmptyState | ui / editor / meeting（三份） | 对齐 API 后只留 ui |
| ListPage 文档/模板 | meeting 多 views 范式 | Header+Filter+Table+Pagination+Empty（约定优先于巨组件） |

**各项目列表+分页落地处（模式重复，证明需要 List 套件）：**

- ai：AgentWorkflowList、AgentExecutionList、ApiKey、Rag、ModelList、MetricTable、AlertList
- editor：Credential/Submission/Tenant/Instances/WidgetMarket/KeyUsageAudit + AppPagination
- flow：FlowList、FlowInstanceList、TaskInbox、embed TaskList
- ua：Tenant/User/Role ListView（内联搜索+表+分页）
- meeting：MeetingList、RoomList、UserManagement、RoleManagement、Dashboard

### 3.4 Property 最小积木（ai ↔ flow 孪生，最高优先）

| 组件 | 来源 |
|------|------|
| FieldRow | ai property-panel / flow nodePanels |
| HintText | 同上（问号 Popover） |
| SectionToggle | 同上 |
| TruncatedTooltipText | ai |
| FieldTip | meeting（字段说明，近 HintText） |
| PropertySection | editor（近 SectionToggle） |
| LoadingDots（AiLoadingDots） | ai |

### 3.5 Feedback / 展示小积木

| 组件 | 来源 | 说明 |
|------|------|------|
| Skeleton / CardGridSkeleton / Toast / StatusTag / ErrorBoundary / UserAvatar | ui 已有 | meeting/portal 本地版应替换 |
| JsonCard / JsonDetailDialog | ai | JSON 展示 |
| NotificationBell | flow | 可进 Feedback |

### 3.6 Chat（补齐）

| 组件 | 来源 | 说明 |
|------|------|------|
| AttachmentPreviewModal | workflow-agent-chat | **待迁** |
| SessionSidebar / ProcessingDrawer / ConversationHeader | workflow-agent-chat | 待迁（ui 空目录） |
| AssistantPicker / ModelPicker | workflow-agent-chat | B，Chat 子包 |
| MessageParts 等 | 已有文件 | **补 export** |
| useChatScroll | ai | composable A |

### 3.7 Preview（次优先 A/B）

| 组件 | 来源 |
|------|------|
| JsonCard / JsonDetailDialog | ai → A |
| DocumentPreviewDrawer/Panel、Pdf/Excel PreviewCard | ai → B |
| SchemaLitePreview / FormWidgetPreview / SchemaPreview | ai / flow → B |
| AttachmentPreviewModal | chat → A |

### 3.8 Picker / Upload（B，去 API 后）

UserPicker、RolePicker（flow）、AttendeePicker（meeting）、ModelOptionSelect（ai）、通用 ImageUpload

### 3.9 Composables 应进库

| 名称 | 来源 |
|------|------|
| useClientPagination / useDataLoading | platform-shared |
| useChatScroll | ai |
| useClipboard | editor / flow（重复） |
| useBreakpoint / useIdGenerate（可选） | editor |

---

## 四、B 级（去耦合后进库）

- BreadcrumbNav（editor，改 props 化）
- AppUserPanel（shared）
- AiMentionInput、AiMessageActionBar、ConversationDrawer
- Document* 预览族、媒体 PreviewCard
- CommentList / CommentEditor / LoginDialog（forum，通用化）
- ConditionBuilder、样式 Editors（Spacing/Border/Shadow/Background）
- PropertyField（去掉 `@/api`）
- deploy-gui 概念：上下文资源选择器、FormModal+副操作

---

## 五、C 级（明确不进通用库）

| 类别 | 示例 |
|------|------|
| 产品 Layout | AiLayout、UaLayout、ForumLayout、FlowDesigner 壳 |
| 节点面板 | ai 40+ *NodePanel、flow BPMN *Panel |
| Schema 运行时 | editor WidgetRenderer、113 Fg* widgets（源码留 editor；**主题 `$fg-*` / `fg-theme.css` 已覆盖到平台设计令牌**） |
| Chat step 协议渲染器 | ai message/renderers/*（可插拔注册表，非 MessageParts） |
| 营销站 | portal Hero/粒子、各 website Hero/Download/Privacy |
| 行情/会议业务 Dialog | four-dimensional 图表卡、RoomFormDialog、MeetingDetailDialog |
| React 运维页 | deploy-gui 整页 |

---

## 六、跨项目重复（必须收敛）

| 重复簇 | 出现位置 | 动作 |
|--------|----------|------|
| AppDialog/FormDialog/Confirm/Pagination/FilterTabs/AppIcon | platform-shared ↔ ui | **定 ui 为唯一源** |
| EmptyState / StatusTag | editor、meeting、ui | 删业务仓副本 |
| FieldRow/HintText/SectionToggle | ai ↔ flow | 立刻合并进库 |
| Toast / AppIcon | portal ↔ ui | portal 对齐 |
| Chat 核心 | workflow ↔ ui | 源项目改依赖 ui |
| useEdgePath / useClipboard | ai ↔ flow ↔ editor | 抽 composable |
| PageHeader | ai ↔ meeting | 抽时统一 API |
| FilterBar vs FgSearchForm | meeting ↔ editor | 抽 FilterBar + 可选 SearchForm |
| forum 三套副本 | forum-app 嵌套 | 去重源码（非抽库） |

---

## 七、建议入库批次（修订版）

### Batch 0 — 修缮现有（ui 仓内）

1. export MessageParts / MessageAttachmentList / DocumentSummaryList  
2. 迁入 AttachmentPreviewModal  
3. 同步本清单到 COMPONENT_LIBRARY_PLAN 状态  

### Batch 1 — 列表页套件（会议 + ai 证明刚需）

1. FilterBar（MsFilterBar）  
2. PageHeader + PageShell + ContentPanel  
3. CardTable + TableRowActions  
4. FieldTip / HintText（小积木）  
5. useClientPagination  

### Batch 2 — Property kit

FieldRow、SectionToggle、TruncatedTooltipText、LoadingDots；对齐 ai/flow 双份删除  

### Batch 3 — Chat 补齐

SessionSidebar、ProcessingDrawer、ConversationHeader、Picker 族；Markdown 与 ai TextRenderer 收敛  

### Batch 4 — SearchForm 增强 + Preview

FgSearchForm 通用化、JsonCard、DocumentPreview*、SchemaLitePreview  

### Batch 5 — 双轨收敛

platform-shared 薄封装改 re-export `@apform-ui/core`；各 app 改 import  

### 不进本库

editor Fg* widgets、各 *NodePanel、营销 Hero、完整 SchemaRender  

---

## 八、与旧计划差异

旧 `COMPONENT_LIBRARY_PLAN.md` 遗漏或低估：

- 会议系统整套列表范式（FilterBar / MsPanel / FieldTip / PageHeader）  
- useClientPagination / useDataLoading  
- EnhancedDialog、LoadingDots、TruncatedTooltipText  
- SearchForm 集合（不仅 FilterTabs）  
- ListPage「组合约定」比单一 CardTable 更重要  
- MessageParts 等实际已存在却仍标「待提取」  

本文为盘点真相源；实施时同步更新 `COMPONENT_LIBRARY_PLAN.md` 状态列。
