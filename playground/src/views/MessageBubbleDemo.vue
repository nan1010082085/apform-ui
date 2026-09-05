<script setup lang="ts">
/**
 * MessageBubble 单条消息气泡文档示例
 */
import {
  MessageBubble,
  type Message,
  type RunStatusView,
} from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

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

const basicSource = `<template>
  <MessageBubble :message="userMsg" :run="null" :sending="false" />
  <MessageBubble :message="assistantMsg" :run="run" :sending="false" />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="用户 / 助手消息气泡，助手消息可关联 run 状态。"
      :source="basicSource"
    >
      <div class="panel">
        <MessageBubble :message="userMsg" :run="null" :sending="false" />
        <MessageBubble :message="assistantMsg" :run="run" :sending="false" />
      </div>
    </DemoBlock>
  </div>
</template>

<style scoped>
.panel {
  max-width: 720px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
