<script setup lang="ts">
/**
 * AssistantPicker 智能体选择文档示例
 */
import { ref } from 'vue'
import { AssistantPicker, type AssistantPickerItem } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

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

const basicSource = `<template>
  <AssistantPicker v-model="selected" :items="items" />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="选择当前对话智能体。"
      :source="basicSource"
    >
      <div class="panel">
        <AssistantPicker v-model="selected" :items="items" />
      </div>
      <p class="hint">当前：{{ selected }}</p>
    </DemoBlock>
  </div>
</template>

<style scoped>
.panel {
  max-width: 560px;
}
.hint {
  margin: 8px 0 0;
  color: #909399;
  font-size: 13px;
}
</style>
