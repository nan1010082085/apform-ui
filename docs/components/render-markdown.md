# renderMarkdown

将 Markdown 文本转为安全 HTML（DOMPurify 消毒）。

## 基础用法

```ts
import { renderMarkdown, splitTextAndCodeBlocks } from '@apform-ui/core'

const html = renderMarkdown('# 标题\n\n正文 **加粗**')

const parts = splitTextAndCodeBlocks('说明\n```ts\nconst x = 1\n```')
// [{ type: 'text', ... }, { type: 'code', ... }]
```

## API

| 函数 | 说明 |
|------|------|
| `renderMarkdown(content)` | 返回 HTML 字符串 |
| `splitTextAndCodeBlocks(content)` | 拆分为 text/code 段，供自定义渲染 |

## 使用场景

- Chat `MessageParts` 内部渲染
- ai `TextRenderer` 等协议文本展示
