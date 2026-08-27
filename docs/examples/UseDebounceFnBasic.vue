<script setup>
import { ref } from 'vue'
import { useDebounceFn } from '@apform-ui/core'

const input = ref('')
const result = ref('')
const count = ref(0)

const debouncedSearch = useDebounceFn((query) => {
  result.value = `搜索: ${query}（第 ${count.value} 次）`
}, 500)

function onInput(e) {
  count.value++
  input.value = e.target.value
  debouncedSearch(e.target.value)
}
</script>

<template>
  <div>
    <el-input
      :model-value="input"
      placeholder="输入搜索内容（500ms 防抖）"
      @input="onInput"
      style="width: 300px;"
    />
    <p style="margin-top: 8px; font-size: 13px; color: #666;">
      输入次数: {{ count }} | {{ result || '等待输入...' }}
    </p>
  </div>
</template>
