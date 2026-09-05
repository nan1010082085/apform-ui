<script setup lang="ts">
/**
 * AppPagination 分页文档示例
 */
import { ref } from 'vue'
import { AppPagination } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const page = ref(1)
const pageSize = ref(10)
const total = ref(156)

const basicSource = `<template>
  <AppPagination
    v-model:current-page="page"
    v-model:page-size="pageSize"
    :total="total"
  />
</template>`

const compactSource = `<template>
  <AppPagination v-model:current-page="page" :total="total" size="small" />
</template>`

const emptySource = `<template>
  <AppPagination :current-page="1" :total="0" />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="统一分页器，支持双向绑定当前页与每页条数。"
      :source="basicSource"
    >
      <p class="meta">第 {{ page }} 页，每页 {{ pageSize }} 条，共 {{ total }} 条</p>
      <AppPagination v-model:current-page="page" v-model:page-size="pageSize" :total="total" />
    </DemoBlock>

    <DemoBlock
      title="紧凑模式"
      description="size 设为 small 时使用紧凑样式。"
      :source="compactSource"
    >
      <AppPagination v-model:current-page="page" :total="total" size="small" />
    </DemoBlock>

    <DemoBlock
      title="空状态（total=0）"
      description="total 为 0 时分页器自动隐藏。"
      :source="emptySource"
    >
      <AppPagination :current-page="1" :total="0" />
      <p class="meta muted">total 为 0 时分页器自动隐藏</p>
    </DemoBlock>
  </div>
</template>

<style scoped>
.meta {
  margin: 0 0 12px;
  color: #606266;
  font-size: 13px;
}
.muted {
  color: #909399;
}
</style>
