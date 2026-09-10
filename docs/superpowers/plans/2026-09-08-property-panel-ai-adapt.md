# AI / Agent Workflow 节点适配 PropertyPanel 计划

> **Status: CLOSED** — 2026-09-08 已完成并关闭。全部可编辑节点面板已迁 `PropertyPanelHost` + schema；只读/预览可保留 SectionToggle。真相源：`ai/app/.../property-panel/MIGRATION.md`。

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 让 ai/app agent-workflow 节点属性配置基于 core `PropertyPanel` 契约创建；简单字段声明式，复杂控件用自定义 type / slot，逐步取代手写 `FieldRow` 堆叠。

**Architecture:** 每个节点贡献一份 `PropertySection[]`（或 builder），`update` 映射到既有 `updateNodeData(key, value)`。不把节点业务逻辑搬进 core。复杂组件（`ModelOptionSelect`、`VariableReferencePanel`）注册为自定义 field type。

**Tech Stack:** `@apform-ui/core` PropertyPanel、ai/app Vue 3、现有 `AgentNodePanelProps` / emits。

**Spec:** `2026-09-08-property-panel-core.md`（依赖其契约已落地）

## Global Constraints

- 依赖 `@apform-ui/core` ≥ 含 PropertyPanel 的版本；禁止经 `platform-shared` 中转。
- 节点面板文件可保留，但内部优先 schema，避免再复制一套行/区样式。
- 独立配置（非节点：如 invocation、变量面板）同样基于 PropertyPanel 契约，不新造第三套壳。
- 不在首期强行迁移全部 ~47 个面板；先试点再批量。

---

## File Structure（ai/app）

| 路径 | 职责 |
|------|------|
| `src/components/agent-workflow/property-panel/schema/types.ts` | 节点 schema 类型别名（可再导出 core types） |
| `src/components/agent-workflow/property-panel/schema/build*Panel.ts` | 各节点 sections builder |
| `src/components/agent-workflow/property-panel/PropertyPanelHost.vue` | 薄宿主：接 props → PropertyPanel → emit updateNodeData |
| `src/components/agent-workflow/property-panel/custom-fields/*` | 自定义 type 槽位组件 |
| 现有 `panels/*.vue` | 试点改为 Host + schema；复杂节点混合 slot |

---

### Task 1: Host 与自定义 type 约定

- [x] 实现 `PropertyPanelHost.vue`：`sections` + `@update` → `updateNodeData`
- [x] 约定自定义 type 命名：`model-select`、`variable-ref`、`prompt-textarea`（若需额外工具条）
- [x] slot 映射到现有 `ModelOptionSelect` / `VariableReferencePanel`

### Task 2: 试点节点（建议 3 个）

1. **IfNodePanel** — 字段少、易声明式  
2. **LlmNodePanel** — 混合：text/switch/number schema + `model-select` 自定义  
3. **DefaultNodePanel** 或 **EndNodePanel** — 验证通用路径  

对每个试点：

- [x] 写 `buildXxxSections(node): PropertySection[]`
- [x] 面板改为 Host；删重复 FieldRow 手写（保留业务特有 slot）
- [x] 手动点选节点改配置，确认画布 data 更新（builder 单测覆盖 key 契约；Host `@update`→`updateNodeData` 已接线；侧栏基础/连线/工作流设置已 schema 化）

### Task 3: 批量迁移策略

- [x] 按复杂度分级：A 纯基础控件 → 全 schema；B 1～2 自定义 type；C 重度嵌套暂缓  
- [x] 每批 5～8 个节点，保持可回滚（单文件替换）  
- [x] flow 侧「基础属性 / 连线属性」同步改用同一 PropertyPanel（可并行小 PR）

### Task 4: 独立配置（非节点）

- [x] 盘点 agent-workflow 下非 `panels/` 的配置 UI（invocation、模板参数等）  
- [x] 能声明的改 PropertyPanel；必须自定义的只注册 type，不复制分区壳  

### Task 5: 验收

- [x] 试点节点无本地「假 SectionToggle 样式」分叉  
- [x] update 路径与改造前一致（key 名不变）  
- [x] 不引入对 editor PropertyPanel.vue 的依赖  


---

## 与 editor / flow 的关系

| 项目 | 适配方式 |
|------|----------|
| editor | `usePropertySections` → core sections；widget 专用 editor 走 slot |
| ai | 本计划：节点 schema + Host |
| flow | 基础/连线属性 schema；节点特有面板同 ai 分级迁移 |

三端共用 **同一 core PropertyPanel**，各自只写适配与自定义 type。
