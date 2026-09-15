<script setup lang="ts">
/**
 * FlowNodeStripCard 文档示例
 */
import { FlowNodeStripCard } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const basicSource = `<template>
  <FlowNodeStripCard
    title="请假审批流"
    :nodes="nodes"
    primary-action="应用到画布"
  />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="以条带形式预览流程节点序列，可一键应用到画布。"
      :source="basicSource"
    >
      <FlowNodeStripCard
        title="请假审批流"
        :nodes="[
          { label: '开始', type: 'start' },
          { label: '主管审批', type: 'task' },
          { label: '结束', type: 'end' },
        ]"
        primary-action="应用到画布"
      />
    </DemoBlock>
  </div>
</template>
