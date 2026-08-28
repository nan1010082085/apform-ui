<template>
  <el-dialog
    :model-value="modelValue"
    :width="isFullscreen ? '100vw' : width"
    :fullscreen="isFullscreen"
    :style="isFullscreen ? { margin: 0 } : {}"
    :destroy-on-close="destroyOnClose"
    :draggable="draggable && !isFullscreen"
    :append-to-body="appendToBody"
    :close-on-click-modal="closeOnClickModal"
    :show-close="false"
    @update:model-value="emit('update:modelValue', $event)"
    @close="handleClose"
  >
    <template #header>
      <div :class="$style.header">
        <span :class="$style.title">{{ title }}</span>
        <div :class="$style.headerRight">
          <el-button
            v-if="showFullscreenBtn"
            :class="$style.headerBtn"
            :icon="isFullscreen ? ScaleToOriginal : FullScreen"
            text
            @click="toggleFullscreen"
          />
          <el-button
            :class="$style.headerBtn"
            :icon="Close"
            text
            @click="emit('update:modelValue', false)"
          />
        </div>
      </div>
    </template>
    <div :class="$style.body">
      <slot />
    </div>
    <template #footer>
      <div :class="$style.footer">
        <slot name="footer">
          <el-button @click="handleCancel">{{ cancelText }}</el-button>
          <el-button type="primary" :loading="loading" @click="handleConfirm">{{ confirmText }}</el-button>
        </slot>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FullScreen, ScaleToOriginal, Close } from '@element-plus/icons-vue'

withDefaults(defineProps<{
  modelValue: boolean
  title: string
  width?: string
  destroyOnClose?: boolean
  loading?: boolean
  draggable?: boolean
  appendToBody?: boolean
  showFullscreenBtn?: boolean
  closeOnClickModal?: boolean
  cancelText?: string
  confirmText?: string
}>(), {
  width: '580px',
  destroyOnClose: true,
  loading: false,
  draggable: true,
  appendToBody: true,
  showFullscreenBtn: true,
  closeOnClickModal: false,
  cancelText: '取消',
  confirmText: '确定',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'confirm': []
  'cancel': []
  'close': []
}>()

const isFullscreen = ref(false)

function toggleFullscreen() {
  isFullscreen.value = !isFullscreen.value
}

function handleConfirm() {
  emit('confirm')
}

function handleCancel() {
  emit('update:modelValue', false)
  emit('cancel')
}

function handleClose() {
  emit('close')
}
</script>

<style module>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: var(--spacing-md, 16px);
}

.title {
  font-size: var(--font-size-16, 16px);
  font-weight: var(--font-weight-semibold, 600);
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.headerRight {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs, 4px);
  flex-shrink: 0;
}

.headerBtn {
  width: var(--control-height-md, 32px);
  height: var(--control-height-md, 32px);
  font-size: var(--font-size-16, 16px);
  color: #fff !important;
}

.headerBtn:hover {
  background: transparent !important;
  color: #fff !important;
}

.body {
  max-height: calc(100vh - 220px);
  overflow-y: auto;
  overflow-x: hidden;
}

.footer {
  display: flex;
  justify-content: flex-end;
  padding-right: var(--spacing-20px, 20px);
}
</style>
