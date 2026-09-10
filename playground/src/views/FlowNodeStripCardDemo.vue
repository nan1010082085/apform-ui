<script setup lang="ts">
import { FlowNodeStripCard } from '@apform-ui/core'
</script>
<template>
  <FlowNodeStripCard
    title="请假审批流"
    :nodes="[
      { label: '开始', type: 'start' },
      { label: '主管审批', type: 'task' },
      { label: '结束', type: 'end' },
    ]"
    primary-action="应用到画布"
  />
</template>
