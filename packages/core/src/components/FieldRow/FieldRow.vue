<script setup lang="ts">
/**
 * FieldRow — 属性行：label + 控件 slot
 */
import { computed } from 'vue'
import { TruncatedTooltipText } from '../TruncatedTooltipText'

const props = defineProps<{
  /** 字段标签 */
  label: string
  /** 多行控件时拉高对齐 */
  textarea?: boolean
  /** 提示文案（拼进 label tooltip） */
  hint?: string
  /** 必填标记 */
  required?: boolean
}>()

const labelTooltip = computed(() => {
  if (props.hint?.trim()) return `${props.label}\n${props.hint.trim()}`
  return props.label
})
</script>

<template>
  <div class="apf-field-row" :class="{ 'apf-field-row--textarea': textarea }">
    <div class="apf-field-row__label">
      <span v-if="required" class="apf-field-row__required">*</span>
      <TruncatedTooltipText :content="labelTooltip" class="apf-field-row__label-text">
        {{ label }}
      </TruncatedTooltipText>
    </div>
    <div class="apf-field-row__control" :class="{ 'apf-field-row__control--textarea': textarea }">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.apf-field-row {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 32px;
  margin-bottom: 10px;
}

.apf-field-row--textarea {
  align-items: flex-start;
}

.apf-field-row__label {
  flex: none;
  width: 96px;
  display: flex;
  align-items: center;
  gap: 2px;
  min-width: 0;
}

.apf-field-row__required {
  color: var(--el-color-danger, #f56c6c);
  font-size: 12px;
}

.apf-field-row__label-text {
  font-size: 13px;
  color: var(--text-color-regular, #606266);
}

.apf-field-row__control {
  flex: 1;
  min-width: 0;
}

.apf-field-row__control--textarea {
  width: 100%;
}
</style>
