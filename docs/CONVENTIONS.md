# 组件文档约定（docs CONVENTIONS）

每个公开组件 / composable 的文档页按固定骨架书写，避免再欠债。

## 视觉语言

状态与强调必须克制，禁止「AI 彩条卡片」观感。

1. **禁止**用左侧彩色竖条表达状态：`border-left: Npx solid <status-color>`（N≥2）或独立 `__bar` 色条。
2. 状态只允许：**色点（约 6px）**、**文案色**、**危险微染底边**；健康态保持白底细边框。
3. 禁止「彩条 + 整圈高饱和边 + 重阴影」三重强调。
4. Demo / 指南文案禁止再写「左侧色条」类规格。
5. 新样式只写 **`--apf-*`**；禁止新增 `--c-*`；Layer B（`--color-*` 等）仅作兼容，不在新 Chat/布局样式里再开平行语义。

门禁：`pnpm check:visual`（`scripts/check-visual-rules.mjs`）。

## 页面骨架

1. **Demo**（可交互，含「查看源码」）
2. **Props / Parameters**
3. **Events**
4. **Slots**
5. **Expose**（若有）
6. **边界态**：空数据 / 加载失败 / 超长文本 / 无 optional peer / 断网（能演示的都演示）
7. **相关组件**（`doc.related` 或文内链接）

## 元数据

- 组件旁 `doc.ts`，类型 `ComponentDoc`（`@apform-ui/core/docs`）
- 在 `src/docs/index.ts` 注册
- playground Demo 直接引用 `@apform-ui/core` workspace 源码，**禁止**另写一份假 API

## Demo 规则

- 至少一个「正常路径」示例
- Top 10 / 高频组件至少一组异常态（可用 `EmptyState` / `ErrorBoundary` / `Skeleton` 自演示）
- 文案用中文；组件名、prop 名保持英文

## 场景指南

整页拼法放 `/scenes/*`，命名「场景指南」，不叫 Recipe。见 CONTRIBUTING。
