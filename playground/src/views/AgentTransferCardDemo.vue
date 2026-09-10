<script setup lang="ts">
/**
 * AgentTransferCard 文档示例
 */
import { AgentTransferCard } from '@apform-ui/core'
</script>

<template>
  <div class="demo">
    <AgentTransferCard
      from-label="路由"
      to-label="表单专家"
      reason="用户意图为生成表单，移交表单专家处理。"
    />
  </div>
</template>

<style scoped>
.demo {
  max-width: 480px;
}
</style>
