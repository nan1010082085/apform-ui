# 场景指南：文件预览中心

按后端 `type` / `mimetype` 分发：

| kind / type | 组件 |
|-------------|------|
| pdf | `PdfPreviewCard`（需 `pdfjs-dist`） |
| excel / sheet | `ExcelPreviewCard`（需 `xlsx`） |
| image | `ImagePreviewCard` |
| video | `VideoPreviewCard` |
| text / markdown | `TextPreviewCard` |
| 混合列表 | `DocumentPreview` / `ArtifactGallery` |

## 后端约定（建议）

```json
{
  "id": "doc_1",
  "name": "报价单.pdf",
  "kind": "pdf",
  "url": "https://…/file",
  "mimetype": "application/pdf"
}
```

缺 peer 时富预览降级为下载卡，不阻断整页。宿主用 `apformOptionalPeers()`。
