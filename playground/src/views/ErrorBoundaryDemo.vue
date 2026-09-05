<script setup lang="ts">
/**
 * ErrorBoundary 错误边界文档示例
 */
import { ref } from 'vue'
import { ErrorBoundary } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const shouldError = ref(true)

const toggleSource = `<template>
  <el-switch v-model="shouldError" active-text="触发错误" />
  <ErrorBoundary context="DemoComponent">
    <!-- 子组件内容 -->
  </ErrorBoundary>
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="触发/恢复错误"
      description="捕获子组件渲染错误，显示降级 UI；切换开关模拟正常与异常状态。"
      :source="toggleSource"
    >
      <el-switch
        v-model="shouldError"
        active-text="触发错误"
        inactive-text="正常"
        style="margin-bottom: 16px"
      />
      <ErrorBoundary context="DemoComponent">
        <div class="panel">
          <template v-if="!shouldError">✅ 组件正常渲染</template>
          <template v-else>
            <div class="error">❌ 这是一个会报错的组件</div>
          </template>
        </div>
      </ErrorBoundary>
    </DemoBlock>
  </div>
</template>

<style scoped>
.panel {
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 4px;
}
.error {
  color: #e50113;
}
</style>
