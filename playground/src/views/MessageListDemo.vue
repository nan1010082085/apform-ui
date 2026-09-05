<script setup lang="ts">
/**
 * MessageList — 消息列表
 */
import { ref } from 'vue'
import {
  MessageList,
  type Message,
  type RunStatusView,
} from '@apform-ui/core'

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

const messages = ref<Message[]>([
  {
    id: 'm1',
    role: 'user',
    content: '列出可用字段',
    status: 'COMPLETED',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'm2',
    role: 'assistant',
    content: '当前 Schema 包含 username、email、role 三个字段。',
    status: 'COMPLETED',
    createdAt: new Date().toISOString(),
  },
])
</script>

<template>
  <div class="wrap">
    <h2>MessageList</h2>
    <p>自动滚动到底部的消息列表。</p>
    <div class="frame">
      <MessageList :messages="messages" :loading="false" :current-run="run" :sending="false" />
    </div>
  </div>
</template>

<style scoped>
.wrap {
  padding: var(--spacing-md, 16px);
}
.frame {
  height: 360px;
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
