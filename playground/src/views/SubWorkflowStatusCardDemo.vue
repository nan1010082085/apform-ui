<script setup lang="ts">
import { SubWorkflowStatusCard } from '@apform-ui/core'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 480px">
    <SubWorkflowStatusCard
      workflow-name="入职审批子流程"
      status="running"
      :node-count="5"
      :completed-nodes="2"
      @detail="console.log('detail')"
    />
    <SubWorkflowStatusCard
      workflow-name="报销校验"
      status="error"
      :duration-ms="2340"
      error="校验服务返回 500"
      :node-count="3"
      :completed-nodes="1"
      @detail="console.log('detail')"
      @retry="console.log('retry')"
    />
  </div>
</template>
