<script setup lang="ts">
/**
 * TokenUsageCard 文档示例
 */
import { TokenUsageCard } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const basicSource = `<template>
  <TokenUsageCard
    :input-tokens="1200"
    :output-tokens="340"
    :estimated-cost="0.0123"
    model="gpt-4o-mini"
  />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="展示本次对话的 Token 用量与预估费用。"
      :source="basicSource"
    >
      <TokenUsageCard :input-tokens="1200" :output-tokens="340" :estimated-cost="0.0123" model="gpt-4o-mini" />
    </DemoBlock>
  </div>
</template>
