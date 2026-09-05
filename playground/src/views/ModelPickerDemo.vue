<script setup lang="ts">
/**
 * ModelPicker 模型选择文档示例
 */
import { ref } from 'vue'
import { ModelPicker, type ModelPickerItem } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const selected = ref<string | null>('m1')
const models: ModelPickerItem[] = [
  { id: 'm1', name: 'DeepSeek-V3', provider: 'deepseek' },
  { id: 'm2', name: 'GPT-4o', provider: 'openai' },
  { id: 'm3', name: 'Claude Sonnet', provider: 'anthropic' },
]

const basicSource = `<template>
  <ModelPicker v-model="selected" :models="models" />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="下拉选择对话模型。"
      :source="basicSource"
    >
      <div class="panel">
        <ModelPicker v-model="selected" :models="models" />
      </div>
      <p class="hint">当前：{{ selected }}</p>
    </DemoBlock>
  </div>
</template>

<style scoped>
.panel {
  max-width: 360px;
}
.hint {
  margin: 8px 0 0;
  color: #909399;
  font-size: 13px;
}
</style>
