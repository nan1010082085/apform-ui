<script setup lang="ts">
import { ref } from 'vue'
import { LogStream, type LogEntry } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const levels = ['debug', 'info', 'warn', 'error'] as const
const logs = ref<LogEntry[]>(
  Array.from({ length: 200 }, (_, i) => ({
    id: i,
    timestamp: new Date(Date.now() - i * 15_000).toISOString(),
    level: levels[i % 4],
    service: ['api', 'worker', 'gateway'][i % 3],
    message: `Sample log message #${i} with keyword error rate`,
    payload: i % 5 === 0 ? { code: 500, detail: 'timeout' } : undefined,
  })),
)
</script>

<template>
  <DemoBlock title="日志流" description="虚拟滚动 + 高亮">
    <LogStream :logs="logs" :height="360" highlight="error" />
  </DemoBlock>
</template>
