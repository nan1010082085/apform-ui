<script setup lang="ts">
/**
 * CitationBlock 引用出处块文档示例
 */
import { CitationBlock, type CitationItem } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const legalItems: CitationItem[] = [
  {
    title: '中华人民共和国劳动合同法',
    subtitle: '第十九条',
    status: '有效',
    excerpt: '劳动合同期限三个月以上不满一年的，试用期不得超过一个月……最长不得超过六个月。',
  },
]

const medicalItems: CitationItem[] = [
  {
    title: '二甲双胍健康教育要点（公开知识样例）',
    subtitle: '说明书 / 医嘱',
    excerpt: '具体用法用量必须以药品说明书与医师处方为准，不构成用药建议。',
  },
]

const basicSource = `<template>
  <CitationBlock :items="items" heading="依据与出处" />
</template>

<script setup>
const items = [
  {
    title: '中华人民共和国劳动合同法',
    subtitle: '第十九条',
    status: '有效',
    excerpt: '试用期最长不得超过六个月。',
  },
]
<\/script>`

const medicalSource = `<CitationBlock :items="medicalItems" heading="出处" />`
const denseSource = `<CitationBlock :items="legalItems" dense />`
</script>

<template>
  <div>
    <DemoBlock
      title="法律引用"
      description="结构化展示法规全称、条号、时效与摘录。纯 props，不解析模型正文；由业务从 RAG / skill 结果组装。"
      :source="basicSource"
    >
      <CitationBlock :items="legalItems" />
    </DemoBlock>

    <DemoBlock
      title="医疗出处"
      description="指南/说明书出处形态；可与法律块共用同一组件。"
      :source="medicalSource"
    >
      <CitationBlock :items="medicalItems" heading="出处" />
    </DemoBlock>

    <DemoBlock
      title="紧凑模式"
      description="dense 用于气泡旁摘要 chip。"
      :source="denseSource"
    >
      <CitationBlock :items="legalItems" dense />
    </DemoBlock>
  </div>
</template>
