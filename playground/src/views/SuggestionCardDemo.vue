<script setup lang="ts">
/**
 * SuggestionCard 文档示例
 */
import { SuggestionCard } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const basicSource = `<template>
  <SuggestionCard :suggestion="suggestion" />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="优化建议卡片：类型、优先级与目标对象。"
      :source="basicSource"
    >
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
    </DemoBlock>
  </div>
</template>
