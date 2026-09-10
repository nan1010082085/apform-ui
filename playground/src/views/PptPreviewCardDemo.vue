<script setup lang="ts">
import { PptPreviewCard } from '@apform-ui/core'
</script>

<template>
  <PptPreviewCard
    :metadata="{
      title: '季度业务回顾',
      template: 'business',
      totalSlides: 6,
      style: 'professional',
    }"
    :slides="[
      {
        index: 1,
        type: 'title',
        heading: '封面',
        content: ['2026 Q1 业务回顾'],
      },
      {
        index: 2,
        type: 'content',
        heading: '核心指标',
        content: ['营收同比增长 18%', '客户续费率 92%', '新增签约 46 家'],
      },
      {
        index: 3,
        type: 'comparison',
        heading: '同比对比',
        content: ['去年同期营收', '本期营收'],
      },
      {
        index: 4,
        type: 'summary',
        heading: '总结',
        content: ['保持增长', '优化转化漏斗'],
      },
      {
        index: 5,
        type: 'chart',
        heading: '趋势图',
        content: ['月度流水'],
      },
    ]"
    @download="console.log('download')"
  />
</template>
