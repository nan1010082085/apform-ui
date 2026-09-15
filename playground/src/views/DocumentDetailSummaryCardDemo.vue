<script setup lang="ts">
/**
 * DocumentDetailSummaryCard 文档示例
 */
import { DocumentDetailSummaryCard } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const basicSource = `<template>
  <DocumentDetailSummaryCard :item="{ documentId, filename, summary }" />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="展示文档摘要：标题、要点与分段内容。"
      :source="basicSource"
    >
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
    </DemoBlock>
  </div>
</template>
