# 富预览（PDF / Excel）

`@apform-ui/core` 的预览组件默认是**无重依赖壳**，通过 optional peer 启用富交互。

## 安装

```bash
pnpm add pdfjs-dist xlsx
```

`package.json` 中二者均为 `peerDependenciesMeta.optional`。

## 行为

| 组件 | 有 peer | 无 peer |
|------|---------|---------|
| PdfPreviewCard | canvas 翻页 + 缩放 50%–300% | iframe / slot |
| ExcelPreviewCard | `src`/`arrayBuffer` 解析 + 切 sheet | `headers`/`rows` props |
| AttachmentPreviewModal（PDF） | 复用 PdfPreviewCard | 同上回退 |
| DocumentPreviewPanel | 默认内嵌上述卡片 | 同上回退 |

## Message 预览

`MessageBubble` 已内嵌 `AttachmentPreviewModal`：

- 附件列表 / 文档摘要点击即开弹层
- 摘要需匹配 `attachments`（优先 `attachmentId`，其次 filename）
- 仍向外 `emit('preview')` 供宿主旁路

## 示例

```vue
<PdfPreviewCard url="/file.pdf" />
<ExcelPreviewCard src="/book.xlsx" />
<!-- 或纯 props -->
<ExcelPreviewCard
  :sheet-names="['Sheet1']"
  model-value="Sheet1"
  :headers="['A','B']"
  :rows="[['1','2']]"
/>
```
