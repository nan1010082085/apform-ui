<script setup lang="ts">
/**
 * TaskChainBar 文档示例
 */
import { TaskChainBar } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const basicSource = `<template>
  <TaskChainBar :current-index="1" :steps="steps" />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="多 Agent 任务链进度条：已完成 / 进行中 / 待执行。"
      :source="basicSource"
    >
      <TaskChainBar
        :current-index="1"
        :steps="[
          { agent: 'editor', description: '生成表单 Schema', status: 'done' },
          { agent: 'flow', description: '编排审批流程', status: 'running' },
          { agent: 'page', description: '生成页面布局', status: 'pending' },
        ]"
      />
    </DemoBlock>
  </div>
</template>
