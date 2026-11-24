# 场景指南：AI 对话界面

入口：`@apform-ui/core/chat` + `chat.css`（不要引 bpmn / vue-flow）。

拼法：`SessionSidebar` + `ConversationHeader` + `MessageList` + `Composer` + `ArtifactGallery` + `RunStatusBar`。

## 最小骨架

```vue
<script setup lang="ts">
import {
  SessionSidebar,
  ConversationHeader,
  MessageList,
  Composer,
  RunStatusBar,
  ArtifactGallery,
} from '@apform-ui/core/chat'
</script>

<template>
  <div class="chat-layout">
    <SessionSidebar :sessions="sessions" @select="onSelect" />
    <main>
      <ConversationHeader :title="title" />
      <RunStatusBar :run="currentRun" />
      <MessageList
        :messages="messages"
        :loading="loading"
        :current-run="currentRun"
        :sending="sending"
        @retry="retry"
      />
      <ArtifactGallery :items="artifacts" @preview="openPreview" />
      <Composer :disabled="sending" @send="onSend" @upload="onUpload" />
    </main>
  </div>
</template>
```

## 消息协议（要点）

- `Message`：`id` 稳定；流式时只改 `content` / `status` / `parts`。
- 附件：`attachments[]`；预览事件由气泡抛出。
- HITL：`resume` / `cancel` 与审批卡片联动。

## 常见坑

- 从 `core` 主包打对话会更重；优先 `core/chat`。
- `useToast` 在拦截器里要用模块级桥接（见 useToast 文档）。
