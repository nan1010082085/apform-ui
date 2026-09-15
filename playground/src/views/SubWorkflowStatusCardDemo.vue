<script setup lang="ts">
/**
 * SubWorkflowStatusCard 文档示例
 */
import { SubWorkflowStatusCard } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const basicSource = `<template>
  <SubWorkflowStatusCard
    workflow-name="入职审批子流程"
    status="running"
    :node-count="5"
    :completed-nodes="2"
    @detail="onDetail"
  />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="子流程状态卡片：运行中、失败及重试入口。"
      :source="basicSource"
    >
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
    </DemoBlock>
  </div>
</template>
