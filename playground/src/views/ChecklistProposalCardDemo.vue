<script setup lang="ts">
import { ChecklistProposalCard } from '@apform-ui/core'
</script>

<template>
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
</template>
