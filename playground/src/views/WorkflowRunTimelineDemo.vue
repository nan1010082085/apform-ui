<script setup lang="ts">
/**
 * WorkflowRunTimeline 文档示例
 */
import { WorkflowRunTimeline } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const basicSource = `<template>
  <WorkflowRunTimeline
    title="智能助手 · 执行中"
    status="running"
    progress-text="1/3"
    :steps="steps"
  >
    <template #step="{ step }">
      <!-- 自定义步骤内容 -->
    </template>
  </WorkflowRunTimeline>
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="工作流运行时间线：步骤状态、进度与插槽扩展。"
      :source="basicSource"
    >
      <div style="max-width: 420px">
        <WorkflowRunTimeline
          title="智能助手 · 执行中"
          status="running"
          progress-text="1/3"
          :steps="[
            { id: '1', label: '手动触发', status: 'success', hint: '' },
            { id: '2', label: 'LLM', status: 'running', hint: '生成回复中…', streaming: true },
            { id: '3', label: '结束', status: 'pending', hint: '等待' },
          ]"
        >
          <template #step="{ step }">
            <span v-if="step.id === '2'" style="font-size: 11px; color: #909399">（slot 示例）</span>
          </template>
        </WorkflowRunTimeline>
      </div>
    </DemoBlock>
  </div>
</template>
