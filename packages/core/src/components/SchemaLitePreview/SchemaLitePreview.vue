<script setup lang="ts">
/**
 * SchemaLitePreview — 轻量 Schema 表单预览
 *
 * 仅渲染常见字段类型，不依赖 editor WidgetRenderer。
 */
import { reactive, watch } from 'vue'

/** 轻量字段定义 */
export type SchemaLiteField = {
  key: string
  label: string
  type: 'input' | 'textarea' | 'number' | 'select' | 'switch' | 'date'
  placeholder?: string
  options?: Array<{ label: string; value: string | number }>
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    /** 字段列表 */
    fields: SchemaLiteField[]
    /** 受控表单值 */
    modelValue?: Record<string, unknown>
    /** 标签宽度 */
    labelWidth?: string
  }>(),
  {
    modelValue: () => ({}),
    labelWidth: '100px',
  },
)

const emit = defineEmits<{
  'update:modelValue': [Record<string, unknown>]
}>()

const form = reactive<Record<string, unknown>>({})

function sync() {
  for (const key of Object.keys(form)) {
    if (!props.fields.some((f) => f.key === key)) delete form[key]
  }
  for (const field of props.fields) {
    const incoming = props.modelValue?.[field.key]
    if (incoming !== undefined) form[field.key] = incoming
    else if (!(field.key in form)) {
      form[field.key] = field.type === 'switch' ? false : field.type === 'number' ? undefined : ''
    }
  }
}

watch(() => [props.fields, props.modelValue] as const, sync, { immediate: true, deep: true })

function onChange() {
  emit('update:modelValue', { ...form })
}
</script>

<template>
  <div class="apf-schema-lite-preview">
    <el-form :model="form" :label-width="labelWidth" @change="onChange">
      <el-form-item v-for="field in fields" :key="field.key" :label="field.label">
        <el-input
          v-if="field.type === 'input'"
          v-model="form[field.key] as string"
          :placeholder="field.placeholder"
          :disabled="field.disabled"
          @change="onChange"
        />
        <el-input
          v-else-if="field.type === 'textarea'"
          v-model="form[field.key] as string"
          type="textarea"
          :rows="3"
          :placeholder="field.placeholder"
          :disabled="field.disabled"
          @change="onChange"
        />
        <el-input-number
          v-else-if="field.type === 'number'"
          v-model="form[field.key] as number"
          :disabled="field.disabled"
          @change="onChange"
        />
        <el-select
          v-else-if="field.type === 'select'"
          v-model="form[field.key]"
          :placeholder="field.placeholder || `请选择${field.label}`"
          :disabled="field.disabled"
          style="width: 100%"
          @change="onChange"
        >
          <el-option
            v-for="opt in field.options || []"
            :key="String(opt.value)"
            :label="opt.label"
            :value="opt.value"
          />
        </el-select>
        <el-switch
          v-else-if="field.type === 'switch'"
          v-model="form[field.key] as boolean"
          :disabled="field.disabled"
          @change="onChange"
        />
        <el-date-picker
          v-else
          v-model="form[field.key]"
          type="date"
          value-format="YYYY-MM-DD"
          :placeholder="field.placeholder || `请选择${field.label}`"
          :disabled="field.disabled"
          style="width: 100%"
          @change="onChange"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.apf-schema-lite-preview {
  padding: var(--spacing-sm, 8px) 0;
}
</style>
