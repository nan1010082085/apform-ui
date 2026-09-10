<script setup lang="ts">
/**
 * PropertyField — schema 驱动的单行属性控件
 *
 * 布局复用 FieldRow；内置 type 对齐 editor 属性配置 UX。
 * 未知 type 由父级 slot 覆盖，否则 fallback 为 text。
 */
import { computed, inject, onMounted, ref, unref, watch, type MaybeRef } from 'vue'
import { FieldRow } from '../FieldRow'
import { AppIcon } from '../AppIcon'
import OptionsListEditor from '../PropertyPanel/editors/OptionsListEditor.vue'
import NumberArrayEditor from '../PropertyPanel/editors/NumberArrayEditor.vue'
import ArrayListEditor from '../PropertyPanel/editors/ArrayListEditor.vue'
import {
  PROPERTY_CONTROL_SIZE,
  PROPERTY_FETCH_REMOTE_KEY,
  type FetchRemoteOptionsFn,
  type PropertyArrayEditorMode,
  type PropertyFieldType,
  type PropertySelectOption,
} from '../PropertyPanel/types'

const props = withDefaults(
  defineProps<{
    /** 字段键 */
    keyName: string
    /** 标签 */
    label: string
    /** 控件类型 */
    type: PropertyFieldType
    /** 当前值 */
    value: unknown
    /** 提示 */
    desc?: string
    /** 占位 */
    placeholder?: string
    /** 静态选项 */
    options?: PropertySelectOption[]
    /** 远程 URL */
    remoteUrl?: string
    labelField?: string
    valueField?: string
    min?: number
    max?: number
    required?: boolean
    /** array-editor 行模式 */
    arrayMode?: PropertyArrayEditorMode
    /** 覆盖 inject 的远程拉取 */
    fetchRemoteOptions?: FetchRemoteOptionsFn
  }>(),
  {
    labelField: 'name',
    valueField: 'id',
    arrayMode: 'string',
  },
)

const emit = defineEmits<{
  /** 值变更 */
  update: [value: unknown]
}>()

const injectedFetch = inject<MaybeRef<FetchRemoteOptionsFn | undefined> | undefined>(
  PROPERTY_FETCH_REMOTE_KEY,
  undefined,
)
const fetchRemote = computed(
  () => props.fetchRemoteOptions ?? unref(injectedFetch),
)

const BUILTIN = new Set([
  'text',
  'textarea',
  'number',
  'switch',
  'color',
  'select',
  'remote-select',
  'json',
  'color-array',
  'options',
  'number-array',
  'array-editor',
])

const isBuiltin = computed(() => BUILTIN.has(props.type))
const isNestedEditor = computed(
  () =>
    props.type === 'options' ||
    props.type === 'number-array' ||
    props.type === 'array-editor' ||
    props.type === 'textarea' ||
    props.type === 'json' ||
    props.type === 'color-array',
)

function handleUpdate(val: unknown) {
  emit('update', val)
}

const DEFAULT_COLORS = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de']

const colorArrayValue = computed(() => {
  if (Array.isArray(props.value)) return props.value as string[]
  return DEFAULT_COLORS
})

function updateColorArray(index: number, color: string | null) {
  const arr = [...colorArrayValue.value]
  arr[index] = color ?? '#000000'
  emit('update', arr)
}

function addColorArrayItem() {
  emit('update', [...colorArrayValue.value, '#000000'])
}

function removeColorArrayItem(index: number) {
  emit(
    'update',
    colorArrayValue.value.filter((_, i) => i !== index),
  )
}

const remoteOptions = ref<PropertySelectOption[]>([])
const remoteLoading = ref(false)

async function loadRemoteOptions() {
  if (!props.remoteUrl || !fetchRemote.value) return
  remoteLoading.value = true
  try {
    remoteOptions.value = await fetchRemote.value(
      props.remoteUrl,
      props.labelField,
      props.valueField,
    )
  } catch {
    remoteOptions.value = []
  } finally {
    remoteLoading.value = false
  }
}

onMounted(() => {
  if (props.type === 'remote-select') void loadRemoteOptions()
})

const jsonText = ref('')
const jsonError = ref('')

function formatJsonValue(val: unknown): string {
  if (val === null || val === undefined) return ''
  return JSON.stringify(val, null, 2)
}

watch(
  () => props.value,
  (val) => {
    if (props.type === 'json') {
      jsonText.value = formatJsonValue(val)
      jsonError.value = ''
    }
  },
  { immediate: true },
)

function onJsonBlur() {
  const text = jsonText.value.trim()
  if (!text) {
    emit('update', null)
    jsonError.value = ''
    return
  }
  try {
    emit('update', JSON.parse(text))
    jsonError.value = ''
  } catch {
    jsonError.value = 'JSON 格式错误'
  }
}
</script>

<template>
  <FieldRow
    :label="label"
    :hint="desc"
    :required="required"
    :textarea="isNestedEditor"
  >
    <template v-if="$slots.default">
      <slot />
    </template>

    <template v-else-if="isBuiltin">
      <el-input
        v-if="type === 'text'"
        :model-value="String(value ?? '')"
        :size="PROPERTY_CONTROL_SIZE"
        :placeholder="placeholder"
        @update:model-value="handleUpdate"
      />

      <el-input
        v-else-if="type === 'textarea'"
        type="textarea"
        :rows="3"
        :model-value="String(value ?? '')"
        :size="PROPERTY_CONTROL_SIZE"
        :placeholder="placeholder"
        @update:model-value="handleUpdate"
      />

      <el-input-number
        v-else-if="type === 'number'"
        :model-value="(value as number) ?? 0"
        :size="PROPERTY_CONTROL_SIZE"
        controls-position="right"
        :min="min"
        :max="max"
        @update:model-value="handleUpdate"
      />

      <el-switch
        v-else-if="type === 'switch'"
        :model-value="Boolean(value ?? false)"
        @update:model-value="handleUpdate"
      />

      <el-color-picker
        v-else-if="type === 'color'"
        :model-value="String(value ?? '')"
        :size="PROPERTY_CONTROL_SIZE"
        show-alpha
        @update:model-value="handleUpdate"
      />

      <el-select
        v-else-if="type === 'select'"
        :model-value="value as string | number | boolean"
        :size="PROPERTY_CONTROL_SIZE"
        style="width: 100%"
        :placeholder="placeholder"
        @update:model-value="handleUpdate"
      >
        <el-option
          v-for="opt in options ?? []"
          :key="String(opt.value)"
          :label="opt.label"
          :value="opt.value"
        />
      </el-select>

      <el-select
        v-else-if="type === 'remote-select'"
        :model-value="value as string | number | boolean"
        :loading="remoteLoading"
        :placeholder="placeholder || '请选择'"
        :size="PROPERTY_CONTROL_SIZE"
        style="width: 100%"
        filterable
        clearable
        @update:model-value="handleUpdate"
      >
        <el-option
          v-for="opt in remoteOptions"
          :key="String(opt.value)"
          :label="opt.label"
          :value="opt.value"
        />
      </el-select>

      <div v-else-if="type === 'json'" class="apf-property-field__json">
        <el-input
          v-model="jsonText"
          type="textarea"
          :rows="6"
          :size="PROPERTY_CONTROL_SIZE"
          :placeholder="placeholder || 'JSON'"
          :class="{ 'apf-property-field__json-input--error': !!jsonError }"
          class="apf-property-field__json-input"
          @blur="onJsonBlur"
        />
        <span v-if="jsonError" class="apf-property-field__json-error">{{ jsonError }}</span>
      </div>

      <div v-else-if="type === 'color-array'" class="apf-property-field__colors">
        <div class="apf-property-field__colors-items">
          <el-color-picker
            v-for="(color, idx) in colorArrayValue"
            :key="idx"
            :model-value="color"
            :size="PROPERTY_CONTROL_SIZE"
            @update:model-value="(val: string | null) => updateColorArray(idx, val)"
          />
        </div>
        <div class="apf-property-field__colors-actions">
          <el-button
            type="primary"
            text
            :size="PROPERTY_CONTROL_SIZE"
            @click="addColorArrayItem"
          >
            <AppIcon name="plus" :size="14" />
          </el-button>
          <el-button
            v-if="colorArrayValue.length > 1"
            type="danger"
            text
            :size="PROPERTY_CONTROL_SIZE"
            @click="removeColorArrayItem(colorArrayValue.length - 1)"
          >
            <AppIcon name="delete" :size="14" />
          </el-button>
        </div>
      </div>

      <OptionsListEditor
        v-else-if="type === 'options'"
        :value="value"
        @update="handleUpdate"
      />

      <NumberArrayEditor
        v-else-if="type === 'number-array'"
        :value="value"
        :min="min"
        :max="max"
        @update="handleUpdate"
      />

      <ArrayListEditor
        v-else-if="type === 'array-editor'"
        :value="value"
        :mode="arrayMode"
        @update="handleUpdate"
      />
    </template>

    <el-input
      v-else
      :model-value="String(value ?? '')"
      :size="PROPERTY_CONTROL_SIZE"
      :placeholder="placeholder"
      @update:model-value="handleUpdate"
    />
  </FieldRow>
</template>

<style scoped>
.apf-property-field__json {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.apf-property-field__json-input :deep(.el-textarea__inner) {
  font-family: 'SF Mono', Monaco, Menlo, monospace;
  font-size: 11px;
  line-height: 1.5;
  resize: vertical;
  min-height: 80px;
}

.apf-property-field__json-input--error :deep(.el-textarea__inner) {
  border-color: var(--el-color-danger, #f56c6c);
}

.apf-property-field__json-error {
  font-size: 11px;
  color: var(--el-color-danger, #f56c6c);
  line-height: 1;
}

.apf-property-field__colors {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
}

.apf-property-field__colors-items {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-wrap: wrap;
  flex: 1;
  min-width: 0;
}

.apf-property-field__colors-actions {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
}
</style>
