<script setup lang="ts">
/**
 * TaskChainBar — 多代理任务链进度条（纯 UI）
 */
import { nextTick, ref, watch } from 'vue'
import type { TaskChainStepItem, TaskChainStepStatus } from './types'

const props = withDefaults(
  defineProps<{
    steps: TaskChainStepItem[]
    currentIndex: number
    /** 左侧标签文案 */
    label?: string
  }>(),
  { label: '任务链' },
)

const scrollbarRef = ref<HTMLElement>()

/**
 * @param status - 步骤状态
 */
function getStepIcon(status: TaskChainStepStatus | undefined): string {
  switch (status) {
    case 'done':
      return '✓'
    case 'running':
      return '●'
    case 'skipped':
      return '○'
    case 'error':
      return '!'
    default:
      return '○'
  }
}

/**
 * @param agent - 代理标识
 */
function getAgentLabel(agent: string): string {
  if (agent === 'editor') return '表单'
  if (agent === 'flow') return '流程'
  if (agent === 'page') return '页面'
  return agent
}

watch(
  () => props.currentIndex,
  () => {
    nextTick(() => {
      const wrap = scrollbarRef.value
      if (!wrap) return
      const stepEls = wrap.querySelectorAll<HTMLElement>('[data-step]')
      const current = stepEls[props.currentIndex]
      if (current) {
        current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    })
  },
)
</script>

<template>
  <div class="apf-task-chain">
    <div class="apf-task-chain__label">{{ label }}</div>
    <div ref="scrollbarRef" class="apf-task-chain__scroll">
      <div class="apf-task-chain__steps">
        <template v-for="(step, idx) in steps" :key="idx">
          <div
            :data-step="idx"
            class="apf-task-chain__step"
            :class="[
              step.status ? `is-${step.status}` : 'is-pending',
              { 'is-current': idx === currentIndex },
            ]"
          >
            <span class="apf-task-chain__icon">{{ getStepIcon(step.status) }}</span>
            <span class="apf-task-chain__agent">{{ getAgentLabel(step.agent) }}</span>
            <span class="apf-task-chain__desc">{{ step.description }}</span>
          </div>
          <div v-if="idx < steps.length - 1" class="apf-task-chain__arrow">→</div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.apf-task-chain {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm, 8px);
  padding: 6px var(--spacing-12px, 12px);
  background: color-mix(in srgb, var(--c-primary, #0060a2) 4%, transparent);
  border-bottom: 1px solid var(--c-border-soft, #ebedf3);
  font-size: var(--font-size-12, 12px);
}

.apf-task-chain__label {
  font-weight: var(--font-weight-semibold, 600);
  color: var(--c-text-muted, #999);
  flex-shrink: 0;
  font-size: var(--font-size-11, 11px);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.apf-task-chain__scroll {
  flex: 1;
  min-width: 0;
  overflow-x: auto;
}

.apf-task-chain__scroll::-webkit-scrollbar {
  height: 4px;
}

.apf-task-chain__scroll::-webkit-scrollbar-thumb {
  background: color-mix(in srgb, var(--c-primary, #0060a2) 15%, transparent);
  border-radius: 2px;
}

.apf-task-chain__steps {
  display: flex;
  align-items: center;
  gap: 6px;
}

.apf-task-chain__step {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: var(--radius-sm, 6px);
  background: var(--c-surface-muted, #f5f7fa);
  white-space: nowrap;
  color: var(--c-text-secondary, #666);
}

.apf-task-chain__step.is-current {
  background: var(--c-primary-soft, #e8f4ff);
  color: var(--c-text-primary, #333);
  font-weight: var(--font-weight-semibold, 600);
}

.apf-task-chain__step.is-done {
  opacity: 0.7;
}

.apf-task-chain__step.is-running {
  background: color-mix(in srgb, var(--c-primary, #0060a2) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--c-primary, #0060a2) 20%, transparent);
  color: var(--c-primary, #0060a2);
}

.apf-task-chain__step.is-error {
  background: var(--c-danger-soft, #fff8f7);
  color: var(--c-danger, #e50113);
}

.apf-task-chain__icon {
  font-size: 10px;
}

.apf-task-chain__step.is-current .apf-task-chain__icon {
  animation: apf-task-chain-pulse 1.2s infinite;
}

@keyframes apf-task-chain-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

.apf-task-chain__agent {
  font-weight: var(--font-weight-semibold, 600);
  font-size: var(--font-size-11, 11px);
}

.apf-task-chain__desc {
  font-size: var(--font-size-11, 11px);
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.apf-task-chain__arrow {
  color: var(--c-text-muted, #999);
  font-size: var(--font-size-12, 12px);
}
</style>
