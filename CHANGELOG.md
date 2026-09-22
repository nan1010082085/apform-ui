# Changelog

## 1.18.2

### Docs

- `ModelPicker` / `PromptOptimizeButton`：文档注明库不绑定模型；平台侧默认对话为 `mimo-v2.6-flash`
- playground `ModelPickerDemo`：示例列表对齐 Mimo Flash（全模态）/ Pro（编码）与 DeepSeek Flash

## 1.18.1

### Docs

- `CharacterViewsPreview` / `NodeResultPreview`：补 `doc.ts` 并登记 `componentDocs`
- playground：新增 `/character-views-preview`（同页演示直连组件与 `NodeResultPreview` + `character-views`）

## 1.18.0

### Features

- `resolveResultBlocks` / `NodeResultPreview`：新增 `character-views` 块，按角色名分组展示正/侧/背三视图（不再拍平进 `media` 网格）
- `CharacterViewsPreview`：角色名 + 带「正/侧/背」标签的缩略图行

### Consumers

- workflow-agent-xingyun：角色 → 三视图气泡按角色分组展示

## 1.17.3

### Docs

- 架构定位文档 + README/getting-started 明确 EP 能力面与 token 视觉

## 1.17.2

### Improvements

- `GeneratingPlaceholder`：出图占位更大、shimmer/脉冲更明显，默认比例 `4 / 3`

## 1.17.1

### Improvements

- （占位版本号；视觉增强见 1.17.2）

## 1.17.0

### Features

- `GeneratingPlaceholder`：对话「生成中」占位（`image` / `text` / `generic`），shimmer + 三点动画，避免进度文案当正文

### Consumers

- workflow-agent-xingyun：文生图 RUNNING 态接入

## 1.16.0

### Features

- `Composer.actionShape` / `PromptOptimizeButton.shape`: `square` | `round`，应用侧控制操作按钮外形（平台方块 / 终端圆形）

### Consumers

- schema-platform AI：`action-shape="square"` / `shape="square"`
- workflow-agent-xingyun：默认 `round`


## 1.15.1

### Fixes

- `NodeResultPreview`：显式传入空 `blocks` 时不再回落解析 `data`，避免应用侧过滤后误显「无输出」

## 1.15.0

### Features

- `resolveResultBlocks` / `NodeResultPreview` 支持应用侧可控预览：
  - `audience?: 'operator' | 'user'`（默认 `operator`，兼容节点调试）
  - `includeLeftoverFields` / `includeFallbackFieldTables` 细粒度覆盖
  - `audience: 'user'` 时不输出「其他字段」与 images 等 fallback 元数据表，仅保留 media / 正文 / 剧本等对人可读结果
- `extractBusinessResultTables` 新增 `includeFallbackFieldTables` 选项

### Consumers

- workflow-agent-xingyun：聊天气泡 `audience: 'user'`

## 1.14.2

### Fixes

- `normalizeNodeOutput`：有 `imageUrls` 时跳过 `portraitUrls` / 三视图镜像字段，避免落库后 CDN 与平台 URL 同图双份预览
- 视频形态优先采平台 `mediaUrls`（video hint），避免 CDN `videoUrl` 与平台 URL 双份且误判为图片

### Consumers

- schema-platform：`editor` / `flow` / `ua` / `ai/app` → `@apform-ui/core@^1.14.2`

## 1.13.0

### Features

- 新增 `PromptOptimizeButton`：提示词优化 ✨ 纯 UI 按钮
- `Composer` 支持 `promptOptimize: { request, tooltip? }`，注入后在发送左侧渲染默认 ✨
- 新增 `#optimize` scoped slot（`text / setText / disabled / loading / optimize`）
- `#actions` scoped 透出 `canSend / send / optimizeProps`
- 新增 `optimize-error` 事件；`defineExpose({ getText, setText, optimize })`

### Consumers

- schema-platform：`editor` / `flow` / `ua` / `ai/app` / `forum-app` → `@apform-ui/core@^1.13.0`
- workflow-agent-xingyun / workflow-agent-chat → `@apform-ui/core@^1.13.0`

## 1.11.1

### Docs

- 根 README 与 `packages/core/README.md` 对齐多入口、peers、组件清单与样式路径
- 新增 `docs/guide/getting-started.md`、`docs/guide/migration.md`
- playground Overview 标明三入口用法；补 `BpmnFlowPreviewCanvas` API 元数据

### Fixes

- 导出 `@apform-ui/core/chat.css`、`@apform-ui/core/bpmn.css`（产物此前已构建，此前未进 `exports`）

## 1.11.0

### Features

- 多入口拆分：`@apform-ui/core`（通用）、`@apform-ui/core/chat`（对话轻量）、`@apform-ui/core/bpmn`（BPMN 预览）
- `BpmnFlowPreviewCanvas` 迁出主入口，仅从 `/bpmn` 导出；`@vue-flow/*` 为 optional peer
- 对话场景可避免将 vue-flow 打进业务包

### Notes

- 消费者：对话请改从 `@apform-ui/core/chat` 引入；BPMN 请改从 `@apform-ui/core/bpmn` 并安装 vue-flow peers
- 样式：`1.11.0` 可用 `style.css`；按入口拆分的 `chat.css` / `bpmn.css` 请升至 `^1.11.1`

## 1.8.0

### Features

- 监控组件套件（Vigil）：`TimeRangePicker`、`MetricChart`、`StatCard`、`SeverityBadge`、`ServiceGrid`、`StatusTimeline`、`LogStream`、`ThresholdSlider`
- 新增 `useRealtime`（同 URL 复用 WS、指数退避、心跳、按 projectId 过滤）
- 新增 `CHART_COLORS` / `formatMetricValue`；`echarts` 为 optional peer
- 设计令牌：`--apf-*` 为规范名，`--color-*` 等为兼容别名

### Fixes

- MetricChart：loading 结束后正确初始化；`replaceMerge: ['series']`；清理 ResizeObserver
- LogStream：unshift 滚动补偿；固定行高 + 侧栏展示 payload；`reach-bottom` 加载更早
- useRealtime：实例 handler 卸载清理；多 project 订阅隔离
- TimeRangePicker：自定义面板回填；StatCard：仅无 `to` 时 emit click

### Docs

- `docs/guide/monitoring-components.md` 规格文档
- playground「监控」分组 + demos
- README 组件清单 / 主题令牌说明更新

### Notes

- npm 消费请升至 `^1.8.0`；MetricChart 需自行安装 `echarts`

## 1.7.0

### Features

- Message 预览链路修复：`MessageBubble` 内嵌 `AttachmentPreviewModal`，摘要传入 `attachments`，支持 `attachmentId` 匹配与不可点 hint
- `AttachmentPreviewModal`：图片缩放/滚轮、真正下载、PDF 走 `PdfPreviewCard`
- `PdfPreviewCard` / `ExcelPreviewCard`：optional peer `pdfjs-dist` / `xlsx` 富交互，无 peer 回退壳
- `DocumentPreviewPanel` 默认接入增强预览卡
- 新增 `AppUserPanel`、`SliderCaptcha`（`fetchCaptcha` 注入）
- 新增 `useClipboard`；`HintText` 支持 `content` prop（FieldTip 兼容）

### Docs

- **主迭代设计文档闭合**（2026-09-05）：C3/C4、Batch5、其余未入库 B 级一律不做；后续另开设计

### Notes

- 消费者：同仓 `file:` 直连源码；会议系统等 npm 消费请升至 `^1.7.0`

## 1.6.1

- PdfPreviewCard / ExcelPreviewCard 入库（iframe / props 壳）
