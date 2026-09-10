<script setup lang="ts">
import { ref } from 'vue'
import { QuestionnaireCard } from '@apform-ui/core'

const answers = ref<Record<string, string>>({})
</script>
<template>
  <QuestionnaireCard
    title="发布前确认"
    description="请确认以下事项后再批准。"
    :questions="[
      { id: 'q1', question: '是否已完成回归测试？', required: true, options: ['是', '否'] },
      { id: 'q2', question: '备注', options: [] },
    ]"
    :answers="answers"
    @answer="(id, v) => (answers[id] = v)"
  />
</template>
