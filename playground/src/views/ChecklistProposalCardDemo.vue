<script setup lang="ts">
/**
 * ChecklistProposalCard 文档示例
 */
import { ChecklistProposalCard } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const basicSource = `<template>
  <ChecklistProposalCard :proposal="{ id, summary, documentTitle, approvalChain, actionItems }" />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="展示文档提取的待办清单与审批链提案。"
      :source="basicSource"
    >
      <ChecklistProposalCard
        :proposal="{
          id: 'p1',
          summary: '根据会议纪要提取的待办与审批项。',
          documentTitle: 'Q3 复盘纪要',
          approvalChain: ['产品', '研发负责人', 'CTO'],
          actionItems: [
            {
              id: 'a1',
              title: '补齐验收用例',
              description: '覆盖登录与 SSO 回跳',
              type: 'todo',
              priority: 'high',
              assignee: '张三',
              deadline: '2026-09-10',
            },
            {
              id: 'a2',
              title: '发布审批',
              description: '确认灰度范围',
              type: 'approval',
              priority: 'medium',
            },
          ],
        }"
      />
    </DemoBlock>
  </div>
</template>
