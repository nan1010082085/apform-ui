<script setup lang="ts">
import { ref } from 'vue'
import { ErrorBoundary } from '@apform-ui/core'

const shouldError = ref(true)
</script>

<template>
  <div>
    <h2>ErrorBoundary 错误边界</h2>
    <p>捕获子组件渲染错误，显示降级 UI。</p>

    <div class="demo-section">
      <div class="demo-title">触发/恢复错误</div>
      <div class="demo-block">
        <el-switch v-model="shouldError" active-text="触发错误" inactive-text="正常" style="margin-bottom: 16px;" />
        <ErrorBoundary context="DemoComponent">
          <div style="padding: 16px; border: 1px solid #eee; border-radius: 4px;">
            <template v-if="!shouldError">✅ 组件正常渲染</template>
            <template v-else>
              <div style="color: #E50113;">❌ 这是一个会报错的组件</div>
            </template>
          </div>
        </ErrorBoundary>
      </div>
    </div>
  </div>
</template>
