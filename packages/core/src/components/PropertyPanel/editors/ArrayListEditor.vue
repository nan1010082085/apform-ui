<script setup lang="ts">
/**
 * ArrayListEditor — 简易数组编辑（字符串行，或 label+value 对象行）
 */
import { computed } from 'vue'
import { AppIcon } from '../../AppIcon'
import { PROPERTY_CONTROL_SIZE } from '../types'

export type ArrayListMode = 'string' | 'label-value'

const props = withDefaults(
  defineProps<{
    /** 当前数组 */
    value: unknown
    /**
     * 行模式：
     * - string：字符串列表
     * - label-value：{ label, value } 对象列表
     */
    mode?: ArrayListMode
  }>(),
  {
    mode: 'string',
  },
)

const emit = defineEmits<{
  /** 数组变更 */
  update: [value: unknown[]]
}>()

const isLabelValue = computed(() => props.mode === 'label-value')

const stringRows = computed(() => {
  if (!Array.isArray(props.value)) return [] as string[]
  return props.value.map((v) => String(v ?? ''))
})

const objectRows = computed(() => {
  if (!Array.isArray(props.value)) return [] as Array<{ label: string; value: string }>
  return props.value.map((item) => {
    const row = item as { label?: unknown; value?: unknown }
    return {
      label: String(row?.label ?? ''),
      value: String(row?.value ?? ''),
    }
  })
})

/**
 * @param next 下一份数组
 */
function commit(next: unknown[]) {
  emit('update', next)
}

function addRow() {
  if (isLabelValue.value) {
    commit([...objectRows.value, { label: '', value: '' }])
  } else {
    commit([...stringRows.value, ''])
  }
}

/**
 * @param index 下标
 */
function removeRow(index: number) {
  if (isLabelValue.value) {
    commit(objectRows.value.filter((_, i) => i !== index))
  } else {
    commit(stringRows.value.filter((_, i) => i !== index))
  }
}

/**
 * @param index 下标
 * @param text 字符串值
 */
function updateString(index: number, text: string) {
  const next = stringRows.value.map((v, i) => (i === index ? text : v))
  commit(next)
}

/**
 * @param index 下标
 * @param key 字段
 * @param text 文本
 */
function updateObject(index: number, key: 'label' | 'value', text: string) {
  const next = objectRows.value.map((row, i) =>
    i === index ? { ...row, [key]: text } : row,
  )
  commit(next)
}
</script>

<template>
  <div class="apf-array-list">
    <template v-if="isLabelValue">
      <div
        v-for="(row, i) in objectRows"
        :key="i"
        class="apf-array-list__row"
      >
        <el-input
          :model-value="row.label"
          :size="PROPERTY_CONTROL_SIZE"
          placeholder="标签"
          @update:model-value="(v: string) => updateObject(i, 'label', v)"
        />
        <el-input
          :model-value="row.value"
          :size="PROPERTY_CONTROL_SIZE"
          placeholder="值"
          @update:model-value="(v: string) => updateObject(i, 'value', v)"
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
    </template>
    <template v-else>
      <div
        v-for="(text, i) in stringRows"
        :key="i"
        class="apf-array-list__row"
      >
        <el-input
          :model-value="text"
          :size="PROPERTY_CONTROL_SIZE"
          placeholder="内容"
          @update:model-value="(v: string) => updateString(i, v)"
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
    </template>
    <el-button
      type="primary"
      plain
      :size="PROPERTY_CONTROL_SIZE"
      class="apf-array-list__add"
      @click="addRow"
    >
      <AppIcon name="plus" :size="14" />
      添加
    </el-button>
  </div>
</template>

<style scoped>
.apf-array-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  min-width: 0;
}

.apf-array-list__row {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.apf-array-list__row :deep(.el-input) {
  flex: 1;
  min-width: 0;
}

.apf-array-list__add {
  width: 100%;
}
</style>
