<script setup lang="ts">
/**
 * SectionToggle — 可折叠属性分区
 */
import { ref } from 'vue'
import { AppIcon } from '../AppIcon'

const props = withDefaults(
  defineProps<{
    title: string
    count?: number
    defaultOpen?: boolean
  }>(),
  { defaultOpen: true },
)

const isOpen = ref(props.defaultOpen)

function toggle() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="apf-section-toggle">
    <button type="button" class="apf-section-toggle__header" @click="toggle">
      <AppIcon :name="isOpen ? 'arrow-down' : 'arrow-right'" :size="12" class="apf-section-toggle__arrow" />
      <span class="apf-section-toggle__label">{{ title }}</span>
      <span v-if="count !== undefined" class="apf-section-toggle__count">{{ count }}</span>
    </button>
    <div v-show="isOpen" class="apf-section-toggle__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.apf-section-toggle {
  margin-bottom: 8px;
}

.apf-section-toggle__header {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 8px 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font: inherit;
}

.apf-section-toggle__arrow {
  color: var(--text-color-secondary, #909399);
}

.apf-section-toggle__label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color-title, #303133);
}

.apf-section-toggle__count {
  margin-left: auto;
  font-size: 12px;
  color: var(--text-color-secondary, #909399);
}

.apf-section-toggle__body {
  padding-left: 4px;
}
</style>
