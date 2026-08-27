<template>
  <AppDialog
    :model-value="modelValue"
    :title="title"
    :width="width"
    :loading="loading"
    :show-fullscreen-btn="showFullscreenBtn"
    :cancel-text="cancelText"
    :confirm-text="confirmText"
    @update:model-value="$emit('update:modelValue', $event)"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      :label-width="labelWidth"
    >
      <slot :form="formData" />
    </el-form>
  </AppDialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import AppDialog from '../AppDialog/AppDialog.vue'

const props = withDefaults(defineProps<{
  modelValue: boolean
  title: string
  width?: string
  loading?: boolean
  labelWidth?: string
  formData: Record<string, unknown>
  rules?: FormRules
  showFullscreenBtn?: boolean
  cancelText?: string
  confirmText?: string
}>(), {
  width: '500px',
  loading: false,
  labelWidth: '100px',
  rules: () => ({}),
  showFullscreenBtn: false,
  cancelText: '取消',
  confirmText: '确定',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  submit: [data: Record<string, unknown>]
  cancel: []
}>()

const formRef = ref<FormInstance>()

async function handleConfirm() {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    emit('submit', { ...props.formData })
  } catch {
    // Validation failed
  }
}

function handleCancel() {
  emit('cancel')
}

watch(() => props.modelValue, (visible) => {
  if (visible) {
    formRef.value?.clearValidate()
  }
})
</script>
