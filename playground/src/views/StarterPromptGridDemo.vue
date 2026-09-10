<script setup lang="ts">
import { StarterPromptGrid } from '@apform-ui/core'
</script>

<template>
  <StarterPromptGrid
    :prompts="[
      { text: '帮我创建一个表单', icon: 'document', agent: 'editor' },
      { text: '设计一个审批流程', icon: 'connection', agent: 'flow' },
      { text: '搜索知识库', icon: 'search' },
    ]"
  />
</template>
