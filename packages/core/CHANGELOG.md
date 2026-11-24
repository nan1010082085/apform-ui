# Changelog

> `@apform-ui/core` 独立版本日志。完整叙事以 [`../../CHANGELOG.md`](../../CHANGELOG.md) 为准；本文件与 `package.json` version 同步维护。

## 1.22.6 — 2026-11-24

- 文档：peer 表述改为精确依赖
- 同步 core README 版本号与 npm
- 去除「钉死」话术

## 1.22.5 — 2026-11-24

- 审查四线：视觉铁律门禁
- Chat --c-* 归一到 --apf-*
- 19 个浅 doc.ts 补齐
- token 迁移指南

## 1.22.4 — 2026-11-24

- 审查跟进：监控文档去彩条描述
- ApprovalCard/StatCard doc
- AppUserPanel/SuggestionCard 色值对齐品牌 token

## 1.22.3 — 2026-11-24

- 去掉 ApprovalCard/内联审批/LogStream/blockquote 左侧彩条，统一为状态点与克制边框

## 1.22.2 — 2026-11-24

- ServiceGrid/StatCard 去掉左侧彩条，改为状态点与克制边框

## 1.22.1 — 2026-11-24

- 修复 InputNumber 右侧步进上下键高度不均（ThresholdSlider / element-override）

## 1.22.0 — 2026-11-24

### 破坏性变更

- 无。仍兼容 1.21.x 消费方式；`element-plus` 继续钉 `2.14.2`。

### 新增

- npm 包内 `LICENSE`、`sideEffects`、完整 `exports`（含 `./vite` types、`./package.json`）
- 发版辅助：`pnpm scan:sensitive` / `pnpm verify:pack` / `pnpm css:size`；CI 四关与 Dependabot
- 指南与场景页：兼容矩阵、SSR、optional peer、浏览器、Token、FAQ、选型、i18n、a11y；五场景整页拼法
- Top 高频组件 `doc.ts` 深化；`examples/vite-minimal` 试玩模板；`ROADMAP.md` / 运营清单

### 修复

- CONTRIBUTING 与对外发布清单对齐（允许场景指南；禁止内嵌 StackBlitz）

### 废弃

- 无 API 废弃。WorkBuddy 专家包明确后置，不在本版本交付。

## 1.21.3 — 2026-11-19

- 发版流水线：`pnpm release` = publish + 强制部署/校验 pyflow 文档站
- `postpublish` 安全网：裸 npm publish 仍同步文档

## 1.21.2 — 2026-11-19

- 重发 1.21.1（npm 暂存未放行）

## 1.21.1 — 2026-11-19

- Playground：ExpertPicker / CitationBlock 文档页
- 组件 Doc 元数据补充默认可空专家与 playground 路径

## 1.21.0 — 2026-11-18

- 新增 CitationBlock
- 专家回答引用/出处结构化展示

## 1.20.1 — 2026-11-18

- 跟进 1.20.0 npm 暂存未放行
- 重发 ExpertPicker 交付

## 1.20.0 — 2026-11-18

- 新增 Chat ExpertPicker
- 与 ModelPicker 同形态供澄语 Composer 工具行

## 1.19.0 — 2026-10-09

- 可选 peer 未安装时由 Vite 插件解析到空模块，缺包不再让整站在启动阶段失败

## 1.18.3 — 2026-09-22

- ModelPicker 文档：pro/flash 均为全模态

## 1.18.2 — 2026-09-22

### Fixes

- link/text 按钮 hover、MessageList 间距、FlowPreviewShell 溢出裁剪
- `SCHEMA_UI_VERSION` 与 `package.json` 同源 + `check:version`

详见 monorepo `ui/CHANGELOG.md` 同版本条目。
