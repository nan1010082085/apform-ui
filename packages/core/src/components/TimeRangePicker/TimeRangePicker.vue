<script setup lang="ts">
/**
 * TimeRangePicker — 全局时间范围选择器
 *
 * 快捷预设 + 自定义 datetimerange，供监控布局顶栏共享。
 */
import { computed, ref, watch } from 'vue'

/** 时间范围预设 */
export type TimeRangePreset =
  | '5m'
  | '15m'
  | '1h'
  | '6h'
  | '24h'
  | '7d'
  | '30d'
  | 'custom'

/** 时间范围值 */
export interface TimeRange {
  preset: TimeRangePreset
  start?: string
  end?: string
}

const PRESET_LABELS: Record<Exclude<TimeRangePreset, 'custom'>, string> = {
  '5m': '5分钟',
  '15m': '15分钟',
  '1h': '1小时',
  '6h': '6小时',
  '24h': '24小时',
  '7d': '7天',
  '30d': '30天',
}

const PRESET_MS: Record<Exclude<TimeRangePreset, 'custom'>, number> = {
  '5m': 5 * 60 * 1000,
  '15m': 15 * 60 * 1000,
  '1h': 60 * 60 * 1000,
  '6h': 6 * 60 * 60 * 1000,
  '24h': 24 * 60 * 60 * 1000,
  '7d': 7 * 24 * 60 * 60 * 1000,
  '30d': 30 * 24 * 60 * 60 * 1000,
}

const props = withDefaults(
  defineProps<{
    /** 当前时间范围 */
    modelValue: TimeRange
    /** 显示快捷按钮组 */
    showPresets?: boolean
    /** 快捷预设列表 */
    presets?: TimeRangePreset[]
    /** 允许自定义范围 */
    allowCustom?: boolean
    /** 尺寸 */
    size?: 'small' | 'default' | 'large'
    /** 禁用 */
    disabled?: boolean
  }>(),
  {
    showPresets: true,
    presets: () => ['5m', '15m', '1h', '6h', '24h', '7d'],
    allowCustom: true,
    size: 'default',
    disabled: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: TimeRange]
  change: [value: TimeRange]
}>()

const popoverVisible = ref(false)
const customRange = ref<[Date, Date] | null>(null)

/**
 * 打开自定义面板时回填已选范围
 */
watch(popoverVisible, (visible) => {
  if (!visible) return
  const { preset, start, end } = props.modelValue
  if (preset === 'custom' && start && end) {
    customRange.value = [new Date(start), new Date(end)]
  }
})

const presetButtons = computed(() =>
  props.presets.filter((p): p is Exclude<TimeRangePreset, 'custom'> => p !== 'custom'),
)

/**
 * 格式化自定义按钮文案
 */
function formatCustomLabel(range: TimeRange): string {
  if (!range.start || !range.end) return '自定义'
  const fmt = (iso: string) => {
    const d = new Date(iso)
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    const hh = String(d.getHours()).padStart(2, '0')
    const mi = String(d.getMinutes()).padStart(2, '0')
    return `${mm}-${dd} ${hh}:${mi}`
  }
  return `自定义 ${fmt(range.start)} ~ ${fmt(range.end)}`
}

const customButtonLabel = computed(() =>
  props.modelValue.preset === 'custom'
    ? formatCustomLabel(props.modelValue)
    : '自定义',
)

/**
 * 选择快捷预设
 */
function selectPreset(preset: Exclude<TimeRangePreset, 'custom'>) {
  const end = Date.now()
  const start = end - PRESET_MS[preset]
  const next: TimeRange = {
    preset,
    start: new Date(start).toISOString(),
    end: new Date(end).toISOString(),
  }
  emit('update:modelValue', next)
  emit('change', next)
}

/**
 * 确认自定义范围
 */
function confirmCustom() {
  if (!customRange.value) return
  const [start, end] = customRange.value
  const next: TimeRange = {
    preset: 'custom',
    start: start.toISOString(),
    end: end.toISOString(),
  }
  emit('update:modelValue', next)
  emit('change', next)
  popoverVisible.value = false
}
</script>

<template>
  <div
    class="apf-time-range-picker"
    :class="[`apf-time-range-picker--${size}`]"
  >
    <el-button-group v-if="showPresets">
      <el-button
        v-for="preset in presetButtons"
        :key="preset"
        :size="size"
        :disabled="disabled"
        :type="modelValue.preset === preset ? 'primary' : 'default'"
        @click="selectPreset(preset)"
      >
        {{ PRESET_LABELS[preset] }}
      </el-button>
    </el-button-group>

    <el-popover
      v-if="allowCustom"
      v-model:visible="popoverVisible"
      placement="bottom-end"
      :width="420"
      trigger="click"
      :disabled="disabled"
    >
      <template #reference>
        <el-button
          :size="size"
          :disabled="disabled"
          :type="modelValue.preset === 'custom' ? 'primary' : 'default'"
          class="apf-time-range-picker__custom"
        >
          {{ customButtonLabel }}
        </el-button>
      </template>
      <div class="apf-time-range-picker__panel">
        <el-date-picker
          v-model="customRange"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :size="size"
          style="width: 100%"
        />
        <div class="apf-time-range-picker__actions">
          <el-button :size="size" @click="popoverVisible = false">取消</el-button>
          <el-button
            type="primary"
            :size="size"
            :disabled="!customRange"
            @click="confirmCustom"
          >
            确定
          </el-button>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<style scoped>
.apf-time-range-picker {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.apf-time-range-picker :deep(.el-button) {
  height: var(--control-height-md);
}

.apf-time-range-picker--small :deep(.el-button) {
  height: var(--control-height-sm);
}

.apf-time-range-picker--large :deep(.el-button) {
  height: var(--control-height-lg);
}

.apf-time-range-picker__panel {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.apf-time-range-picker__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
}
</style>
