<script setup lang="ts">
/**
 * NumberArrayEditor — number[] 简易编辑（增删 / 改值）
 */
import { computed } from 'vue'
import { AppIcon } from '../../AppIcon'
import { PROPERTY_CONTROL_SIZE } from '../types'

const props = withDefaults(
  defineProps<{
    /** 当前数值数组 */
    value: unknown
    /** 下限 */
    min?: number
    /** 上限 */
    max?: number
  }>(),
  {
    min: 0,
    max: 100,
  },
)

const emit = defineEmits<{
  /** 数组变更 */
  update: [value: number[]]
}>()

const rows = computed(() => {
  if (!Array.isArray(props.value)) return [] as number[]
  return props.value.map((n) => Number(n) || 0)
})

/**
 * @param next 下一份数组
 */
function commit(next: number[]) {
  emit('update', next)
}

function addRow() {
  commit([...rows.value, 0])
}

/**
 * @param index 下标
 */
function removeRow(index: number) {
  if (rows.value.length <= 1) return
  commit(rows.value.filter((_, i) => i !== index))
}

/**
 * @param index 下标
 * @param val 新值
 */
function updateAt(index: number, val: number | undefined) {
  const next = [...rows.value]
  next[index] = val ?? 0
  commit(next)
}
</script>

<template>
  <div class="apf-number-array">
    <div v-for="(n, i) in rows" :key="i" class="apf-number-array__row">
      <span class="apf-number-array__index">#{{ i + 1 }}</span>
      <el-input-number
        :model-value="n"
        :size="PROPERTY_CONTROL_SIZE"
        controls-position="right"
        :min="min"
        :max="max"
        style="flex: 1"
        @update:model-value="(v: number | undefined) => updateAt(i, v)"
      />
      <el-button
        type="danger"
        text
        :size="PROPERTY_CONTROL_SIZE"
        :disabled="rows.length <= 1"
        @click="removeRow(i)"
      >
        <AppIcon name="delete" :size="14" />
      </el-button>
    </div>
    <el-button
      type="primary"
      plain
      :size="PROPERTY_CONTROL_SIZE"
      class="apf-number-array__add"
      @click="addRow"
    >
      <AppIcon name="plus" :size="14" />
      添加
    </el-button>
  </div>
</template>

<style scoped>
.apf-number-array {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  min-width: 0;
}

.apf-number-array__row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.apf-number-array__index {
  flex-shrink: 0;
  width: 28px;
  font-size: var(--apf-font-size-12, 12px);
  color: var(--apf-text-muted, #909399);
}

.apf-number-array__add {
  width: 100%;
}
</style>
