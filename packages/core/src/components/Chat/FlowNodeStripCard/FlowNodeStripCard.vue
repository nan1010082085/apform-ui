<script setup lang="ts">
/**
 * FlowNodeStripCard — 流程节点条结果卡
 */
import type { FlowStripNode } from './types'

const props = withDefaults(
  defineProps<{
    title: string
    nodes: FlowStripNode[]
    badgeLabel?: string
    primaryAction?: string
    secondaryAction?: string
    compact?: boolean
  }>(),
  { compact: false },
)

const emit = defineEmits<{
  'primary-action': []
  'secondary-action': []
}>()

const badgeText = () => props.badgeLabel || `${props.nodes.length} 个节点`
</script>

<template>
  <div class="apf-flow-strip" :class="{ 'is-compact': compact }">
    <div class="apf-flow-strip__head">
      <div class="apf-flow-strip__head-left">
        <span class="apf-flow-strip__icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="14" height="14">
            <circle cx="4" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1.3" />
            <circle cx="12" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1.3" />
            <path d="M6 8h4" fill="none" stroke="currentColor" stroke-width="1.3" />
          </svg>
        </span>
        <span class="apf-flow-strip__title">{{ title }}</span>
      </div>
      <span class="apf-flow-strip__badge">{{ badgeText() }}</span>
    </div>
    <div class="apf-flow-strip__body">
      <template v-for="(node, idx) in nodes" :key="idx">
        <div v-if="idx > 0" class="apf-flow-strip__arrow" aria-hidden="true" />
        <div class="apf-flow-strip__node" :data-type="node.type">{{ node.label }}</div>
      </template>
    </div>
    <div v-if="!compact && (primaryAction || secondaryAction)" class="apf-flow-strip__actions">
      <button
        v-if="secondaryAction"
        type="button"
        class="apf-flow-strip__btn is-ghost"
        @click="emit('secondary-action')"
      >
        {{ secondaryAction }}
      </button>
      <button
        v-if="primaryAction"
        type="button"
        class="apf-flow-strip__btn is-primary"
        @click="emit('primary-action')"
      >
        {{ primaryAction }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.apf-flow-strip {
  border: 1px solid var(--c-border, #ebedf3);
  border-radius: 12px;
  overflow: hidden;
  background: var(--c-surface, #fff);
}

.apf-flow-strip__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 12px 16px;
  background: var(--c-bg-muted, #f5f7fa);
  border-bottom: 1px solid var(--c-border, #ebedf3);
}

.apf-flow-strip__head-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.apf-flow-strip__icon {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  color: var(--c-primary, #0060a2);
  background: var(--c-primary-soft, #eef5ff);
}

.apf-flow-strip__title {
  font-size: 13px;
  font-weight: 600;
}

.apf-flow-strip__badge {
  font-size: 11px;
  color: var(--c-text-muted, #909399);
}

.apf-flow-strip__body {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  padding: 12px;
}

.apf-flow-strip__node {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  border: 1px solid var(--c-border, #ebedf3);
  background: var(--c-bg-muted, #f7fafa);
}

.apf-flow-strip__node[data-type='start'] {
  border-color: var(--c-success, #26a036);
  color: var(--c-success, #26a036);
}

.apf-flow-strip__node[data-type='end'] {
  border-color: var(--c-danger, #e50113);
  color: var(--c-danger, #e50113);
}

.apf-flow-strip__arrow {
  width: 16px;
  height: 1px;
  background: var(--c-border, #d5dde3);
}

.apf-flow-strip__actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 10px 12px;
  border-top: 1px solid var(--c-border, #ebedf3);
}

.apf-flow-strip__btn {
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
}

.apf-flow-strip__btn.is-ghost {
  border: 1px solid var(--c-border, #ebedf3);
  background: transparent;
}

.apf-flow-strip__btn.is-primary {
  border: none;
  background: var(--c-primary, #0060a2);
  color: #fff;
}
</style>
