<script setup lang="ts">
/**
 * StarterPromptGrid 文档示例
 */
import { StarterPromptGrid } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const basicSource = `<template>
  <StarterPromptGrid :prompts="prompts" />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="空态启动提示词网格，点击后可交给业务侧发起对话。"
      :source="basicSource"
    >
      <StarterPromptGrid
        :prompts="[
          { text: '帮我创建一个表单', icon: 'document', agent: 'editor' },
          { text: '设计一个审批流程', icon: 'connection', agent: 'flow' },
          { text: '搜索知识库', icon: 'search' },
        ]"
      />
    </DemoBlock>
  </div>
</template>
