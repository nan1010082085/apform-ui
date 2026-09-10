<script setup lang="ts">
/**
 * OptionsListEditor — label + value 选项列表（通用，无业务依赖）
 */
import { computed } from 'vue'
import { AppIcon } from '../../AppIcon'
import { PROPERTY_CONTROL_SIZE } from '../types'

export interface OptionDictItem {
  label: string
  value: string | number
}

const props = defineProps<{
  /** 当前选项数组 */
  value: unknown
}>()

const emit = defineEmits<{
  /** 选项变更 */
  update: [value: OptionDictItem[]]
}>()

const rows = computed<OptionDictItem[]>(() => {
  if (!Array.isArray(props.value)) return []
  return props.value.map((item) => {
    const row = item as Partial<OptionDictItem>
    return {
      label: String(row?.label ?? ''),
      value: row?.value ?? '',
    }
  })
})

/**
 * @param next 下一份选项
 */
function commit(next: OptionDictItem[]) {
  emit('update', next)
}

function addRow() {
  commit([...rows.value, { label: '', value: '' }])
}

/**
 * @param index 行下标
 */
function removeRow(index: number) {
  commit(rows.value.filter((_, i) => i !== index))
}

/**
 * @param index 行下标
 * @param label 展示文案
 */
function updateLabel(index: number, label: string) {
  const next = rows.value.map((row, i) =>
    i === index ? { ...row, label } : row,
  )
  commit(next)
}

/**
 * @param index 行下标
 * @param value 选项值
 */
function updateValue(index: number, value: string) {
  const next = rows.value.map((row, i) =>
    i === index ? { ...row, value } : row,
  )
  commit(next)
}
</script>

<template>
  <div class="apf-options-list">
    <div v-for="(opt, i) in rows" :key="i" class="apf-options-list__row">
      <el-input
        :model-value="opt.label"
        :size="PROPERTY_CONTROL_SIZE"
        placeholder="标签"
        @update:model-value="(v: string) => updateLabel(i, v)"
      />
      <el-input
        :model-value="String(opt.value)"
        :size="PROPERTY_CONTROL_SIZE"
        placeholder="值"
        @update:model-value="(v: string) => updateValue(i, v)"
      />
      <el-button
        type="danger"
        text
        :size="PROPERTY_CONTROL_SIZE"
        @click="removeRow(i)"
      >
        <AppIcon name="delete" :size="14" />
      </el-button>
    </div>
    <el-button
      type="primary"
      plain
      :size="PROPERTY_CONTROL_SIZE"
      class="apf-options-list__add"
      @click="addRow"
    >
      <AppIcon name="plus" :size="14" />
      添加选项
    </el-button>
  </div>
</template>

<style scoped>
.apf-options-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  min-width: 0;
}

.apf-options-list__row {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.apf-options-list__row :deep(.el-input) {
  flex: 1;
  min-width: 0;
}

.apf-options-list__add {
  width: 100%;
}
</style>
