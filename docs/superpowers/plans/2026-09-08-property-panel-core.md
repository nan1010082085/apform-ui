# PropertyPanel 沉入 @apform-ui/core 落地计划

> **Status: CLOSED** — 2026-09-08 已完成并关闭。交付：`@apform-ui/core@1.10.29` PropertyPanel/PropertyField、playground、editor/flow/ua 适配；详见同目录 AI 适配与样式审计计划。

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 editor 属性配置 UX 沉淀为库内独立、schema 驱动的 `PropertyPanel`，供 editor / ai / flow / ua 复用，且不耦合 widget store。

**Architecture:** core 只收「分区壳 + 类型字段渲染 + 更新事件」；域数据（widget / 节点 / 表单模型）由各项目适配层把业务对象映射为 `PropertySection[]`。复杂嵌套编辑器分阶段下沉；首期内置基础 field types，自定义 type 走 slot / 注册表。

**Tech Stack:** Vue 3.5、Element Plus 2.14.2、`@apform-ui/core` 既有 `FieldRow` / `SectionToggle` / `AppIcon`、Vitest。

**Spec:** 本文件 + `2026-09-08-property-panel-ai-adapt.md`（AI 适配）

## Global Constraints

- `platform-shared` 仍为平台共享真相源；**禁止**把 `@apform-ui` thin re-export 进 `platform-shared`。
- core 组件**禁止**依赖 `editor` / `ai` / `flow` / Pinia stores / widget registry。
- editor 可不完全替换布局壳；属性配置引擎以 core 为准。
- ua 可全面消费 core。
- 控件尺寸在库内统一（默认 `small` / token），禁止组件内随意散落不一致 size。
- Chat / Artifact 业务侧避免局部 SCSS 覆盖导致视觉分叉；PropertyPanel 样式以 scoped + design tokens 为准。

---

## File Structure

| 路径 | 职责 |
|------|------|
| `packages/core/src/components/PropertyPanel/types.ts` | `PropertyItem` / `PropertySection` / 内置 type 联合类型 |
| `packages/core/src/components/PropertyPanel/PropertyPanel.vue` | schema 分区渲染 + SectionToggle + update 事件 |
| `packages/core/src/components/PropertyPanel/index.ts` | barrel |
| `packages/core/src/components/PropertyPanel/doc.ts` | playground 文档元数据 |
| `packages/core/src/components/PropertyField/PropertyField.vue` | 类型驱动控件；布局复用 FieldRow |
| `packages/core/src/components/PropertyField/index.ts` | barrel |
| `packages/core/src/components/PropertyField/doc.ts` | 文档 |
| `packages/core/src/index.ts` / `docs/index.ts` | 导出 |
| `packages/core/src/__tests__/propertyPanel.spec.ts` | 契约单测 |
| `playground/` demo（可选同 PR） | 可交互演示 |

**明确不进首期的文件（仍留 editor）：** OptionsEditor、Spacing/Border 等 widget 专用嵌套编辑器、Event/Linkage 对话框、`usePropertySections`（editor 适配层保留）。

---

## 契约（首期）

```ts
type PropertyFieldType =
  | 'text' | 'textarea' | 'number' | 'switch'
  | 'color' | 'select' | 'remote-select' | 'json' | 'color-array'
  | string // 自定义：走 slot `field-${type}` 或 resolveField

interface PropertyItem {
  key: string
  label: string
  type: PropertyFieldType
  value: unknown
  desc?: string
  placeholder?: string
  options?: Array<{ label: string; value: string | number | boolean }>
  remoteUrl?: string
  labelField?: string
  valueField?: string
  visibleOn?: string // 首期由消费方过滤；库可提供可选 helper
  min?: number
  max?: number
  required?: boolean
}

interface PropertySection {
  key: string
  label: string
  items: PropertyItem[]
  defaultOpen?: boolean
}

// PropertyPanel
// props: sections, fetchRemoteOptions?: (url, labelField, valueField) => Promise<options>
// emit: update: [payload: { sectionKey, key, value }]
// slots: field-${type}(item, update)
```

---

### Task 1: 类型与 PropertyField（内置控件）

**Files:**
- Create: `PropertyField/*`, `PropertyPanel/types.ts`

- [x] 定义 `PropertyItem` / `PropertySection` / 内置 type
- [x] 实现 `PropertyField`：用 `FieldRow` 包一层；内置 types 对齐 editor `PropertyField`
- [x] `remote-select` 仅通过 prop/inject 的 `fetchRemoteOptions` 拉数，无硬编码 API
- [x] 统一控件 `size` 为库常量（如 `CONTROL_SIZE = 'small'`）
- [x] Vitest：各 type 挂载 + `update` 事件

### Task 2: 独立 PropertyPanel 壳

**Files:**
- Create: `PropertyPanel/PropertyPanel.vue`

- [x] 按 `sections` 渲染 `SectionToggle`，项走 `PropertyField`
- [x] 未知 type：优先具名 slot，否则 fallback text
- [x] `update` 冒泡带 `sectionKey` + `key` + `value`
- [x] 空 sections / 空面板 Empty 态可选（可用既有 EmptyState）

### Task 3: 导出、文档、版本

- [x] `index.ts` / `docs/index.ts` 注册
- [x] playground 或 doc 示例：3 个 section、含 select/switch/textarea
- [x] bump `@apform-ui/core` patch（实现完成后）
- [x] `pnpm test` 在 `packages/core` 通过

### Task 4: 消费方边界（本计划只定义，实现可另开）

- [x] **editor**：新增适配层 `widget → PropertySection[]`（复用/改造 `usePropertySections`），壳改调 core；widget 专用 type 继续本地 slot
- [x] **flow**：基础节点属性改 schema → core PropertyPanel
- [x] **ai**：见 AI 适配计划
- [x] **ua**：表单配置页优先直接用 core PropertyPanel
- [x] **platform-shared**：不 re-export；若需跨仓业务 helper，另议，禁止塞 UI 壳

### Task 5: 后续下沉（不阻塞首期）

- [x] 通用嵌套：`options` / `array-editor` / `number-array`
- [x] 样式类编辑器：border / spacing / shadow — **决定仍留 editor-local**：完整 Border/Spacing/Shadow 控件依赖 widget style 补丁语义与多字段联动，评估过重，不进 core；消费方继续用本地 slot / 编辑器组件
- [x] `visibleOn` 安全表达式求值 helper（`evalVisibleOn` / `filterVisiblePropertyItems`，无 eval；Panel 可选 `values` 自动过滤）
- [x] 按钮 / 控件尺寸 token 全局收口（`--apf-control-size` 与 `PROPERTY_CONTROL_SIZE` 对齐）

---

## 验收证据

1. 计划文件存在于 `ui/docs/superpowers/plans/`
2. core 可 `import { PropertyPanel, PropertyField } from '@apform-ui/core'`
3. 单测覆盖基础 types 与 update
4. 组件内无 editor/ai/flow 路径引用
