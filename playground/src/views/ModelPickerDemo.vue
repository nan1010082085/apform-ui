<script setup lang="ts">
/**
 * ModelPicker — 模型选择
 */
import { ref } from 'vue'
import { ModelPicker, type ModelPickerItem } from '@apform-ui/core'

const selected = ref<string | null>('m1')
const models: ModelPickerItem[] = [
  { id: 'm1', name: 'DeepSeek-V3', provider: 'deepseek' },
  { id: 'm2', name: 'GPT-4o', provider: 'openai' },
  { id: 'm3', name: 'Claude Sonnet', provider: 'anthropic' },
]
</script>

<template>
  <div class="wrap">
    <h2>ModelPicker</h2>
    <p>下拉选择对话模型。</p>
    <div class="block">
      <ModelPicker v-model="selected" :models="models" />
    </div>
    <p class="hint">当前：{{ selected }}</p>
  </div>
</template>

<style scoped>
.wrap {
  padding: var(--spacing-md, 16px);
  max-width: 360px;
}
.block {
  padding: 16px;
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
