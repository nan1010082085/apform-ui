<template>
  <div class="demo-section">
    <h2>useToast</h2>
    <p>编程式 Toast（需 provideToast 注入）。</p>
    <Toast ref="toastRef" />
    <div class="actions">
      <button type="button" @click="toast.success('保存成功')">success</button>
      <button type="button" @click="toast.error('操作失败')">error</button>
      <button type="button" @click="toast.warning('请注意')">warning</button>
      <button type="button" @click="toast.info('提示信息')">info</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import { Toast, provideToast, useToast } from '@apform-ui/core'

const toastRef = ref()
const injection = provideToast(toastRef)
for (const key of Reflect.ownKeys(injection)) {
  provide(key as symbol, injection[key as keyof typeof injection])
}
const toast = useToast()
</script>

<style scoped>
.demo-section { padding: 8px; }
.actions { display: flex; gap: 8px; margin-top: 12px; }
button { padding: 6px 12px; }
</style>
