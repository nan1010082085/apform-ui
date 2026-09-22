<script setup lang="ts">
/**
 * ModelPicker 模型选择文档示例
 * 示例数据对齐平台常见供应商（Mimo 默认全模态 flash / 编码 pro）
 */
import { ref } from 'vue'
import { ModelPicker, type ModelPickerItem } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const selected = ref<string | null>('mimo-flash')
const models: ModelPickerItem[] = [
  { id: 'mimo-flash', name: 'Mimo v2.6 Flash', provider: 'mimo' },
  { id: 'mimo-pro', name: 'Mimo v2.6 Pro', provider: 'mimo' },
  { id: 'ds-flash', name: 'DeepSeek Flash', provider: 'deepseek' },
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'openai' },
]

const basicSource = `<template>
  <ModelPicker v-model="selected" :models="models" />
</template>

<script setup>
const models = [
  { id: 'mimo-flash', name: 'Mimo v2.6 Flash', provider: 'mimo' },
  { id: 'mimo-pro', name: 'Mimo v2.6 Pro', provider: 'mimo' },
  { id: 'ds-flash', name: 'DeepSeek Flash', provider: 'deepseek' },
]
</script>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="下拉选择对话模型。平台默认对话为 mimo-v2.6-flash（全模态）；编码场景可选 mimo-v2.6-pro。库本身不绑定模型 id，由业务注入列表。"
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
  margin-top: 12px;
  color: var(--el-text-color-secondary);
  font-size: 13px;
}
</style>
