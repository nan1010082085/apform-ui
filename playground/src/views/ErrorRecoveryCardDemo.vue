<script setup lang="ts">
/**
 * ErrorRecoveryCard 文档示例
 */
import { ErrorRecoveryCard } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const basicSource = `<template>
  <ErrorRecoveryCard
    error="节点执行超时：下游 API 无响应"
    node-name="调用审批接口"
    node-type="http"
    :strategies="strategies"
    @select="onSelect"
  />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="节点失败后的恢复策略选择：重试、跳过、回滚等。"
      :source="basicSource"
    >
      <ErrorRecoveryCard
        error="节点执行超时：下游 API 无响应"
        node-name="调用审批接口"
        node-type="http"
        :strategies="[
          {
            value: 'retry',
            label: '重试',
            icon: 'refresh',
            description: '重新执行该节点（已重试 1 次）',
          },
          {
            value: 'skip',
            label: '跳过',
            icon: 'arrow-right',
            description: '跳过该节点，继续执行后续节点',
          },
          {
            value: 'rollback',
            label: '回滚',
            icon: 'refresh-left',
            description: '回滚到上一个检查点',
          },
        ]"
        @select="(s) => console.log('select', s)"
      />
    </DemoBlock>
  </div>
</template>
