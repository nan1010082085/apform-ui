<script setup lang="ts">
/**
 * RunStatusBar 文档示例 — 含停止反馈
 */
import { ref } from 'vue'
import { RunStatusBar, type RunStatusView } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const last = ref('')
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

/**
 * 停止当前 run
 */
function onCancel() {
  last.value = 'cancel'
  run.value = {
    ...run.value,
    status: 'CANCELLED',
    finishedAt: new Date().toISOString(),
  }
}

const basicSource = `<template>
  <RunStatusBar :run="run" :sending="true" @cancel="onCancel" />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="展示当前 run 状态与耗时；点「停止」触发 cancel。下方按钮可切换状态演示。"
      :source="basicSource"
    >
      <div class="panel">
        <RunStatusBar
          :run="run"
          :sending="run.status === 'RUNNING'"
          @cancel="onCancel"
        />
      </div>
      <p v-if="last" class="hint">最近事件：{{ last }}</p>
      <div class="row">
        <el-button
          size="small"
          @click="
            run = {
              ...run,
              status: 'RUNNING',
              finishedAt: null,
              errorMessage: null,
              startedAt: new Date(Date.now() - 12000).toISOString(),
            };
            last = ''
          "
        >
          RUNNING
        </el-button>
        <el-button
          size="small"
          @click="run.status = 'COMPLETED'; run.finishedAt = new Date().toISOString()"
        >
          COMPLETED
        </el-button>
        <el-button
          size="small"
          @click="run.status = 'FAILED'; run.errorMessage = '示例错误'"
        >
          FAILED
        </el-button>
      </div>
    </DemoBlock>
  </div>
</template>

<style scoped>
.panel {
  border: 1px solid #ebedf3;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 12px;
}
.row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.hint {
  margin: 0 0 8px;
  font-size: 13px;
  color: #909399;
}
</style>
