<script setup lang="ts">
/**
 * RequirementAnalysisCard 文档示例
 */
import { ref } from 'vue'
import { RequirementAnalysisCard } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const answers = ref<Record<string, string>>({})

const basicSource = `<template>
  <RequirementAnalysisCard
    :analysis="analysis"
    :partial-answers="answers"
    next-question-id="q1"
    @answer="onAnswer"
  />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="需求分析卡片：意图、完整度、建议链路与澄清问题。"
      :source="basicSource"
    >
      <RequirementAnalysisCard
        :analysis="{
          intent: '生成员工入职表单',
          type: 'schema',
          complexity: 'medium',
          completeness: {
            score: 65,
            missing: ['部门字段校验规则'],
            assumptions: ['默认手机号必填'],
          },
          suggestedChain: [
            { agent: '需求分析', description: '澄清字段与校验' },
            { agent: 'Schema 生成', description: '输出 Widget 树' },
          ],
          confirmQuestions: [
            {
              id: 'q1',
              question: '是否需要审批流？',
              required: true,
              options: ['需要', '不需要'],
            },
            {
              id: 'q2',
              question: '其他备注',
              required: false,
            },
          ],
        }"
        :partial-answers="answers"
        next-question-id="q1"
        @answer="(id, v) => (answers[id] = v)"
      />
    </DemoBlock>
  </div>
</template>
