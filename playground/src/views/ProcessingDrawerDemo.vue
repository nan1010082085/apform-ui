<script setup lang="ts">
/**
 * ProcessingDrawer 文档示例 — 停止会更新 run 状态
 */
import { ref } from 'vue'
import { ProcessingDrawer, type RunStatusView } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const open = ref(false)
const last = ref('')
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

/**
 * 停止当前 run（Demo 内模拟）
 */
function onCancel() {
  last.value = 'cancel'
  run.value = {
    ...run.value,
    status: 'CANCELLED',
    finishedAt: new Date().toISOString(),
  }
}

/**
 * 重置为运行中并打开
 */
function openRunning() {
  run.value = {
    ...run.value,
    status: 'RUNNING',
    finishedAt: null,
    startedAt: new Date(Date.now() - 8000).toISOString(),
  }
  last.value = ''
  open.value = true
}

const basicSource = `<template>
  <el-button type="primary" @click="open = true">打开抽屉</el-button>
  <ProcessingDrawer
    v-model="open"
    :run="run"
    subtitle="演示智能体"
    :sending="true"
    @cancel="onCancel"
  />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="查看当前 run 的处理详情；点「停止」触发 cancel，宿主应更新 run 状态。"
      :source="basicSource"
    >
      <el-button type="primary" @click="openRunning">打开抽屉</el-button>
      <p v-if="last" class="hint">最近事件：{{ last }} · 状态 {{ run.status }}</p>
      <ProcessingDrawer
        v-model="open"
        :run="run"
        subtitle="演示智能体"
        :sending="run.status === 'RUNNING'"
        @cancel="onCancel"
      />
    </DemoBlock>
  </div>
</template>

<style scoped>
.hint {
  margin: 8px 0 0;
  font-size: 13px;
  color: var(--docs-muted, #909399);
}
</style>
