<script setup lang="ts">
/**
 * CardGridSkeleton 卡片网格骨架文档示例
 */
import { CardGridSkeleton } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const defaultSource = `<template>
  <CardGridSkeleton :count="6" />
</template>`

const noThumbSource = `<template>
  <CardGridSkeleton :count="3" :show-thumb="false" />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="默认样式"
      description="卡片列表加载占位，count 控制卡片数量。"
      :source="defaultSource"
    >
      <CardGridSkeleton :count="6" />
    </DemoBlock>

    <DemoBlock
      title="无缩略图"
      description="show-thumb 设为 false 时隐藏缩略图占位。"
      :source="noThumbSource"
    >
      <CardGridSkeleton :count="3" :show-thumb="false" />
    </DemoBlock>
  </div>
</template>
