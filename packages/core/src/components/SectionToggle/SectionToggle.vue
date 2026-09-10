<script setup lang="ts">
/**
 * SectionToggle — 可折叠属性分区
 *
 * 视觉完整对齐 editor 属性栏 `.section*`（主色浅边框、灰底 body、计数徽章）。
 */
import { ref, watch } from 'vue'
import { AppIcon } from '../AppIcon'

const props = withDefaults(
  defineProps<{
    title: string
    count?: number
    defaultOpen?: boolean
    /** 受控展开（传入时优先于内部 state） */
    open?: boolean
  }>(),
  { defaultOpen: true },
)

const emit = defineEmits<{
  /** 展开状态变化 */
  'update:open': [value: boolean]
  toggle: [value: boolean]
}>()

const isOpen = ref(props.open ?? props.defaultOpen)

watch(
  () => props.open,
  (val) => {
    if (val !== undefined) isOpen.value = val
  },
)

watch(
  () => props.defaultOpen,
  (val) => {
    if (props.open === undefined) isOpen.value = val
  },
)

function toggle() {
  const next = !isOpen.value
  isOpen.value = next
  emit('update:open', next)
  emit('toggle', next)
}
</script>

<template>
  <div class="apf-section-toggle">
    <button type="button" class="apf-section-toggle__header" @click="toggle">
      <AppIcon
        :name="isOpen ? 'arrow-down' : 'arrow-right'"
        :size="12"
        class="apf-section-toggle__arrow"
      />
      <span class="apf-section-toggle__label">{{ title }}</span>
      <span v-if="count !== undefined" class="apf-section-toggle__count">{{ count }}</span>
    </button>
    <div v-show="isOpen" class="apf-section-toggle__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* 对齐 editor/src/components/Editor/style.module.scss .section* */
.apf-section-toggle {
  border-bottom: 1px solid var(--color-primary-lighter, #d9ecff);
  overflow: hidden;
  margin: 0;
  border-radius: 0;
  background: transparent;
}

.apf-section-toggle__header {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 8px 16px;
  border: 0;
  border-radius: 0;
  background: transparent;
  cursor: pointer;
  user-select: none;
  text-align: left;
  font: inherit;
  color: var(--text-color-primary, #303133);
  transition: background 0.15s;
}

.apf-section-toggle__header:hover {
  background: var(--color-primary-lighter, #d9ecff);
}

.apf-section-toggle__arrow {
  color: var(--text-color-placeholder, #c0c4cc);
  flex-shrink: 0;
}

.apf-section-toggle__label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-color-primary, #303133);
  flex: 1;
  min-width: 0;
}

.apf-section-toggle__count {
  font-size: 11px;
  color: var(--text-color-placeholder, #c0c4cc);
  background: var(--color-primary-lighter, #d9ecff);
  border-radius: 8px;
  padding: 0 6px;
  line-height: 18px;
  flex-shrink: 0;
}

.apf-section-toggle__body {
  padding: 8px 16px;
  background: var(--bg-color-gray, #f5f7fa);
  border-top: 1px solid var(--color-primary-lighter, #d9ecff);
  overflow: hidden;
}
</style>
