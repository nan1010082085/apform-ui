<script setup lang="ts">
import { WorkflowRunTimeline } from '@apform-ui/core'
</script>

<template>
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
</template>
