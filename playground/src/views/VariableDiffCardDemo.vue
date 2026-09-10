<script setup lang="ts">
import { VariableDiffCard } from '@apform-ui/core'
</script>

<template>
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
</template>
