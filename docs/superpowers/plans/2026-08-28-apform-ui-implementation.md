# @apform-ui 组件库完整实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将全量 PC 端盘点中的 A 级组件收敛进 `@apform-ui`，形成可发布、可验收、可被 schema-platform / meeting / workflow-chat 消费的企业级 Vue 3 组件库。

**Architecture:** `@apform-ui/core` 为唯一 UI 真相源；组件按 Layout / Search / List / Property / Chat / Preview / Feedback 分组落地；`platform-shared` 最终改为 re-export；业务仓只保留 C 级领域组件。列表页用「组合约定」而非巨组件。

**Tech Stack:** Vue 3.5 + TypeScript 5.7 + Element Plus 2.14.2（fork 基准）+ Vite 6 + Vitest + `@vue/test-utils` + playground / VitePress docs + JSDoc 注释

**Spec:** [`COMPONENT_LIBRARY_INVENTORY.md`](../../../COMPONENT_LIBRARY_INVENTORY.md)（盘点真相源）；旧计划 [`COMPONENT_LIBRARY_PLAN.md`](../../../COMPONENT_LIBRARY_PLAN.md) 实施时同步状态列

## Global Constraints

- 工作区隔离：本计划默认只改 `schema-platform/ui/`；跨仓消费改造（ai/editor/flow/shared/meeting）在 **Phase E / Task 对应步骤** 中单独标注，须用户确认后才改其他仓
- 禁止回滚 git（无 reset --hard / revert / checkout --），除非用户明示
- 禁止兜底吞错；边界校验仅在用户输入 / 外部 API
- 图标统一走 `AppIcon` + `iconRegistry`；禁止业务代码直接 `@element-plus/icons-vue` / 编造图标名
- peer：`vue ^3.5`、`element-plus 2.14.2`；禁止自动升级 EP
- 每个新组件必须：`index.ts` 导出 + `packages/core/src/index.ts` 导出 + playground Demo + docs 页（或同批补齐）+ Vitest 冒烟（mount 不抛错）
- 注释使用 JSDoc；配置文件不加废话行内注释
- 提交仅在用户明确要求时执行；计划中的 Commit 步骤视为「可提交检查点」，执行前询问用户
- 每批结束后执行 `ima-upload` 记录进展

---

## 组件库验收标准（Definition of Done）

> 整库验收分三层：**组件级**、**批次级**、**库级（发布门禁）**。任一新组件未满足组件级 DoD，不得标 ✅；全部批次完成后跑库级清单。

### A. 组件级 DoD（每个公开组件必须全部满足）

| # | 标准 | 验证方式 |
|---|------|----------|
| A1 | 有独立目录 `packages/core/src/components/<Name>/`（或 Chat 子域），含 `.vue` + `index.ts` | 目录存在 |
| A2 | 从 `@apform-ui/core` 可具名 import：`import { X } from '@apform-ui/core'` | `index.ts` 导出 + `build:core` 后 `dist/index.d.ts` 含该符号 |
| A3 | Props / Emits /Slots 有 TypeScript 类型；公开 Props 有 JSDoc | `vue-tsc` / 代码审阅 |
| A4 | 无业务 API / Store / 路由硬编码；数据经 props / slots / inject 注入 | grep 禁：`@/api`、`useXxxStore`、`/schema-platform/` 业务路径 |
| A5 | 样式用 CSS 变量（`--apf-*` 或已有 token），不写死品牌色 | 样式审阅 |
| A6 | playground 有可交互 Demo 页 | `playground/src/views/*Demo.vue` + 路由 |
| A7 | 文档页含：一句话说明、Demo、Props/Events/Slots 表、用法示例 | `docs/components/<kebab>.md` |
| A8 | 至少 1 个 Vitest：`mount` 成功 + 1 个关键行为断言 | `pnpm --filter @apform-ui/core test` |
| A9 | 无障碍基线：可聚焦控件有可访问名；对话框有标题 | 人工 / a11y 抽检 |
| A10 | 中文文案默认合理；无占位「TODO」「测试」残留 | grep |

### B. 批次级 DoD（每个 Phase 结束）

| # | 标准 | 验证方式 |
|---|------|----------|
| B1 | 本批清单组件全部达组件级 DoD | Checklist |
| B2 | `pnpm build:core` 成功；产物体积无异常暴涨（>2× 需说明） | CI / 本地 |
| B3 | `pnpm --filter @apform-ui/core test` 全绿 | Vitest |
| B4 | `COMPONENT_LIBRARY_INVENTORY.md` / `COMPONENT_LIBRARY_PLAN.md` 状态列已更新 | diff |
| B5 | playground 本批 Demo 可手动点通主路径 | 人工 |
| B6 | 无新增 ESLint / `vue-tsc` 错误 | `build:check` |

### C. 库级验收标准（全部 Phase 完成后 · 发布门禁）

#### C1. 覆盖率（相对盘点 A 级）

| 分组 | 必须入库组件 | 验收 |
|------|--------------|------|
| Layout | PageShell, PageHeader, ContentPanel, （EnhancedDialog 能力并入 AppDialog 或独立） | 均可 import |
| Search | FilterBar, SearchForm(+Field), FilterTabs | 均可 import；FilterTabs 支持可选 `count` |
| List | AppPagination, CardTable, TableRowActions, EmptyState, useClientPagination | 均可 import |
| Property | FieldRow, HintText, SectionToggle, TruncatedTooltipText, LoadingDots | 均可 import |
| Feedback | Toast, Skeleton, CardGridSkeleton, StatusTag, ErrorBoundary, UserAvatar | 已有且文档齐 |
| Chat | MessageBubble, MessageList, Composer, RunStatusBar, ApprovalCard, MessageParts, MessageAttachmentList, DocumentSummaryList, AttachmentPreviewModal, SessionSidebar, ProcessingDrawer | 均可 import |
| Preview | JsonCard, JsonDetailDialog；（DocumentPreview / SchemaLitePreview 至少各 1） | 可 import |
| Dialog | AppDialog, FormDialog, ConfirmDialog | 已有；与 shared 单一源 |

**覆盖率门槛：** 上表「必须入库」项 **100%** 达组件级 DoD；B 级增强（Picker、Document* 全套）允许标注「下一 minor」，但不得阻塞 2.0 主验收。

#### C2. 列表页范式验收（黄金路径）

在 playground 提供 **ListPageRecipe** Demo，必须用库组件拼出：

```
PageShell
  PageHeader (title + actions)
  FilterBar (fields + search/reset)
  ContentPanel 或 CardTable
    表格或列表 slot
    EmptyState（空数据时）
    AppPagination
```

**通过条件：**

- 查询 / 重置 emit 正确
- 空数据切换 EmptyState
- 分页变更更新列表（可用 mock 数据）
- 不直接依赖任何业务仓代码

#### C3. 对话范式验收

playground **ChatRecipe** Demo：

- MessageList + MessageBubble + MessageParts 渲染 Markdown / 代码块 / JSON
- Composer 发送后列表追加
- 附件列表可打开 AttachmentPreviewModal（图片或 PDF mock）
- ApprovalCard / RunStatusBar 可独立演示

#### C4. 双轨收敛验收（Phase E）

| 检查项 | 通过条件 |
|--------|----------|
| platform-shared | `AppDialog/AppIcon/AppPagination/FilterTabs/FormDialog/ConfirmDialog` 变为 re-export `@apform-ui/core`，或文档明确「deprecated，请改 import」并给出迁移期限 |
| 同名组件 | 业务仓不再维护平行实现（EmptyState/StatusTag/FieldRow 等）——至少 **ai + flow + meeting** 完成替换，或有迁移 issue 跟踪 |
| Markdown | ai `TextRenderer` 调用 ui `renderMarkdown`，或明确兼容层单测证明输出一致 |

#### C5. 质量与工程

| 检查项 | 门槛 |
|--------|------|
| `pnpm build`（monorepo） | 成功 |
| `pnpm test`（core） | 全绿；核心组件行覆盖率 ≥ 60%（Chat 复杂组件允许行为冒烟为主） |
| `pnpm docs:build` | 成功 |
| 公开 API | `dist/index.d.ts` 无 `any` 泄漏到组件 Props（工具函数除外） |
| 版本 | 按 semver：本计划完成后建议发 **minor**（新组件）或约定的 **2.0.0**（若 shared 收敛为 breaking） |
| README | 包结构、快速使用、列表/对话范式链接齐全 |
| 禁止项 | 无 Fg* widgets、无 *NodePanel、无营销 Hero 进入 core |

#### C6. 文档与可发现性

- docs 侧栏按分组：基础 / Layout / Search / List / Property / Chat / Preview / Composables
- 每个分组有「何时用」一句话
- 提供「列表页配方」「对话配方」示例页

#### C7. 回归抽检（人工 · 发布前）

| 场景 | 操作 | 期望 |
|------|------|------|
| 列表配方 | 筛选→空→有数据→翻页 | 状态正确、无控制台报错 |
| 对话配方 | 发消息、预览附件、审批卡 | 渲染正确 |
| 暗色主题 | 切换 `@apform-ui/themes` | 主要组件可读、无硬编码白底刺眼 |
| 树摇 | 仅 import `AppPagination` 的最小 app | 不强制打进全部 Chat |

---

## 文件结构总览（将创建 / 修改）

```
packages/core/src/
  components/
    PageShell/ PageHeader/ ContentPanel/ FilterBar/
    SearchForm/ SearchFormField/
    CardTable/ TableRowActions/
    FieldRow/ HintText/ SectionToggle/ TruncatedTooltipText/ LoadingDots/
    JsonCard/ JsonDetailDialog/
    Chat/
      message/ MessageParts MessageAttachmentList DocumentSummaryList AttachmentPreviewModal
      SessionSidebar/ ProcessingDrawer/ ConversationHeader/
      (已有) MessageBubble MessageList Composer RunStatusBar ApprovalCard
  composables/
    useClientPagination.ts  useDataLoading.ts  useChatScroll.ts  useClipboard.ts
  index.ts                  # 统一导出
playground/src/views/
  ListPageRecipeDemo.vue  ChatRecipeDemo.vue  + 各组件 *Demo.vue
docs/components/
  按 kebab-name 增页；docs/.vitepress/config.ts 更新侧栏
COMPONENT_LIBRARY_PLAN.md / COMPONENT_LIBRARY_INVENTORY.md  # 状态同步
```

**源码参照（只读复制，不改外仓除非 Phase E）：**

| 目标组件 | 参照路径 |
|----------|----------|
| FilterBar | `zkr/metting/meeting-system/frontend/src/components/ui/MsFilterBar.vue` |
| ContentPanel | `.../ui/MsPanel.vue` |
| PageHeader | `ai/app/.../PageHeader.vue`（slot 名统一为 `actions`，兼容 meeting `extra` 可用别名） |
| PageShell | `ai/app/.../PageShell.vue` |
| CardTable / TableRowActions | `ai/app/.../common/` |
| FieldRow / HintText / SectionToggle | `ai/.../property-panel/` 与 `flow/.../nodePanels/`（取更干净一份） |
| AttachmentPreviewModal | `workflow-agent-chat/frontend/src/components/message/AttachmentPreviewModal.vue` |
| SearchForm | `editor/src/components/SearchForm/` |
| useClientPagination | `shared/platform-shared` utils |

---

## Phase 总览与依赖

```
B0 修缮 Chat 导出 ──┐
B1 列表页套件 ──────┼──► B2 Property kit
                    ├──► B3 Chat 壳补齐
                    └──► B4 SearchForm + Preview
                              │
                              ▼
                         B5 双轨收敛（跨仓）
                              │
                              ▼
                         库级验收 C1–C7 → 发版
```

| Phase | 批次 | 预估 | 可独立交付 |
|-------|------|------|------------|
| A | B0 Chat 修缮 | 0.5–1 天 | 是 |
| B | B1 列表套件 | 2–3 天 | 是（含 ListPageRecipe） |
| C | B2 Property | 1–2 天 | 是 |
| D | B3 Chat 壳 + B4 Search/Preview | 3–4 天 | 可拆两个 PR |
| E | B5 双轨收敛 | 2–4 天（跨仓） | 需用户批准改外仓 |

---

### Task 0: 工程基线与计划对齐

**Files:**
- Modify: `COMPONENT_LIBRARY_PLAN.md`（状态列对齐 INVENTORY）
- Create: `docs/superpowers/plans/2026-08-28-apform-ui-implementation.md`（本文）
- Modify: `packages/core/src/index.ts`（仅注释分组，可选）

**Interfaces:**
- Produces: 计划与盘点状态一致，作为后续 Task 勾选依据

- [ ] **Step 1:** 将 `COMPONENT_LIBRARY_PLAN.md` 中已存在的 MessageParts / AttachmentList / DocumentSummaryList 改为「文件已有 · 待导出」；补充 FilterBar / ContentPanel / useClientPagination 等缺口行
- [ ] **Step 2:** 确认 `pnpm build:core` 与 `pnpm --filter @apform-ui/core test` 当前基线可跑
- [ ] **Step 3:** 检查点 — 询问用户是否提交文档

---

### Task 1: B0 — 导出 Chat 子组件

**Files:**
- Create: `packages/core/src/components/Chat/message/index.ts`
- Modify: `packages/core/src/index.ts`
- Create: `packages/core/src/components/Chat/message/MessageParts.spec.ts`（或 `__tests__`）
- Create: `playground/src/views/ChatPartsDemo.vue`
- Create: `docs/components/message-parts.md`（可与 chat 文档合并）

**Interfaces:**
- Consumes: 已有 `MessageParts.vue` / `MessageAttachmentList.vue` / `DocumentSummaryList.vue`；`renderMarkdown` / `attachmentKind`
- Produces:
  ```ts
  export { MessageParts } from './components/Chat/message'
  export { MessageAttachmentList } from './components/Chat/message'
  export { DocumentSummaryList } from './components/Chat/message'
  ```

- [ ] **Step 1:** 写 `message/index.ts` 导出三个组件
- [ ] **Step 2:** 在 `packages/core/src/index.ts` 的「组件 — 对话」段追加上述 export
- [ ] **Step 3:** Vitest：`mount(MessageParts, { props: { content: '# hi' } })` 断言含渲染节点
- [ ] **Step 4:** `pnpm build:core` — `dist/index.d.ts` 含三个符号
- [ ] **Step 5:** playground Demo + docs 一页说明
- [ ] **Step 6:** 勾选组件级 DoD A1–A10；更新 INVENTORY 状态

---

### Task 2: B0 — 迁入 AttachmentPreviewModal

**Files:**
- Create: `packages/core/src/components/Chat/message/AttachmentPreviewModal.vue`
- Modify: `packages/core/src/components/Chat/message/index.ts`
- Modify: `packages/core/src/index.ts`
- Modify: `MessageAttachmentList.vue`（点击打开预览，若源逻辑有则对齐）
- Test: `AttachmentPreviewModal.spec.ts`
- Playground / docs 更新 ChatPartsDemo

**Interfaces:**
- Consumes: `isImage` / `isPdf` / `isPreviewable` / `formatSize` from `attachmentKind`
- Produces:
  ```ts
  /** 附件预览弹层 */
  defineProps<{
    modelValue: boolean
    url: string
    name?: string
    mime?: string
  }>()
  defineEmits<{ 'update:modelValue': [boolean] }>()
  ```

- [ ] **Step 1:** 从 `workflow-agent-chat/.../AttachmentPreviewModal.vue` 复制并去业务依赖（硬编码 API → props）
- [ ] **Step 2:** 导出 + 单测（打开时图片/非预览态分支）
- [ ] **Step 3:** `MessageAttachmentList` 增加可选 `@preview` 或内置 v-model 预览
- [ ] **Step 4:** build + playground 验证
- [ ] **Step 5:** 更新计划状态；本 Task 达 DoD

---

### Task 3: B1 — PageShell + PageHeader

**Files:**
- Create: `packages/core/src/components/PageShell/{PageShell.vue,index.ts}`
- Create: `packages/core/src/components/PageHeader/{PageHeader.vue,index.ts}`
- Modify: `packages/core/src/index.ts`
- Create: playground + docs + specs

**Interfaces:**
- Produces:
  ```ts
  // PageShell
  defineProps<{ fill?: boolean }>() // default false
  // PageHeader
  defineProps<{ title: string; subtitle?: string }>()
  // slots: default (title 下方), actions（右侧；兼容文档说明 extra 为别名时可双 slot）
  ```

- [ ] **Step 1:** 以 ai `PageShell` / `PageHeader` 为基准迁入；slot 统一 `actions`
- [ ] **Step 2:** 单测 mount + fill class
- [ ] **Step 3:** export、Demo、docs
- [ ] **Step 4:** DoD 勾选

---

### Task 4: B1 — FilterBar + ContentPanel

**Files:**
- Create: `packages/core/src/components/FilterBar/{FilterBar.vue,index.ts}`
- Create: `packages/core/src/components/ContentPanel/{ContentPanel.vue,index.ts}`
- Modify: `index.ts`；playground；docs；specs

**Interfaces:**
- Produces:
  ```ts
  // FilterBar — 参照 MsFilterBar
  defineProps<{ title?: string }>()
  defineEmits<{ search: []; reset: [] }>()
  // slots: default (fields), actions
  // ContentPanel — 参照 MsPanel
  defineProps<{ title?: string; flush?: boolean; fill?: boolean }>()
  // slots: default, extra
  ```

- [ ] **Step 1:** 迁入并改前缀 class 为 `apf-filter-bar` / `apf-content-panel`
- [ ] **Step 2:** 单测：点击默认查询/重置按钮触发 emit
- [ ] **Step 3:** export + Demo + docs
- [ ] **Step 4:** DoD

---

### Task 5: B1 — CardTable + TableRowActions + useClientPagination

**Files:**
- Create: `packages/core/src/components/CardTable/...`
- Create: `packages/core/src/components/TableRowActions/...`
- Create: `packages/core/src/composables/useClientPagination.ts`
- Modify: `composables/index.ts`、`packages/core/src/index.ts`
- Create: `playground/src/views/ListPageRecipeDemo.vue`（**批次级黄金路径**）

**Interfaces:**
- Produces:
  ```ts
  // CardTable
  defineProps<{ loading?: boolean; padding?: boolean }>()
  // TableRowActions — 超过 N 个操作折叠到「更多」
  defineProps<{ maxVisible?: number }>() // default 2
  // useClientPagination
  function useClientPagination<T>(options: {
    source: Ref<T[]> | (() => T[])
    pageSize?: number
  }): {
    page: Ref<number>
    pageSize: Ref<number>
    total: ComputedRef<number>
    pageData: ComputedRef<T[]>
    setPage: (p: number) => void
  }
  ```

- [ ] **Step 1:** 从 ai common / platform-shared 迁入并去耦
- [ ] **Step 2:** 单测分页切片正确（10 条 pageSize=3 → 第 2 页 3 条）
- [ ] **Step 3:** 实现 **ListPageRecipeDemo**（验收标准 C2）
- [ ] **Step 4:** docs「列表页配方」页
- [ ] **Step 5:** Phase B 批次级 DoD B1–B6

---

### Task 6: B1 — HintText（FieldTip）对齐

**Files:**
- Create: `packages/core/src/components/HintText/{HintText.vue,index.ts}`
- 参照 ai HintText + meeting FieldTip，统一为 HintText

**Interfaces:**
```ts
defineProps<{ content: string; placement?: string }>()
```

- [ ] **Step 1–4:** 实现、测试、导出、Demo、docs、DoD

---

### Task 7: B2 — Property kit

**Files:**
- Create: `FieldRow` / `SectionToggle` / `TruncatedTooltipText` / `LoadingDots`
- Modify: `index.ts`；playground `PropertyKitDemo.vue`；docs

**Interfaces:**
```ts
// FieldRow
defineProps<{ label: string; required?: boolean }>()
// slots: default (控件)
// SectionToggle
defineProps<{ title: string; defaultOpen?: boolean }>()
// TruncatedTooltipText
defineProps<{ text: string; maxWidth?: string }>()
// LoadingDots — 无必需 props
```

- [ ] **Step 1:** 以 ai 版为基准迁入（比对 flow，去掉更脏的耦合）
- [ ] **Step 2:** PropertyKitDemo：FieldRow+HintText+SectionToggle 组合
- [ ] **Step 3:** 全套单测 + build + DoD
- [ ] **Step 4:** INVENTORY 标记 Property A 级完成；**外仓删双份留到 Phase E**

---

### Task 8: B3 — SessionSidebar + ProcessingDrawer + ConversationHeader

**Files:**
- Create: 对应 Chat 子目录（替换空目录）
- 源：`workflow-agent-chat/frontend/src/components/`
- playground `ChatRecipeDemo.vue`（验收 C3）

**Interfaces:**
- 去品牌硬编码；会话列表数据 props 注入：
```ts
// SessionSidebar
defineProps<{
  sessions: Array<{ id: string; title: string; updatedAt?: string }>
  activeId?: string
  loading?: boolean
}>()
defineEmits<{ select: [id: string]; create: []; delete: [id: string] }>()
```

- [ ] **Step 1:** 逐个迁入并去耦
- [ ] **Step 2:** ChatRecipeDemo 拼完整对话壳（C3）
- [ ] **Step 3:** build/test/docs/DoD

---

### Task 9: B3 — AssistantPicker / ModelPicker（可选 B 级）

**Files:** Chat 子组件；若工期紧可标「下一 minor」但须在 INVENTORY 注明

- [ ] **Step 1:** 评估 props 化成本；实现或显式 defer 并更新验收 C1 脚注
- [ ] **Step 2:** 若实现 — Demo + docs + DoD

---

### Task 10: B4 — SearchForm + SearchFormField

**Files:**
- Create: `packages/core/src/components/SearchForm/...`
- 源：`editor/src/components/SearchForm/`（去掉 schema 强类型，改为泛型 field config）

**Interfaces:**
```ts
export type SearchFieldConfig = {
  key: string
  label: string
  type: 'input' | 'select' | 'date' | 'daterange'
  options?: Array<{ label: string; value: string | number }>
  placeholder?: string
}
defineProps<{
  fields: SearchFieldConfig[]
  modelValue: Record<string, unknown>
  collapsible?: boolean
  defaultCollapsed?: boolean
}>()
defineEmits<{
  'update:modelValue': [Record<string, unknown>]
  search: [Record<string, unknown>]
  reset: []
}>()
```

- [ ] **Step 1:** 实现通用 SearchForm（禁止依赖 editor `@/api`）
- [ ] **Step 2:** 与 FilterBar 文档对比「何时用哪个」
- [ ] **Step 3:** Demo + 单测 + DoD
- [ ] **Step 4:** FilterTabs 增强可选 `count?: number`（portal CategoryFilter 能力）

---

### Task 11: B4 — JsonCard + JsonDetailDialog + Preview 最小集

**Files:**
- Create: `JsonCard` / `JsonDetailDialog`
- Optional: `DocumentPreviewDrawer` 或轻量 `SchemaLitePreview`（至少完成 Json 对）

**Interfaces:**
```ts
// JsonCard
defineProps<{ data: unknown; title?: string; maxHeight?: string }>()
defineEmits<{ openDetail: [] }>()
```

- [ ] **Step 1–4:** 迁入 ai Json*、测试、导出、Demo、docs
- [ ] **Step 2b:** 若做 SchemaLitePreview — 仅 EP 表单轻量预览，禁止拉 editor WidgetRenderer

---

### Task 12: B4 — EnhancedDialog 能力

**Files:**
- Modify: `AppDialog` **或** 新建 `EnhancedDialog` 再 re-export
- 源：`editor/src/components/EnhancedDialog.vue`

- [ ] **Step 1:** 决策：合并进 AppDialog（`draggable?: boolean`）避免双 Dialog API
- [ ] **Step 2:** 实现 + 回归现有 AppDialog Demo
- [ ] **Step 3:** DoD

---

### Task 13: Phase E — platform-shared 双轨收敛（跨仓 · 需批准）

**Files（外仓）:**
- Modify: `schema-platform/shared/platform-shared/components/common/*` → re-export from `@apform-ui/core`
- Modify: package.json 增加 peer/dep `@apform-ui/core`
- 验证：ua / editor / flow / ai 仍能编译

**前置：** 用户明确批准修改 `shared/` 及其他消费方

- [ ] **Step 1:** 在 ui 发可用版本（workspace `file:` 或 npm）
- [ ] **Step 2:** shared 组件改为：
  ```ts
  export { AppDialog, AppIcon, AppPagination, FilterTabs, FormDialog, ConfirmDialog } from '@apform-ui/core'
  ```
- [ ] **Step 3:** 各 app `pnpm` 安装后冒烟列表页
- [ ] **Step 4:** 验收标准 C4

---

### Task 14: Phase E — 业务仓替换双份（跨仓 · 需批准）

**Targets（按优先级）:**
1. ai/flow：`FieldRow`/`HintText`/`SectionToggle` → `@apform-ui/core`
2. meeting：FilterBar/PageHeader/EmptyState/StatusTag → core
3. workflow-agent-chat：Chat 组件 → core
4. ai：`TextRenderer` → `renderMarkdown`
5. editor：EmptyState/ErrorBoundary 对齐

- [ ] **Step 1:** 每仓一个 PR；禁止大爆炸
- [ ] **Step 2:** 每仓冒烟对应黄金路径
- [ ] **Step 3:** C4 勾选完成

---

### Task 15: 库级验收与发版准备

**Files:**
- Modify: `README.md`、`packages/core/package.json` version
- Run: `pnpm build` / `pnpm test` / `pnpm docs:build`
- 人工：C2 ListPageRecipe、C3 ChatRecipe、C7 回归表

- [ ] **Step 1:** 按本文「组件库验收标准」C1–C7 逐项打勾，记入 `docs/superpowers/plans/2026-08-28-apform-ui-acceptance-checklist.md`（执行时创建）
- [ ] **Step 2:** 未达标项：修或明确 defer 到下一版本并写进 CHANGELOG
- [ ] **Step 3:** 版本号建议：`@apform-ui/core` minor（仅 ui）或 major（shared 收敛 breaking）
- [ ] **Step 4:** 询问用户是否 commit / publish / 部署 docs
- [ ] **Step 5:** `ima-upload` 记录发版结论

---

## 明确不在本计划内（防范围蔓延）

- editor `widgets/Fg*`、完整 `SchemaRender`
- ai `message/renderers/*` 协议渲染器（可另立「可插拔 renderer 注册表」专项）
- 各产品 `*Layout`、BPMN `*NodePanel`
- portal / 营销站 Hero 视觉
- deploy-gui React 迁移
- forum 三套源码去重（独立 chore）

---

## Spec 覆盖自检

| 盘点要求 | 对应 Task |
|----------|-----------|
| Chat 未导出 / AttachmentPreview | Task 1–2 |
| 列表套件 FilterBar/Page*/Panel/CardTable/Pagination | Task 3–5 |
| Property 孪生 | Task 7 |
| SearchForm 集合 | Task 10 |
| Preview Json* | Task 11 |
| 双轨收敛 | Task 13–14 |
| 验收标准 | 文首 DoD + Task 15 |
| 最小积木 HintText/LoadingDots | Task 6–7 |

无 TBD 占位；跨仓步骤均标注「需批准」。

---

## 执行方式（完成后请选择）

Plan 已保存到：

`docs/superpowers/plans/2026-08-28-apform-ui-implementation.md`

**1. Subagent-Driven（推荐）** — 每 Task 新开子代理，Task 间人工复核  
**2. Inline Execution** — 本会话按 Task 连续执行，设检查点  

回复 `1` / `2`，并确认是否允许 **仅 ui 仓** 先做 Phase A–D（B0–B4），Phase E 跨仓另批批准。
