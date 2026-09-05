<script setup lang="ts">
/**
 * RunStatusBar — 运行状态条
 */
import { ref } from 'vue'
import { RunStatusBar, type RunStatusView } from '@apform-ui/core'

const run = ref<RunStatusView>({
  runId: 'r1',
  sessionId: 's1',
  agentId: 'agent',
  runtimeExecutionId: null,
  status: 'RUNNING',
  errorMessage: null,
  waiting: null,
  startedAt: new Date(Date.now() - 12000).toISOString(),
  finishedAt: null,
})
</script>

<template>
  <div class="wrap">
    <h2>RunStatusBar</h2>
    <p>展示当前 run 状态与耗时。</p>
    <div class="block">
      <RunStatusBar :run="run" :sending="true" />
    </div>
    <div class="row">
      <el-button size="small" @click="run.status = 'RUNNING'">RUNNING</el-button>
      <el-button size="small" @click="run.status = 'COMPLETED'; run.finishedAt = new Date().toISOString()">COMPLETED</el-button>
      <el-button size="small" @click="run.status = 'FAILED'; run.errorMessage = '示例错误'">FAILED</el-button>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  padding: var(--spacing-md, 16px);
}
.block {
  border: 1px solid var(--border-color-light, #ebedf3);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 12px;
}
.row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
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
