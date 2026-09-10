<script setup lang="ts">
import { DocumentDetailSummaryCard } from '@apform-ui/core'
</script>

<template>
  <DocumentDetailSummaryCard
    :item="{
      documentId: 'd1',
      filename: '入职手册.pdf',
      summary: {
        title: '员工入职手册摘要',
        summary: '涵盖入职流程、材料清单与试用期考核要点。',
        keyPoints: ['需提交身份证与学历证明', '试用期 3 个月'],
        sections: [
          { heading: '流程', content: 'HR 建档 → 部门对接 → 系统开通' },
        ],
      },
    }"
  />
</template>
