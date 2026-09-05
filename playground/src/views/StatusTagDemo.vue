<script setup lang="ts">
/**
 * StatusTag 文档示例 — Element Plus 文档风格
 */
import { StatusTag } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const statuses = [
  'pending',
  'approved',
  'rejected',
  'delegated',
  'active',
  'inactive',
  'draft',
  'published',
  'archived',
  'running',
  'completed',
  'failed',
  'cancelled',
  'waiting',
]

const basicSource = `<template>
  <div class="row">
    <StatusTag v-for="s in statuses" :key="s" :status="s" />
  </div>
</template>

<script setup lang="ts">
import { StatusTag } from '@apform-ui/core'

const statuses = ['pending', 'approved', 'rejected', /* ... */]
<\/script>`

const sizeSource = `<template>
  <StatusTag status="approved" size="small" />
  <StatusTag status="approved" />
  <StatusTag status="approved" size="large" />
</template>`

const customSource = `<template>
  <StatusTag
    status="custom"
    :status-map="{
      custom: { label: '自定义', type: 'primary', effect: 'dark' },
    }"
  />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="使用 status 匹配内置状态映射，展示审批 / 通用 / 流程等预设标签。"
      :source="basicSource"
    >
      <div class="row">
        <StatusTag v-for="s in statuses" :key="s" :status="s" />
      </div>
    </DemoBlock>

    <DemoBlock
      title="不同尺寸"
      description="通过 size 使用 large / default / small。"
      :source="sizeSource"
    >
      <div class="row">
        <StatusTag status="approved" size="small" />
        <StatusTag status="approved" />
        <StatusTag status="approved" size="large" />
      </div>
    </DemoBlock>

    <DemoBlock
      title="自定义状态"
      description="通过 status-map 合并自定义状态到默认映射。"
      :source="customSource"
    >
      <StatusTag
        status="custom"
        :status-map="{
          custom: { label: '自定义', type: 'primary', effect: 'dark' },
        }"
      />
    </DemoBlock>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}
</style>
