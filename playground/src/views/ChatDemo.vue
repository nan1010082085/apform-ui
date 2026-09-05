<script setup lang="ts">
/**
 * ChatDemo — 精简对话布局（完整黄金路径见 ChatRecipe）
 */
import { ref } from 'vue'
import {
  ConversationHeader,
  MessageList,
  Composer,
  type Message,
  type RunStatusView,
} from '@apform-ui/core'

const messages = ref<Message[]>([
  {
    id: 'm1',
    role: 'user',
    content: '你好',
    status: 'COMPLETED',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'm2',
    role: 'assistant',
    content: '你好，我可以帮你设计表单与流程。',
    status: 'COMPLETED',
    createdAt: new Date().toISOString(),
  },
])

const run = ref<RunStatusView>({
  runId: 'r1',
  sessionId: 's1',
  agentId: 'agent',
  runtimeExecutionId: null,
  status: 'COMPLETED',
  errorMessage: null,
  waiting: null,
  startedAt: new Date().toISOString(),
  finishedAt: new Date().toISOString(),
})

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
  <div class="wrap">
    <h2>Chat</h2>
    <p>精简对话布局。完整配方请看「配方 / ChatRecipe」。</p>
    <div class="frame">
      <ConversationHeader title="演示智能体" :has-messages="true" />
      <MessageList :messages="messages" :loading="false" :current-run="run" />
      <Composer :disabled="false" placeholder="输入消息…" @send="onSend" />
    </div>
  </div>
</template>

<style scoped>
.wrap {
  padding: var(--spacing-md, 16px);
}
.frame {
  height: 560px;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color-light, #ebedf3);
  border-radius: 4px;
  overflow: hidden;
  background: var(--bg-color-white, #fff);
}
h2 {
  margin: 0 0 4px;
}
p {
  margin: 0 0 16px;
  color: var(--text-color-secondary, #666);
  font-size: 13px;
}
</style>
