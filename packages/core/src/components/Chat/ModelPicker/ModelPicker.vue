<script setup lang="ts">
/**
 * ModelPicker — 模型选择器（纯 props）
 */
import type { ModelPickerItem } from './types'

defineProps<{
  /** 模型列表 */
  models: ModelPickerItem[]
  /** 当前选中 id */
  modelValue: string | null
  /** 加载中 */
  loading?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <label class="apf-model-picker">
    <el-select
      :model-value="modelValue || undefined"
      :disabled="loading || !models.length"
      placeholder="选择模型"
      @update:model-value="emit('update:modelValue', $event)"
    >
      <el-option v-if="loading" label="正在加载模型…" value="" disabled />
      <el-option v-else-if="!models.length" label="暂无可用模型" value="" disabled />
      <el-option
        v-for="model in models"
        :key="model.id"
        :label="`${model.name} · ${model.provider}`"
        :value="model.id"
      />
    </el-select>
  </label>
</template>

<style scoped>
.apf-model-picker {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm, 8px);
  color: var(--text-color-secondary, #909399);
  font-size: var(--font-size-12, 12px);
}

.apf-model-picker :deep(.el-select) {
  width: 180px;
}

.apf-model-picker :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px var(--border-color, #e4e7ed) inset;
  border-radius: var(--border-radius-base, 4px);
}

.apf-model-picker :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--color-primary, #0060a2) inset;
}
</style>
