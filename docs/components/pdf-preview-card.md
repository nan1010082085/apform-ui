# PdfPreviewCard

PDF 预览卡片：默认用 **iframe** 展示 URL，无 `pdfjs` 依赖。复杂鉴权/渲染用 slot。

## 基础用法

```vue
<PdfPreviewCard url="https://example.com/file.pdf" title="报告" />
```

## 自定义渲染

```vue
<PdfPreviewCard :url="pdfUrl">
  <template #default="{ url }">
    <!-- 注入 pdf.js 等自定义 viewer -->
  </template>
</PdfPreviewCard>
```

## Props

| 属性 | 类型 | 说明 |
|------|------|------|
| `url` | `string` | PDF URL |
| `title` | `string?` | iframe title |
| `loading` | `boolean?` | 加载态 |
| `error` | `string \| null?` | 错误信息 |
| `minHeight` | `string?` | 最小高度，默认 `320px` |
