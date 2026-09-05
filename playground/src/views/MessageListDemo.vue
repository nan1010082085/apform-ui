<script setup lang="ts">
/**
 * MessageList 消息列表文档示例
 */
import { ref } from 'vue'
import {
  MessageList,
  type Message,
  type RunStatusView,
} from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

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

const basicSource = `<template>
  <MessageList
    :messages="messages"
    :loading="false"
    :current-run="run"
    :sending="false"
  />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="自动滚动到底部的消息列表。"
      :source="basicSource"
    >
      <div class="frame">
        <MessageList :messages="messages" :loading="false" :current-run="run" :sending="false" />
      </div>
    </DemoBlock>
  </div>
</template>

<style scoped>
.frame {
  height: 360px;
  border: 1px solid #ebedf3;
  border-radius: 4px;
  overflow: hidden;
}
</style>
