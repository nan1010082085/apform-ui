<script setup>
import { ref } from 'vue'
import { ErrorBoundary } from '@schema-ui/core'

const shouldError = ref(true)

function BuggyComponent() {
  if (shouldError.value) {
    throw new Error('组件渲染出错！')
  }
  return '正常渲染'
}
</script>

<template>
  <div>
    <el-switch v-model="shouldError" active-text="触发错误" inactive-text="正常" style="margin-bottom: 12px;" />
    <ErrorBoundary context="BuggyComponent">
      <div style="padding: 16px; border: 1px solid #eee; border-radius: 4px;">
        <template v-if="!shouldError">✅ 组件正常渲染</template>
        <template v-else>
          <BuggyComponent />
        </template>
      </div>
    </ErrorBoundary>
  </div>
</template>
