<script setup lang="ts">
/**
 * ThresholdSlider — 告警阈值配置滑块
 */
import { computed } from 'vue'

/** 阈值类型 */
export type ThresholdType = 'errorRate' | 'latency' | 'eventCount' | 'timeout'

const TYPE_CONFIG: Record<
  ThresholdType,
  { unit: string; min: number; max: number; step: number; suggest: number }
> = {
  errorRate: { unit: '%', min: 0, max: 100, step: 1, suggest: 5 },
  latency: { unit: 'ms', min: 100, max: 30000, step: 100, suggest: 2000 },
  eventCount: { unit: '次/5分钟', min: 10, max: 10000, step: 10, suggest: 100 },
  timeout: { unit: '分钟', min: 1, max: 60, step: 1, suggest: 3 },
}

const props = withDefaults(
  defineProps<{
    /** 阈值类型 */
    type: ThresholdType
    /** 当前值 */
    modelValue: number
    /** 显示输入框 */
    showInput?: boolean
    /** 禁用 */
    disabled?: boolean
  }>(),
  {
    showInput: true,
    disabled: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
}>()

const config = computed(() => TYPE_CONFIG[props.type])

/**
 * 滑块 / 输入同步
 */
function update(value: number | undefined) {
  if (value == null || Number.isNaN(value)) return
  const clamped = Math.min(config.value.max, Math.max(config.value.min, value))
  emit('update:modelValue', clamped)
}

/**
 * 松手确认
 */
function onChange(value: number | number[]) {
  const v = Array.isArray(value) ? value[0] : value
  update(v)
  emit('change', v)
}
</script>

<template>
  <div class="apf-threshold-slider" :class="{ 'is-disabled': disabled }">
    <div class="apf-threshold-slider__meta">
      <span class="apf-threshold-slider__unit">{{ config.unit }}</span>
      <span class="apf-threshold-slider__hint">建议 {{ config.suggest }}{{ config.unit }}</span>
    </div>
    <div class="apf-threshold-slider__row">
      <el-slider
        :model-value="modelValue"
        :min="config.min"
        :max="config.max"
        :step="config.step"
        :disabled="disabled"
        class="apf-threshold-slider__slider"
        @update:model-value="update($event as number)"
        @change="onChange"
      />
      <el-input-number
        v-if="showInput"
        :model-value="modelValue"
        :min="config.min"
        :max="config.max"
        :step="config.step"
        :disabled="disabled"
        controls-position="right"
        size="small"
        class="apf-threshold-slider__input"
        @update:model-value="update"
        @change="(v: number | undefined) => v != null && emit('change', v)"
      />
    </div>
  </div>
</template>

<style scoped>
.apf-threshold-slider {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  width: 100%;
}

.apf-threshold-slider__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size-12);
}

.apf-threshold-slider__unit {
  color: var(--text-color-secondary);
  font-weight: var(--font-weight-medium);
}

.apf-threshold-slider__hint {
  color: var(--text-color-muted);
}

.apf-threshold-slider__row {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.apf-threshold-slider__slider {
  flex: 1;
  min-width: 0;
}

.apf-threshold-slider__input {
  width: 120px;
  flex-shrink: 0;
}
</style>
