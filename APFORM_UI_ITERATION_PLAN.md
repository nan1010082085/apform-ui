# @apform-ui 迭代计划（库优先 · 非全量替换）

> **制定日期：** 2026-08-31  
> **闭合日期：** 2026-09-05  
> **状态：** **已闭合** — 余量 backlog（C3/C4、Batch5、其余 B 级）一律不做；后续另开设计  
> **当前版本：** `@apform-ui/core@1.7.0`  
> **关联文档：**  
> - 盘点真相源：[`COMPONENT_LIBRARY_INVENTORY.md`](./COMPONENT_LIBRARY_INVENTORY.md)  
> - 组件清单状态：[`COMPONENT_LIBRARY_PLAN.md`](./COMPONENT_LIBRARY_PLAN.md)  
> - 库级验收：[`docs/superpowers/plans/2026-08-28-apform-ui-acceptance-checklist.md`](./docs/superpowers/plans/2026-08-28-apform-ui-acceptance-checklist.md)  
> - 历史实施计划：[`docs/superpowers/plans/2026-08-28-apform-ui-implementation.md`](./docs/superpowers/plans/2026-08-28-apform-ui-implementation.md)

---

## 一、战略定位

### 1.1 本阶段目标

**把 `@apform-ui` 做成完整、可独立发布、可对外演示的 UI 产品**——而不是现在就替换 schema-platform 全平台基建。

| 维度 | 本阶段要做 | 本阶段不做 |
|------|-----------|-----------|
| 组件库 | A 级组件 DoD 100%、文档/Demo 齐、构建零 TS 错误 | EP 全量 fork / 与 EP 文档 1:1 |
| 设计体系 | tokens + element-override + fg-theme 稳定 | 各 app 全局样式一次性迁移 |
| 跨仓 | 保持 platform-shared 薄 re-export；**试点** ai 删 duplicate | editor/ua/portal 批量改 import |
| 边界 | 平台通用积木（Layout/List/Property/Chat/Preview） | Fg* widget、NodePanel、SchemaRender、营销 Hero |

### 1.2 成功标准（库级，非平台级）

1. **可发布：** `build:check` 全绿，`pnpm test` 全绿，npm 版本与 `SCHEMA_UI_VERSION` 一致  
2. **可演示：** playground 每个公开 export 有可点 Demo；两个黄金配方（ListPage / Chat）稳定  
3. **可查阅：** docs 覆盖全部公开组件 + composables + 核心 utils；设计令牌文档完整  
4. **可消费：** 外部项目仅依赖 `@apform-ui/core` + EP peer 即可跑通 ListPage / Chat 范式  
5. **不背锅：** 不要求任一业务仓「零本地 UI 组件」；试点替换单独跟踪、不阻塞发版

### 1.3 与旧计划的关系

- **Phase A–E（implementation.md）** 组件入库与 C1 覆盖率：**已基本完成**  
- **APFORM_UI_100_PERCENT_PLAN.md** 中「与 EP 文档 100% 对齐」：**降级为长期愿景，移出本迭代门禁**  
- **本计划** 接管 Phase 2 以后工作，重心从「继续抽业务仓」转为「把库本身做完整」

---

## 二、当前基线（2026-08-31）

### 2.1 已完成

| 项 | 状态 |
|----|------|
| A 级组件入库（Layout/List/Property/Chat/Preview/Dialog/Feedback） | ✅ ~50 公开 export |
| 设计令牌 + element-override + fg-theme | ✅ 1.3.x–1.4.x |
| platform-shared Dialog/Pagination/FilterTabs/Form/Confirm re-export | ✅ Phase E |
| ai/flow Property 四件套 + TextRenderer→renderMarkdown | ✅ 试点 |
| meeting 列表四件套薄封装 | ✅ 本地 |
| npm 发布 | ✅ 1.4.2 |
| Vitest 冒烟 | ✅ 15 tests |
| 黄金路径 playground | ✅ list-recipe / chat-recipe |

### 2.2 缺口（库内优先修复）

| 缺口 | 影响 | 优先级 |
|------|------|--------|
| `build:check` TS 报错（ApprovalCard、useChatScroll 等） | 发布门禁 | P0 |
| `SCHEMA_UI_VERSION` 与 package.json 不一致（1.4.1 vs 1.4.2） | 版本信任 | P0 |
| A6/A7 未全勾：部分组件缺 playground Demo / docs | 产品完整度 | P1 |
| 缺 docs：useDataLoading、useChatScroll、useToast、renderMarkdown 等 | 文档覆盖 | P1 |
| 单组件 Vitest 覆盖低（仅 aggregate spec） | 质量 | P2 |
| 暗色主题 / 树摇未验收 | 工程化 | P2 |
| B 级组件未评估入库 | 能力扩展 | P3 |

### 2.3 明确不进库（全迭代周期不变）

- editor **113 Fg\***、**WidgetRenderer / SchemaRender**  
- ai/flow **40+ \*NodePanel**  
- 营销 **Hero**、会议/行情 **业务 Dialog**  
- ai **message/renderers/\*** 协议渲染器（与 MessageParts 不同层）  
- editor **属性 CRUD 编辑器族**（ColumnsEditor、RulesEditor 等）——设计器 DSL 专属

---

## 三、迭代阶段

```text
Phase 0  工程质量门禁          → 1.4.3
Phase 1  库完整性（DoD 100%）   → 1.5.0
Phase 2  文档与 Playground 产品化 → 1.5.x
Phase 3  B 级选择性扩展        → 1.6.0
Phase 4  主题与发布工程化      → 1.6.x
Phase 5  试点消费（可选并行）   → 各业务仓 minor，不阻塞 ui 发版
```

---

## Phase 0：工程质量门禁

**目标：** 库可作为「零已知缺陷」的发布基线。  
**版本：** `1.4.3`（patch）  
**工期：** 1–2 天  
**范围：** 仅 `schema-platform/ui/`

### 任务

- [x] **0.1** 修复 `pnpm --filter @apform-ui/core build:check` 全部 TS 错误  
  - `ApprovalCard.vue` 未使用 props  
  - `useChatScroll.ts` 未使用变量  
  - 扫描并清零同类 TS6133 / emit 类型问题  
- [x] **0.2** 同步 `SCHEMA_UI_VERSION` ↔ `package.json` version  
- [x] **0.3** CI 脚本（或根 `package.json` script）固定三门禁：  
  `build:check` · `test` · `docs:build`  
- [x] **0.4** CHANGELOG 补 1.4.2→1.4.3 修复项  

### 验收

- [x] 三门禁本地全绿（build:check + test；docs:build 视环境 ENFILE 可重试）  
- [ ] npm publish `@apform-ui/core@1.4.3` + git tag `v1.4.3`

---

## Phase 1：库完整性（组件级 DoD 100%）

**目标：** 现有公开 export 全部满足 A1–A10，不新增大范围组件。  
**版本：** `1.5.0`（minor）  
**工期：** 1–2 周  
**范围：** 仅 `ui/`

### 1.1 公开 export 清单对齐

对 `packages/core/src/index.ts` 每一项执行组件级 DoD 审计，产出 [`docs/internal/export-dod-audit.md`](./docs/internal/export-dod-audit.md)（实施时创建）：

| 分组 | 条目数 | 重点补齐 |
|------|--------|----------|
| 通用 Dialog/Feedback | 13 | FormDialog/ConfirmDialog playground |
| Layout/List/Search | 7 | SearchForm 字段类型 Demo |
| Property | 5 | — |
| Preview | 5 | DocumentPreview 交互 Demo |
| Chat | 15 | MessageBubble/List/Composer 独立 Demo |
| Composables | 8 | useDataLoading、useChatScroll、useToast |
| Utils | 6 | renderMarkdown、attachmentKind 文档页 |

### 1.2 Playground 补齐（A6）

- [x] MessageBubble / MessageList / Composer 独立 Demo  
- [x] SessionSidebar / ProcessingDrawer / ConversationHeader  
- [x] AssistantPicker / ModelPicker  
- [x] DocumentPreviewPanel / DocumentPreviewDrawer  
- [x] FormDialog / ConfirmDialog  
- [x] EmptyState（compact / action 变体）  
- [x] useDataLoading / useChatScroll / useToast / useConfirm / useMessage / useDebounceFn Demo  

### 1.3 测试补齐（A8）

- [x] core-feedback + composables-utils 拆分  
- [x] composables 单测  
- [x] 目标 **≥46** 条 Vitest（当前 46）

### 验收

- [x] export-dod-audit.md 全部 ✅  
- [x] A6/A7 核心项可勾满  
- [x] Vitest ≥40 全绿  
- [ ] 发版 `1.5.0`（待 npm + tag）

---

## Phase 2：文档与 Playground 产品化

**目标：** 对外可像独立 UI 产品一样查阅、复制、运行。  
**版本：** `1.5.1`–`1.5.x`（patch 迭代）  
**工期：** 1–2 周  
**范围：** 仅 `ui/`

### 2.1 文档站

- [x] 补缺失 docs 页（composables / utils / BreadcrumbNav）
- [ ] 每个 docs 页结构统一：说明 → DemoBlock → Props/Events/Slots → 代码示例（逐步补齐）
- [x] `getting-started.md` 三步集成
- [x] `migration.md`：platform-shared 试点说明

### 2.2 Playground 产品体验

- [x] 侧栏分组与 docs 侧栏一致
- [x] 首页：组件搜索 + 配方入口
- [x] 暗色主题切换（playground）

### 2.3 部署

- [ ] `docs:build` 纳入门禁（需 `@ctrl/tinycolor` 依赖已声明）

### 验收

- [ ] 公开 export 与 docs 页 **1:1**  
- [ ] 新开发者按 getting-started 30 分钟内跑通 ListPage Demo  
- [ ] 文档站可访问

---

## Phase 3：B 级选择性扩展

**目标：** 按 ai 未来需求评估入库，**props 驱动、零业务 API**。  
**版本：** `1.6.0`（minor）  
**工期：** 2–3 周  
**范围：** 仅 `ui/`；**不**在本 Phase 改 ai/editor 消费代码

### 3.1 候选队列（按价值排序）

| 组件 | 来源 | 入库条件 | 默认 |
|------|------|----------|------|
| **BreadcrumbNav** | editor | props 化路由数据，不绑 vue-router | 建议做 |
| **PdfPreviewCard / ExcelPreviewCard** | ai | 纯展示 + 文件 URL/blob props，解析逻辑 inject/ slot | 建议做 |
| **FieldTip** | meeting | 与 HintText API 对齐或合并 | 评估合并 |
| **ConditionBuilder** | editor | 表达式 AST props，无 editor store | 按需 |
| **EnhancedDialog 剩余能力** | editor | 拖拽/全屏若 AppDialog 未覆盖则补 | 按需 |
| UserPicker / RolePicker | flow/meeting | 远程搜索 props 回调 | 延后 |
| AiMentionInput | ai | @引用输入，Chat 专属 | **不进 core** |
| editor 样式 Editors | editor | Spacing/Border/Shadow… | **不进 core**（设计器专属） |

### 3.2 每个 B 级组件流程

1. 在 INVENTORY 标记「拟入库」  
2. 从源项目 **复制 UI 层**，剥离 API/Store  
3. 走完整组件级 DoD（Phase 1 标准）  
4. playground + docs 同 PR  
5. CHANGELOG + minor 发版  

### 验收

- [x] 本 Phase 入库组件 ≤5 个，全部 DoD ✅（BreadcrumbNav、PdfPreviewCard、ExcelPreviewCard）
- [ ] INVENTORY / PLAN 状态同步
- [ ] 发版 `1.6.0`（当前 1.6.1，待发 npm）

---

## Phase 4：主题与发布工程化

**目标：** 长期可维护的发版与主题基线。  
**版本：** `1.6.x`  
**工期：** 1 周  
**范围：** 仅 `ui/`

### 任务

- [x] **暗色主题：** `theme/dark.css` + playground 切换开关；抽检 10 个代表组件（见 `docs/guide/dark-theme.md`）
- [x] **树摇：** 文档补充「单组件 import」示例；`scripts/tree-shake-baseline.mjs` 体积基线
- [x] **AppIcon 策略文档化：** core 与 platform-shared 双轨原因、何时统一（**不在本 Phase 改 shared**）
- [x] **发版 checklist：** 复用 acceptance-checklist + export-dod-audit + CHANGELOG + npm + tag（`RELEASE.md`）
- [x] **peer 锁定：** 继续 pin `element-plus@2.14.2`，禁止顺手升级  

### 验收

- [x] 暗色/树摇 checklist 可勾（原 A6/A7 可选项）
- [x] `RELEASE.md` 发版步骤文档落地  

---

## Phase 5：试点消费（并行轨 · 不阻塞 ui 发版）

**原则：** ui 库迭代 **不等待** 业务仓全量替换；业务仓改动 **独立 PR、独立排期**。

### 5.1 试点范围（仅 ai，最小 diff）

| 优先级 | 动作 | 文件/范围 | 说明 |
|--------|------|-----------|------|
| P0 | 删本地 duplicate，改 import core | ai `common/*` 4 文件、JsonCard、JsonDetailDialog、DocumentPreview*、AiLoadingDots | 9 文件，无业务逻辑变化 |
| P1 | 列表页引入 EmptyState / Skeleton / FilterBar | ai 管理类 views | 体验统一，可选 |
| P2 | Chat 壳层对齐 | Composer / MessageList / SessionSidebar | 保留 22 个 renderer + NodePanel |

### 5.2 明确不做的试点

- editor 删 EmptyState/ErrorBoundary 本地版 → **等 editor 专项**，不跟 ui 发版  
- ua / portal / forum 迁移 → **Out of scope**  
- platform-shared AppIcon 改 re-export → **等 Phase 4 文档决策后**  
- ai 全量 156 组件替换 → **Never（C 级保留本地）**

### 5.3 试点验收

- [ ] ai P0：`pnpm build` 通过，视觉无回归  
- [ ] 试点改动 **不** 作为 `@apform-ui/core` 发版门禁  

---

## 四、版本路线图

| 版本 | 阶段 | 主要内容 |
|------|------|----------|
| **1.4.3** | Phase 0 | TS 修复、版本号同步、三门禁 |
| **1.5.0** | Phase 1 | DoD 100%、Playground 补齐、Vitest ≥40 |
| **1.5.x** | Phase 2 | 文档 1:1、getting-started、部署 |
| **1.6.0** | Phase 3 | B 级 3–5 个组件 |
| **1.6.x** | Phase 4 | 暗色、树摇、RELEASE.md |
| **2.0.0** | 远期 | 仅当有破坏性 API 变更；**非本计划目标** |

---

## 五、执行节奏建议

```text
Week 1     Phase 0 → Phase 1 启动（TS + Demo 审计）
Week 2–3   Phase 1 完成 → 1.5.0 发版
Week 4     Phase 2 文档/product化
Week 5–6   Phase 3 B 级评估与实现
Week 7     Phase 4 工程化 + 1.6.0 发版

并行       Phase 5 ai P0 试点（任意时刻，独立 PR）
```

---

## 六、任务跟踪

实施时在 ui 仓根目录维护勾选进度：

```markdown
## 当前 Sprint
- 阶段：**主迭代已闭合**
- 目标版本：**1.7.0**（发版）
- [x] Phase 0–4 / Phase 6（预览交互 + C1/C2）
- [x] 余量 C3/C4 / Batch5 / 其余 B 级 → **关闭 · 不做**（2026-09-05）
- [x] npm publish `@apform-ui/core@1.7.0` + tag
```

每 Phase 结束：（历史流程，本迭代已结束）

---

## 七、决策记录

| 日期 | 决策 | 理由 |
|------|------|------|
| 2026-08-31 | 库优先，暂停「全平台基建替换」 | ui 已到 A 级覆盖率，继续跨仓替换投入产出比低 |
| 2026-08-31 | EP 100% 文档对齐移出门禁 | 目标是平台积木，不是 EP fork 复刻 |
| 2026-08-31 | editor Fg* / NodePanel 永久不进 core | 运行时与 UI 库职责分离 |
| 2026-08-31 | ai P0 试点与 ui 发版解耦 | 避免双向阻塞 |
| 2026-09-05 | pdfjs/xlsx 为 optional peer | 默认包体轻量，富交互按需安装 |
| 2026-09-05 | **主设计文档闭合**；C3/C4/Batch5/余 B 级一律不做 | 本阶段目标已达成；后续有需求再重新设计 |

---

**文档状态：已闭合。** `@apform-ui/core@1.7.0` 已发布 npm。
