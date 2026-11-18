<script setup lang="ts">
/**
 * ExpertPicker — 专家/智能体紧凑下拉（纯 props，对齐 ModelPicker）
 *
 * 用于 Composer tools 行：通用 + 平台专家（如 platform.legal）。
 * 空串表示「通用」（不传 expertId）；与卡片式 AssistantPicker 分工不同。
 */
import type { ExpertPickerItem } from './types'

withDefaults(
  defineProps<{
    /** 专家列表 */
    experts: ExpertPickerItem[]
    /** 当前选中 id；null/空 = 通用 */
    modelValue: string | null
    /** 加载中 */
    loading?: boolean
    /** 通用选项文案 */
    generalLabel?: string
    /** 占位文案 */
    placeholder?: string
  }>(),
  {
    loading: false,
    generalLabel: '通用',
    placeholder: '专家',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
}>()

/**
 * 选择变更；空串映射为 null（通用）。
 *
 * @param value - el-select 值
 */
function onChange(value: string) {
  emit('update:modelValue', value ? value : null)
}
</script>

<template>
  <label class="apf-expert-picker">
    <el-select
      :model-value="modelValue || ''"
      :disabled="loading"
      :placeholder="placeholder"
      @update:model-value="onChange"
    >
      <el-option :label="generalLabel" value="" />
      <el-option
        v-for="expert in experts"
        :key="expert.id"
        :label="expert.label"
        :value="expert.id"
      >
        <div class="apf-expert-picker__option">
          <span>{{ expert.label }}</span>
          <small v-if="expert.description">{{ expert.description }}</small>
        </div>
      </el-option>
    </el-select>
  </label>
</template>

<style scoped>
.apf-expert-picker {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm, 8px);
  color: var(--text-color-secondary, #909399);
  font-size: var(--font-size-12, 12px);
}

.apf-expert-picker :deep(.el-select) {
  width: 160px;
}

.apf-expert-picker :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px var(--border-color, #e4e7ed) inset;
  border-radius: var(--border-radius-base, 4px);
}

.apf-expert-picker :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--color-primary, #0060a2) inset;
}

.apf-expert-picker__option {
  display: flex;
  flex-direction: column;
  gap: 2px;
  line-height: 1.3;
}

.apf-expert-picker__option small {
  color: var(--text-color-secondary, #909399);
  font-size: 11px;
  max-width: 220px;
  white-space: normal;
}
</style>
