<script setup lang="ts">
/**
 * ProcessingDrawer — 处理详情抽屉
 */
import { ref } from 'vue'
import { ProcessingDrawer, type RunStatusView } from '@apform-ui/core'

const open = ref(false)
const run = ref<RunStatusView>({
  runId: 'r1',
  sessionId: 's1',
  agentId: 'agent',
  runtimeExecutionId: null,
  status: 'RUNNING',
  errorMessage: null,
  waiting: null,
  startedAt: new Date(Date.now() - 8000).toISOString(),
  finishedAt: null,
})
</script>

<template>
  <div class="wrap">
    <h2>ProcessingDrawer</h2>
    <p>查看当前 run 的处理详情。</p>
    <el-button type="primary" @click="open = true">打开抽屉</el-button>
    <ProcessingDrawer v-model="open" :run="run" subtitle="演示智能体" :sending="true" />
  </div>
</template>

<style scoped>
.wrap {
  padding: var(--spacing-md, 16px);
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
