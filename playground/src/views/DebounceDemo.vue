<script setup lang="ts">
/**
 * useDebounceFn 防抖文档示例
 */
import { ref } from 'vue'
import { useDebounceFn } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const input = ref('')
const result = ref('')
const count = ref(0)

/**
 * 防抖搜索，500ms 后触发
 */
const debouncedSearch = useDebounceFn((query: string) => {
  result.value = `搜索: ${query}（第 ${count.value} 次触发）`
}, 500)

/**
 * 输入事件处理
 */
function onInput(e: Event) {
  count.value++
  const value = (e.target as HTMLInputElement).value
  input.value = value
  debouncedSearch(value)
}

const debounceSource = `<template>
  <el-input @input="onInput" placeholder="输入搜索内容" />
</template>

<script setup lang="ts">
import { useDebounceFn } from '@apform-ui/core'
const debouncedSearch = useDebounceFn((query) => { /* ... */ }, 500)
<\/script>`
</script>

<template>
  <div>
    <DemoBlock
      title="输入防抖（500ms）"
      description="Vue 3 composable，自动在组件卸载时清理定时器。"
      :source="debounceSource"
    >
      <el-input
        :model-value="input"
        placeholder="输入搜索内容"
        style="width: 300px"
        @input="onInput"
      />
      <p class="meta">输入次数: {{ count }} | {{ result || '等待输入...' }}</p>
    </DemoBlock>
  </div>
</template>

<style scoped>
.meta {
  margin: 12px 0 0;
  color: #606266;
  font-size: 13px;
}
</style>
