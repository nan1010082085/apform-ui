<script setup lang="ts">
/**
 * MessageBubble — 单条消息气泡
 */
import {
  MessageBubble,
  type Message,
  type RunStatusView,
} from '@apform-ui/core'

const run: RunStatusView = {
  runId: 'r1',
  sessionId: 's1',
  agentId: 'agent',
  runtimeExecutionId: null,
  status: 'COMPLETED',
  errorMessage: null,
  waiting: null,
  startedAt: new Date(Date.now() - 3000).toISOString(),
  finishedAt: new Date().toISOString(),
}

const userMsg: Message = {
  id: 'm1',
  role: 'user',
  content: '帮我生成一个用户表单 Schema',
  status: 'COMPLETED',
  createdAt: new Date().toISOString(),
}

const assistantMsg: Message = {
  id: 'm2',
  role: 'assistant',
  content: '好的，这是示例：\n\n```json\n{"type":"form","fields":[{"name":"username"}]}\n```',
  status: 'COMPLETED',
  createdAt: new Date().toISOString(),
}
</script>

<template>
  <div class="wrap">
    <h2>MessageBubble</h2>
    <p>用户 / 助手消息气泡。</p>
    <div class="block">
      <MessageBubble :message="userMsg" :run="null" :sending="false" />
      <MessageBubble :message="assistantMsg" :run="run" :sending="false" />
    </div>
  </div>
</template>

<style scoped>
.wrap {
  padding: var(--spacing-md, 16px);
  background: var(--bg-color-page, #f5f6fa);
}
.block {
  max-width: 720px;
  padding: 16px;
  background: var(--bg-color-white, #fff);
  border: 1px solid var(--border-color-light, #ebedf3);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 12px;
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
