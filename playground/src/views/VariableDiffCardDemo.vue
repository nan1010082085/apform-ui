<script setup lang="ts">
/**
 * VariableDiffCard 文档示例
 */
import { VariableDiffCard } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const basicSource = `<template>
  <VariableDiffCard node-name="数据映射" :changes="changes" />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="变量变更 Diff：新增、更新与删除。"
      :source="basicSource"
    >
      <VariableDiffCard
        node-name="数据映射"
        :changes="[
          { type: 'add', name: 'applicant.name', newValue: '张三' },
          {
            type: 'update',
            name: 'applicant.score',
            oldValue: 60,
            newValue: 85,
          },
          { type: 'delete', name: 'temp.flag', oldValue: true },
        ]"
      />
    </DemoBlock>
  </div>
</template>
