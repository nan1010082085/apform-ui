<script setup lang="ts">
/**
 * QuestionnaireCard 文档示例
 */
import { ref } from 'vue'
import { QuestionnaireCard } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const answers = ref<Record<string, string>>({})

const basicSource = `<template>
  <QuestionnaireCard
    title="发布前确认"
    description="请确认以下事项后再批准。"
    :questions="questions"
    :answers="answers"
    @answer="onAnswer"
  />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="问卷卡片：必填/选填问题与选项作答。"
      :source="basicSource"
    >
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
    </DemoBlock>
  </div>
</template>
