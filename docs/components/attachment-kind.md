# attachmentKind

附件类型判断与展示辅助。

## 基础用法

```ts
import { isPdf, isImage, fileKind, formatSize } from '@apform-ui/core'

const att = { id: '1', filename: 'report.pdf', mimetype: 'application/pdf' }

isPdf(att)       // true
fileKind(att)    // 'PDF'
formatSize(2048) // '2.0 KB'
```

## API

| 函数 | 说明 |
|------|------|
| `isImage(att)` | 是否图片 |
| `isPdf(att)` | 是否 PDF |
| `isOffice(att)` | 是否 Office 文档 |
| `isPreviewable(att)` | 是否可预览 |
| `fileKind(att)` | 展示用类型标签 |
| `formatSize(bytes?)` | 人类可读大小 |
