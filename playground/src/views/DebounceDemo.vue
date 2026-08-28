<script setup lang="ts">
import { ref } from 'vue'
import { useDebounceFn } from '@apform-ui/core'

const input = ref('')
const result = ref('')
const count = ref(0)

const debouncedSearch = useDebounceFn((query) => {
  result.value = `搜索: ${query}（第 ${count.value} 次触发）`
}, 500)

function onInput(e) {
  count.value++
  input.value = e.target.value
  debouncedSearch(e.target.value)
}
</script>

<template>
  <div>
    <h2>useDebounceFn 防抖</h2>
    <p>Vue 3 composable，自动在组件卸载时清理定时器。</p>

    <div class="demo-section">
      <div class="demo-title">输入防抖（500ms）</div>
      <div class="demo-block">
        <el-input
          :model-value="input"
          placeholder="输入搜索内容"
          @input="onInput"
          style="width: 300px;"
        />
        <p style="margin-top: 12px; color: #606266; font-size: 13px;">
          输入次数: {{ count }} | {{ result || '等待输入...' }}
        </p>
      </div>
    </div>
  </div>
</template>
