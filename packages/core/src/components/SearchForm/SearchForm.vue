<script setup lang="ts">
/**
 * SearchForm — 可折叠通用搜索表单（无业务 schema 依赖）
 */
import { computed, reactive, ref, watch } from 'vue'
import { AppIcon } from '../AppIcon'

/** 搜索字段配置 */
export type SearchFieldConfig = {
  key: string
  label: string
  type: 'input' | 'select' | 'date' | 'daterange'
  options?: Array<{ label: string; value: string | number }>
  placeholder?: string
}

const props = withDefaults(
  defineProps<{
    fields: SearchFieldConfig[]
    modelValue?: Record<string, unknown>
    collapsible?: boolean
    defaultCollapsed?: boolean
    defaultVisibleCount?: number
  }>(),
  {
    modelValue: () => ({}),
    collapsible: true,
    defaultCollapsed: false,
    defaultVisibleCount: 3,
  },
)

const emit = defineEmits<{
  'update:modelValue': [Record<string, unknown>]
  search: [Record<string, unknown>]
  reset: []
}>()

const collapsed = ref(props.defaultCollapsed)
const form = reactive<Record<string, unknown>>({})

function syncFromProps() {
  for (const key of Object.keys(form)) {
    if (!props.fields.some((f) => f.key === key)) delete form[key]
  }
  for (const field of props.fields) {
    form[field.key] = props.modelValue?.[field.key] ?? (field.type === 'daterange' ? [] : '')
  }
}

watch(() => [props.fields, props.modelValue] as const, syncFromProps, { immediate: true, deep: true })

const canCollapse = computed(
  () => props.collapsible && props.fields.length > props.defaultVisibleCount,
)

const visibleFields = computed(() => {
  if (!canCollapse.value || !collapsed.value) return props.fields
  return props.fields.slice(0, props.defaultVisibleCount)
})

function snapshot(): Record<string, unknown> {
  return { ...form }
}

function handleSearch() {
  const values = snapshot()
  emit('update:modelValue', values)
  emit('search', values)
}

function handleReset() {
  for (const field of props.fields) {
    form[field.key] = field.type === 'daterange' ? [] : ''
  }
  const values = snapshot()
  emit('update:modelValue', values)
  emit('reset')
}

defineExpose({
  getValues: snapshot,
  reset: handleReset,
})
</script>

<template>
  <div class="apf-search-form">
    <div class="apf-search-form__row">
      <div v-for="field in visibleFields" :key="field.key" class="apf-search-form__field">
        <label class="apf-search-form__label">{{ field.label }}</label>
        <el-input
          v-if="field.type === 'input'"
          v-model="form[field.key] as string"
          clearable
          :placeholder="field.placeholder || `请输入${field.label}`"
        />
        <el-select
          v-else-if="field.type === 'select'"
          v-model="form[field.key]"
          clearable
          :placeholder="field.placeholder || `请选择${field.label}`"
          style="width: 100%"
        >
          <el-option
            v-for="opt in field.options || []"
            :key="String(opt.value)"
            :label="opt.label"
            :value="opt.value"
          />
        </el-select>
        <el-date-picker
          v-else-if="field.type === 'date'"
          v-model="form[field.key]"
          type="date"
          value-format="YYYY-MM-DD"
          :placeholder="field.placeholder || `请选择${field.label}`"
          style="width: 100%"
        />
        <el-date-picker
          v-else
          v-model="form[field.key]"
          type="daterange"
          value-format="YYYY-MM-DD"
          start-placeholder="开始"
          end-placeholder="结束"
          style="width: 100%"
        />
      </div>
      <div class="apf-search-form__actions">
        <el-button type="primary" @click="handleSearch">
          <AppIcon name="search" :size="14" style="margin-right: var(--spacing-xs, 4px)" />
          查询
        </el-button>
        <el-button @click="handleReset">重置</el-button>
        <el-button v-if="canCollapse" link type="primary" @click="collapsed = !collapsed">
          {{ collapsed ? '展开' : '收起' }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.apf-search-form {
  margin-bottom: var(--spacing-12px, 12px);
}

.apf-search-form__row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-12px, 12px) var(--spacing-md, 16px);
  align-items: flex-end;
}

.apf-search-form__field {
  width: var(--form-field-width, 220px);
  display: flex;
  flex-direction: column;
  gap: var(--form-field-gap, 6px);
}

.apf-search-form__label {
  font-size: var(--font-size-13, 13px);
  color: var(--text-color-regular, #606266);
  font-weight: var(--font-weight-medium, 500);
}

.apf-search-form__actions {
  display: flex;
  gap: var(--spacing-sm, 8px);
  align-items: center;
  padding-bottom: 2px;
}
</style>
