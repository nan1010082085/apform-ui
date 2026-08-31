<template>
  <div class="demo-section">
    <h2>useDataLoading</h2>
    <p>异步请求 loading / error 状态管理。</p>
    <div class="demo-block">
      <p>loading: {{ loading }} · error: {{ error ?? '无' }}</p>
      <button type="button" @click="runOk">成功请求</button>
      <button type="button" @click="runFail">失败请求</button>
      <button type="button" @click="reset">重置</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataLoading } from '@apform-ui/core'

const { loading, error, withLoading, reset } = useDataLoading()

async function runOk() {
  await withLoading(async () => {
    await new Promise((r) => setTimeout(r, 400))
    return 'ok'
  })
}

async function runFail() {
  await withLoading(async () => {
    throw new Error('演示错误')
  })
}
</script>

<style scoped>
.demo-section { padding: 20px; }
.demo-block { padding: 16px; border: 1px solid #ebeef5; border-radius: 8px; display: flex; flex-direction: column; gap: 12px; }
button { width: fit-content; padding: 6px 12px; }
</style>
