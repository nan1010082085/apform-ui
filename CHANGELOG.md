# Changelog

## 1.7.0

### Features

- Message 预览链路修复：`MessageBubble` 内嵌 `AttachmentPreviewModal`，摘要传入 `attachments`，支持 `attachmentId` 匹配与不可点 hint
- `AttachmentPreviewModal`：图片缩放/滚轮、真正下载、PDF 走 `PdfPreviewCard`
- `PdfPreviewCard` / `ExcelPreviewCard`：optional peer `pdfjs-dist` / `xlsx` 富交互，无 peer 回退壳
- `DocumentPreviewPanel` 默认接入增强预览卡
- 新增 `AppUserPanel`、`SliderCaptcha`（`fetchCaptcha` 注入）
- 新增 `useClipboard`；`HintText` 支持 `content` prop（FieldTip 兼容）

### Notes

- 版本策略：交互修复可随 1.6.2 patch 思路合并进本 minor；富预览与新组件发 **1.7.0**
- 不改业务仓消费；platform-shared 双轨保留

## 1.6.1

- PdfPreviewCard / ExcelPreviewCard 入库（iframe / props 壳）
