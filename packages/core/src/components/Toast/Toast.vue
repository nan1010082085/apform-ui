<script setup lang="ts">
import { ref } from 'vue'

export interface ToastItem {
  id: number
  message: string
  type: 'info' | 'success' | 'error' | 'warning'
  removing?: boolean
}

const toasts = ref<ToastItem[]>([])
let nextId = 0

function add(message: string, type: ToastItem['type'] = 'info', duration = 3000): void {
  const id = nextId++
  toasts.value.push({ id, message, type })
  setTimeout(() => remove(id), duration)
}

function remove(id: number): void {
  const idx = toasts.value.findIndex(t => t.id === id)
  if (idx >= 0) {
    toasts.value[idx].removing = true
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, 300)
  }
}

function showToast(message: string, type: ToastItem['type'] = 'info', duration?: number): void {
  add(message, type, duration)
}

defineExpose({ show: showToast })
</script>

<template>
  <Teleport to="body">
    <div :class="$style.container">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="[$style.item, $style[toast.type], { [$style.removing]: toast.removing }]"
          @click="remove(toast.id)"
        >
          <span :class="$style.icon">
            <template v-if="toast.type === 'success'">&#10003;</template>
            <template v-else-if="toast.type === 'error'">&#10007;</template>
            <template v-else-if="toast.type === 'warning'">&#9888;</template>
            <template v-else>&#8505;</template>
          </span>
          <span :class="$style.msg">{{ toast.message }}</span>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style module>
.container {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: var(--z-index-toast, 1080);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm, 8px);
  pointer-events: none;
}

.item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm, 8px);
  padding: var(--spacing-10px, 10px) var(--spacing-20px, 20px);
  border-radius: var(--border-radius-8, 8px);
  font-size: var(--font-size-14, 14px);
  font-weight: var(--font-weight-medium, 500);
  pointer-events: auto;
  cursor: pointer;
  backdrop-filter: blur(12px);
  box-shadow: var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08));
  white-space: nowrap;
  max-width: 90vw;
  transition: all 0.3s ease;
}

.info {
  background: var(--color-info-bg, rgba(22, 119, 255, 0.08));
  color: var(--color-info, #4581E9);
  border: 1px solid var(--color-info-light, #E5EFF6);
}

.success {
  background: var(--color-success-bg, rgba(82, 196, 26, 0.1));
  color: var(--color-success, #26A036);
  border: 1px solid var(--color-success-light, #36B37E);
}

.warning {
  background: var(--color-warning-bg, rgba(255, 191, 0, 0.1));
  color: var(--color-warning, #F09700);
  border: 1px solid var(--color-warning-light, #FF6010);
}

.error {
  background: var(--color-danger-bg, rgba(255, 1, 1, 0.08));
  color: var(--color-danger, #E50113);
  border: 1px solid var(--color-danger-light, #FF6B55);
}

.removing {
  opacity: 0;
  transform: translateY(-16px) scale(0.95);
}

.icon {
  font-size: var(--font-size-14, 14px);
  flex-shrink: 0;
}

.msg {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

<style>
.toast-enter-active {
  transition: all 0.3s ease;
}

.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(-16px) scale(0.95);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-16px) scale(0.95);
}
</style>
