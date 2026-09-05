<script setup lang="ts">
/**
 * Skeleton 骨架屏文档示例
 */
import { ref } from 'vue'
import { Skeleton, CardGridSkeleton } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const variant = ref('card')

const variantSource = `<template>
  <Skeleton variant="card" :count="3" />
</template>`

const gridSource = `<template>
  <CardGridSkeleton :count="6" />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="类型切换"
      description="variant 支持 card / list / table，count 控制占位数量。"
      :source="variantSource"
    >
      <el-radio-group v-model="variant" style="margin-bottom: 16px">
        <el-radio-button value="card">卡片</el-radio-button>
        <el-radio-button value="list">列表</el-radio-button>
        <el-radio-button value="table">表格</el-radio-button>
      </el-radio-group>
      <Skeleton :variant="variant" :count="3" />
    </DemoBlock>

    <DemoBlock
      title="CardGridSkeleton 卡片网格骨架"
      description="卡片列表加载时的网格占位。"
      :source="gridSource"
    >
      <CardGridSkeleton :count="6" />
    </DemoBlock>
  </div>
</template>
