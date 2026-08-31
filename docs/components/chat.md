# Chat 对话组件

> @apform-ui/core 提供的完整对话组件套件，包括消息列表、消息气泡、输入框等。

## 组件列表

### 基础组件

- **MessageBubble** - 消息气泡
- **MessageList** - 消息列表
- **Composer** - 消息输入框
- **RunStatusBar** - 运行状态栏
- **ApprovalCard** - 审批确认卡

### 消息渲染

- **MessageParts** - 消息段渲染
- **MessageAttachmentList** - 附件列表
- **DocumentSummaryList** - 文档摘要列表
- **AttachmentPreviewModal** - 附件预览

### 会话管理

- **SessionSidebar** - 会话侧栏
- **ProcessingDrawer** - 处理抽屉
- **ConversationHeader** - 对话顶栏

### 选择器

- **AssistantPicker** - 智能体选择器
- **ModelPicker** - 模型选择器

## 基础用法

```vue
<template>
  <div class="chat-container">
    <SessionSidebar
      :sessions="sessions"
      :active-id="activeSessionId"
      @select="onSessionSelect"
    />
    <div class="chat-main">
      <ConversationHeader
        :title="currentSession?.title"
        :has-messages="messages.length > 0"
      />
      <MessageList
        :messages="messages"
        :loading="loading"
      />
      <Composer
        :disabled="sending"
        @send="onSend"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  SessionSidebar,
  ConversationHeader,
  MessageList,
  Composer
} from '@apform-ui/core'

const sessions = ref([])
const activeSessionId = ref(null)
const messages = ref([])
const loading = ref(false)
const sending = ref(false)

function onSessionSelect(sessionId) {
  activeSessionId.value = sessionId
  // 加载会话消息
}

function onSend(content) {
  // 发送消息
}
</script>
```

## 属性

### MessageBubble

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| message | 消息对象 | Message | - |
| loading | 是否加载中 | boolean | false |

### MessageList

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| messages | 消息列表 | Message[] | [] |
| loading | 是否加载中 | boolean | false |
| current-run | 当前运行状态 | RunStatusView | - |
| sending | 是否发送中 | boolean | false |

### Composer

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| disabled | 是否禁用 | boolean | false |
| placeholder | 占位符 | string | '输入消息...' |

## 事件

### MessageBubble

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| preview | 预览附件 | (attachment: MessageAttachment) => void |

### MessageList

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| preview | 预览附件 | (attachment: MessageAttachment) => void |

### Composer

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| send | 发送消息 | (content: string) => void |

## 插槽

### ConversationHeader

| 插槽名 | 说明 |
|--------|------|
| actions | 操作按钮 |

## 示例

### 完整对话示例

```vue
<template>
  <div style="height: 600px; display: flex;">
    <SessionSidebar
      :sessions="sessions"
      :active-id="activeId"
      style="width: 260px;"
      @select="activeId = $event"
      @create="onCreateSession"
    />
    <div style="flex: 1; display: flex; flex-direction: column;">
      <ConversationHeader
        :title="currentSession?.title"
        :has-messages="messages.length > 0"
        :processing="sending"
      />
      <MessageList
        :messages="messages"
        :loading="loading"
        @preview="onPreview"
      />
      <Composer
        :disabled="sending"
        @send="onSend"
      />
    </div>
    <AttachmentPreviewModal
      v-model="previewOpen"
      :attachment="previewAttachment"
    />
  </div>
</template>
```

### 带审批的对话

```vue
<template>
  <div>
    <MessageList :messages="messages" />
    <ApprovalCard
      :waiting="waitingPayload"
      :disabled="false"
      @approve="onApprove"
      @reject="onReject"
    />
  </div>
</template>
```
