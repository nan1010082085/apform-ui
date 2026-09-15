<script setup lang="ts">
/**
 * TipBanner 文档示例
 */
import { TipBanner } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const basicSource = `<template>
  <TipBanner text="已为你匹配到相近表单，可继续补充字段需求。" />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="轻量提示横幅，用于上下文提示或引导文案。"
      :source="basicSource"
    >
      <TipBanner text="已为你匹配到相近表单，可继续补充字段需求。" />
    </DemoBlock>
  </div>
</template>
