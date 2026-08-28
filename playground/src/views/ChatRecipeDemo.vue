<script setup lang="ts">
import { ref } from 'vue'
import {
  ConversationHeader,
  SessionSidebar,
  MessageList,
  AttachmentPreviewModal,
  Composer,
  ApprovalCard,
  RunStatusBar,
  ProcessingDrawer,
  LoadingDots,
  type Message,
  type MessageAttachment,
  type Session,
  type RunStatusView,
  type WaitingPayload,
} from '@apform-ui/core'

const sessions = ref<Session[]>([
  {
    id: 's1',
    title: 'Schema 生成',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
])
const activeId = ref('s1')
const messages = ref<Message[]>([
  {
    id: 'm1',
    role: 'user',
    content: '帮我生成一个用户表单',
    status: 'COMPLETED',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'm2',
    role: 'assistant',
    content:
      '好的，这是示例：\n\n```json\n{"type":"form","fields":[{"name":"username"}]}\n```',
    status: 'COMPLETED',
    createdAt: new Date().toISOString(),
    attachments: [
      {
        id: 'a1',
        filename: 'preview.png',
        mimetype: 'image/png',
        url: 'https://via.placeholder.com/640x360.png?text=Preview',
        size: 10240,
      },
    ],
  },
])

const previewOpen = ref(false)
const previewAtt = ref<MessageAttachment | null>(null)
const drawerOpen = ref(false)
const sending = ref(false)

const run = ref<RunStatusView>({
  runId: 'r1',
  sessionId: 's1',
  agentId: 'agent',
  runtimeExecutionId: null,
  status: 'COMPLETED',
  errorMessage: null,
  waiting: null,
  startedAt: new Date(Date.now() - 5000).toISOString(),
  finishedAt: new Date().toISOString(),
})

const waiting = ref<WaitingPayload>({
  prompt: '是否继续执行？',
  fields: [],
  actions: [
    { action: 'approve', label: '同意', style: 'primary' },
    { action: 'reject', label: '拒绝', style: 'danger' },
  ],
  dangerous: false,
})

function onPreview(att: MessageAttachment) {
  previewAtt.value = att
  previewOpen.value = true
}

function onSend(content: string) {
  if (!content.trim()) return
  messages.value.push({
    id: `m${Date.now()}`,
    role: 'user',
    content,
    status: 'COMPLETED',
    createdAt: new Date().toISOString(),
  })
}
</script>

<template>
  <div>
    <h2>对话配方 ChatRecipe</h2>
    <p>SessionSidebar + ConversationHeader + MessageList + Composer + 附件预览</p>

    <div class="demo-section" style="height: 720px; padding: 0; display: flex; overflow: hidden">
      <SessionSidebar
        :sessions="sessions"
        :active-id="activeId"
        style="width: 260px"
        @select="activeId = $event"
        @create="
          sessions.push({
            id: `s${Date.now()}`,
            title: '新会话',
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
        "
        @delete="sessions = sessions.filter((s) => s.id !== $event)"
      />
      <div style="flex: 1; display: flex; flex-direction: column; min-width: 0">
        <ConversationHeader
          title="演示智能体"
          :has-messages="messages.length > 0"
          :processing="sending"
          @toggle-details="drawerOpen = true"
          @create="messages = []"
        />
        <RunStatusBar :run="run" :sending="sending" />
        <MessageList
          :messages="messages"
          :loading="false"
          :current-run="run"
          :sending="sending"
          @preview="onPreview"
        />
        <div style="padding: 0 24px 12px">
          <ApprovalCard :waiting="waiting" :disabled="false" />
          <div style="margin-top: 12px; display: flex; align-items: center; gap: 8px">
            <span>加载中</span>
            <LoadingDots />
          </div>
        </div>
        <Composer :disabled="false" placeholder="输入消息…" @send="onSend" />
      </div>
    </div>

    <AttachmentPreviewModal
      v-model="previewOpen"
      :attachment="previewAtt"
      :gallery="messages.flatMap((m) => m.attachments || [])"
      @update:attachment="previewAtt = $event"
    />
    <ProcessingDrawer v-model="drawerOpen" :run="run" subtitle="演示智能体" />
  </div>
</template>
