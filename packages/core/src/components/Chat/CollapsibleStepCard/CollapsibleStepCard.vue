<script setup lang="ts">
/**
 * CollapsibleStepCard — 对话步骤可折叠壳（工具调用 / 通用步骤）
 */
import { ref, watch } from 'vue'
import type { StepCardTone } from './types'

const props = withDefaults(
  defineProps<{
    title: string
    subtitle?: string
    badge?: string
    statusLabel?: string
    tone?: StepCardTone
    timestamp?: string
    defaultCollapsed?: boolean
    /** 受控折叠；不传则内部管理 */
    collapsed?: boolean
  }>(),
  {
    tone: 'default',
    defaultCollapsed: true,
  },
)

const emit = defineEmits<{
  'update:collapsed': [value: boolean]
}>()

const innerCollapsed = ref(props.collapsed ?? props.defaultCollapsed)

watch(
  () => props.collapsed,
  (v) => {
    if (v !== undefined) innerCollapsed.value = v
  },
)

const isCollapsed = () => (props.collapsed !== undefined ? props.collapsed : innerCollapsed.value)

function toggle(): void {
  const next = !isCollapsed()
  if (props.collapsed === undefined) innerCollapsed.value = next
  emit('update:collapsed', next)
}
</script>

<template>
  <div class="apf-step-card" :class="`is-${tone}`">
    <button type="button" class="apf-step-card__head" @click="toggle">
      <div class="apf-step-card__head-left">
        <span class="apf-step-card__icon" aria-hidden="true">
          <slot name="icon">
            <svg v-if="tone === 'error'" viewBox="0 0 16 16" width="14" height="14">
              <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" stroke-width="1.4" />
              <path d="M8 5v3.5M8 11h.01" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
            </svg>
            <svg v-else viewBox="0 0 16 16" width="14" height="14">
              <rect x="3" y="3" width="10" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.4" />
              <path d="M6 8h4M8 6v4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
            </svg>
          </slot>
        </span>
        <div class="apf-step-card__titles">
          <div class="apf-step-card__title">
            {{ title }}
            <span v-if="badge" class="apf-step-card__badge">{{ badge }}</span>
          </div>
          <div v-if="subtitle" class="apf-step-card__subtitle">{{ subtitle }}</div>
        </div>
      </div>
      <div class="apf-step-card__head-right">
        <span v-if="timestamp" class="apf-step-card__time">{{ timestamp }}</span>
        <span v-if="statusLabel" class="apf-step-card__status">
          <i class="apf-step-card__dot" />
          {{ statusLabel }}
        </span>
        <span class="apf-step-card__chevron" aria-hidden="true">{{ isCollapsed() ? '▾' : '▴' }}</span>
      </div>
    </button>
    <div v-show="!isCollapsed()" class="apf-step-card__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.apf-step-card {
  position: relative;
}

.apf-step-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  padding: 8px 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;
}

.apf-step-card__head:hover {
  opacity: 0.85;
}

.apf-step-card__head-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.apf-step-card__icon {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  flex-shrink: 0;
  color: var(--c-primary, #0060a2);
  background: var(--c-primary-soft, #eef5ff);
}

.is-error .apf-step-card__icon {
  color: var(--c-danger, #ff5252);
  background: rgba(255, 82, 82, 0.1);
}

.is-running .apf-step-card__icon {
  color: var(--c-warning, #f09700);
  background: rgba(255, 191, 0, 0.12);
}

.is-success .apf-step-card__icon {
  color: var(--c-success, #26a036);
  background: rgba(38, 160, 54, 0.1);
}

.apf-step-card__titles {
  min-width: 0;
}

.apf-step-card__title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--c-text, #303133);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.apf-step-card__badge {
  padding: 1px 6px;
  border-radius: 3px;
  font-size: 11px;
  font-weight: 500;
  background: var(--c-primary-soft, #eef5ff);
  color: var(--c-primary, #0060a2);
}

.apf-step-card__subtitle {
  margin-top: 2px;
  font-size: 11px;
  color: var(--c-text-muted, #909399);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.apf-step-card__head-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.apf-step-card__time {
  font-size: 11px;
  color: var(--c-text-muted, #909399);
}

.apf-step-card__status {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--c-text-secondary, #666);
}

.apf-step-card__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--c-success, #26a036);
}

.is-error .apf-step-card__dot {
  background: var(--c-danger, #ff5252);
}

.is-running .apf-step-card__dot {
  background: var(--c-warning, #f09700);
  animation: apf-step-pulse 1s ease-in-out infinite;
}

.apf-step-card__chevron {
  font-size: 12px;
  color: var(--c-text-muted, #909399);
}

.apf-step-card__body {
  padding: 0 0 8px 34px;
}

@keyframes apf-step-pulse {
  0%,
  100% {
    opacity: 0.35;
  }
  50% {
    opacity: 1;
  }
}
</style>
