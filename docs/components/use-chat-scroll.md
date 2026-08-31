# useChatScroll

聊天消息列表滚动管理：自动滚动到底部、检测是否在底部。

## 基础用法

```ts
import { ref } from 'vue'
import { useChatScroll } from '@apform-ui/core'

const listRef = ref<HTMLElement | null>(null)
const { scrollToBottom, isAtBottom, autoScrollEnabled, disableAutoScroll } = useChatScroll({
  containerRef: listRef,
  autoScroll: true,
})

// 新消息后强制滚到底
await scrollToBottom(true)

// 用户上滑阅读历史时关闭自动滚动
disableAutoScroll()
```

## API

| 成员 | 说明 |
|------|------|
| `scrollToBottom(force?)` | 滚到底部；`force=false` 时尊重 autoScroll 开关 |
| `autoScrollEnabled` | 是否启用自动滚动 |
| `isAtBottom` | 是否在底部附近 |
| `enableAutoScroll` / `disableAutoScroll` | 开关自动滚动 |
