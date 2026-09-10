<script setup lang="ts">
import { TaskChainBar } from '@apform-ui/core'
</script>

<template>
  <TaskChainBar
    :current-index="1"
    :steps="[
      { agent: 'editor', description: '生成表单 Schema', status: 'done' },
      { agent: 'flow', description: '编排审批流程', status: 'running' },
      { agent: 'page', description: '生成页面布局', status: 'pending' },
    ]"
  />
</template>
