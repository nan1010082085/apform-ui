<script setup lang="ts">
/**
 * AssistantPicker — 智能体选择
 */
import { ref } from 'vue'
import { AssistantPicker, type AssistantPickerItem } from '@apform-ui/core'

const selected = ref<string | null>('a1')
const items: AssistantPickerItem[] = [
  {
    id: 'a1',
    name: '表单助手',
    description: '生成与优化表单 Schema',
    supportedInputs: ['text', 'file'],
    hitlCapable: true,
  },
  {
    id: 'a2',
    name: '流程助手',
    description: '设计审批与自动化流程',
    supportedInputs: ['text'],
  },
]
</script>

<template>
  <div class="wrap">
    <h2>AssistantPicker</h2>
    <p>选择当前对话智能体。</p>
    <div class="block">
      <AssistantPicker v-model="selected" :items="items" />
    </div>
    <p class="hint">当前：{{ selected }}</p>
  </div>
</template>

<style scoped>
.wrap {
  padding: var(--spacing-md, 16px);
  max-width: 560px;
}
.block {
  padding: 8px;
  background: var(--bg-color-white, #fff);
  border: 1px solid var(--border-color-light, #ebedf3);
  border-radius: 4px;
}
.hint {
  margin-top: 8px;
  color: var(--text-color-muted, #909399);
  font-size: 13px;
}
h2 {
  margin: 0 0 4px;
}
p {
  margin: 0 0 16px;
  color: var(--text-color-secondary, #666);
  font-size: 13px;
}
</style>
