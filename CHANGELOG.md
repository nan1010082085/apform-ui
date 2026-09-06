# Changelog

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
