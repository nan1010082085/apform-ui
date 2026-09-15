<script setup lang="ts">
/**
 * AgentTransferCard 文档示例
 */
import { AgentTransferCard } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const basicSource = `<template>
  <AgentTransferCard
    from-label="路由"
    to-label="表单专家"
    reason="用户意图为生成表单，移交表单专家处理。"
  />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="展示 Agent 之间的移交：来源、目标与移交原因。"
      :source="basicSource"
    >
      <div class="demo">
        <AgentTransferCard
          from-label="路由"
          to-label="表单专家"
          reason="用户意图为生成表单，移交表单专家处理。"
        />
      </div>
    </DemoBlock>
  </div>
</template>

<style scoped>
.demo {
  max-width: 480px;
}
</style>
