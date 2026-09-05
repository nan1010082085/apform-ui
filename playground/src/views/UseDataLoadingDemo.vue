<script setup lang="ts">
/**
 * useDataLoading 异步 loading 状态文档示例
 */
import { useDataLoading } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const { loading, error, withLoading, reset } = useDataLoading()

/**
 * 模拟成功请求
 */
async function runOk() {
  await withLoading(async () => {
    await new Promise((r) => setTimeout(r, 400))
    return 'ok'
  })
}

/**
 * 模拟失败请求
 */
async function runFail() {
  await withLoading(async () => {
    throw new Error('演示错误')
  })
}

const basicSource = `<template>
  <p>loading: {{ loading }} · error: {{ error ?? '无' }}</p>
  <el-button @click="runOk">成功请求</el-button>
  <el-button @click="runFail">失败请求</el-button>
</template>

<script setup lang="ts">
import { useDataLoading } from '@apform-ui/core'
const { loading, error, withLoading } = useDataLoading()
<\/script>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="异步请求 loading / error 状态管理，withLoading 包装异步函数。"
      :source="basicSource"
    >
      <p class="meta">loading: {{ loading }} · error: {{ error ?? '无' }}</p>
      <div class="actions">
        <el-button @click="runOk">成功请求</el-button>
        <el-button @click="runFail">失败请求</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </DemoBlock>
  </div>
</template>

<style scoped>
.meta {
  margin: 0 0 12px;
  font-size: 13px;
  color: #606266;
}
.actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
