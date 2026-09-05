<script setup lang="ts">
/**
 * useClipboard 文档示例
 */
import { ref } from 'vue'
import { useClipboard } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const text = ref('Hello @apform-ui')
const status = ref('')
const { copy } = useClipboard({
  onSuccess: () => {
    status.value = '已复制'
  },
  onError: () => {
    status.value = '复制失败'
  },
})

const basicSource = `const { copy } = useClipboard({ onSuccess: () => msg.success('已复制') })
await copy(text)`
</script>

<template>
  <div>
    <DemoBlock title="基础用法" description="复制文本到剪贴板。" :source="basicSource">
      <div class="row">
        <el-input v-model="text" style="max-width: 320px" />
        <el-button type="primary" @click="copy(text)">复制</el-button>
        <span v-if="status">{{ status }}</span>
      </div>
    </DemoBlock>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}
</style>
