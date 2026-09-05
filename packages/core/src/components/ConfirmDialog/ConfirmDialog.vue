<template>
  <AppDialog
    :model-value="modelValue"
    :title="title"
    :width="width"
    :loading="loading"
    :cancel-text="cancelText"
    :confirm-text="confirmText"
    @update:model-value="$emit('update:modelValue', $event)"
    @confirm="handleConfirm"
  >
    <div :class="$style.content">
      <AppIcon v-if="type === 'warning'" name="warning" :class="$style.icon" :style="{ color: 'var(--el-color-warning)' }" />
      <AppIcon v-else-if="type === 'danger'" name="circle-close-filled" :class="$style.icon" :style="{ color: 'var(--el-color-danger)' }" />
      <AppIcon v-else name="info-filled" :class="$style.icon" :style="{ color: 'var(--el-color-primary)' }" />
      <p :class="$style.message">{{ message }}</p>
    </div>
  </AppDialog>
</template>

<script setup lang="ts">
import AppDialog from '../AppDialog/AppDialog.vue'
import AppIcon from '../AppIcon/AppIcon.vue'

withDefaults(defineProps<{
  modelValue: boolean
  title?: string
  width?: string
  loading?: boolean
  message: string
  type?: 'info' | 'warning' | 'danger'
  cancelText?: string
  confirmText?: string
}>(), {
  title: '确认操作',
  width: '400px',
  loading: false,
  type: 'warning',
  cancelText: '取消',
  confirmText: '确定',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: []
}>()

function handleConfirm() {
  emit('confirm')
  emit('update:modelValue', false)
}
</script>

<style module>
.content {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-12px, 12px);
}

.icon {
  font-size: var(--font-size-24, 24px);
  flex-shrink: 0;
}

.message {
  margin: 0;
  color: var(--el-text-color-secondary);
  line-height: 1.6;
}
</style>
