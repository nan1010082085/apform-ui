# Changelog

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
