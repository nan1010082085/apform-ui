<script setup lang="ts">
import { SuggestionCard } from '@apform-ui/core'
</script>

<template>
  <SuggestionCard
    :suggestion="{
      id: 's1',
      type: 'optimization',
      title: '合并重复校验规则',
      description: '手机号与邮箱校验可共用同一套规则配置。',
      priority: 'high',
      targetName: '入职表单',
    }"
  />
</template>
