<script setup lang="ts">
/**
 * FieldRow — 属性行：label + 控件 slot
 *
 * 视觉基准对齐 editor PropertyField（88px / 12px label）。
 */
import { computed } from 'vue'
import { TruncatedTooltipText } from '../TruncatedTooltipText'

const props = defineProps<{
  /** 字段标签 */
  label: string
  /** 多行控件时顶对齐 */
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
  /* 对齐 editor PropertyField：无 label-control gap，靠 88px label 定宽 */
  display: flex;
  align-items: flex-start;
  gap: 0;
  min-height: var(--control-height-md, 32px);
  margin-bottom: var(--spacing-sm, 8px);
}

.apf-field-row--textarea {
  align-items: flex-start;
}

.apf-field-row__label {
  flex: none;
  width: var(--form-label-width, 88px);
  display: flex;
  align-items: center;
  gap: 2px;
  min-width: 0;
  min-height: var(--control-height-md, 32px);
  /* 必须写在本组件 DOM 上：TruncatedTooltipText inheritAttrs:false，
     class 落在子 span 时父级 scoped 选择器匹配不到，会退化成正文 14/16px */
  font-size: 12px;
  color: var(--text-color-regular, #606266);
  line-height: var(--control-height-md, 32px);
}

.apf-field-row__required {
  color: var(--el-color-danger, #f56c6c);
  font-size: 12px;
}

.apf-field-row__label :deep(.apf-truncated-text),
.apf-field-row__label :deep(.apf-field-row__label-text) {
  font-size: inherit;
  color: inherit;
  line-height: inherit;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.apf-field-row__control {
  flex: 1;
  min-width: 0;
  min-height: var(--control-height-md, 32px);
  display: flex;
  align-items: center;
}

.apf-field-row__control--textarea {
  width: 100%;
  align-items: stretch;
}
</style>
