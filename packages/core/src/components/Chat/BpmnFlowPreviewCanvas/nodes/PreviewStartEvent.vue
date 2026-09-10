<script setup lang="ts">
/**
 * PreviewStartEvent — BPMN 开始事件预览节点（需 peer @vue-flow/core）
 */
import { Handle, Position } from '@vue-flow/core'
import type { BpmnPreviewNodeData } from '../types'

defineProps<{ data: BpmnPreviewNodeData }>()
</script>

<template>
  <div class="apf-bpmn-node">
    <div class="apf-bpmn-start">
      <div class="apf-bpmn-start__inner" />
    </div>
    <div class="apf-bpmn-node__label">{{ data.label }}</div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>

<style scoped>
.apf-bpmn-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.apf-bpmn-start {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--c-success, #52c41a) 15%, transparent);
  border: 2px solid var(--c-success, #52c41a);
  display: flex;
  align-items: center;
  justify-content: center;
}

.apf-bpmn-start__inner {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--c-success, #52c41a);
}

.apf-bpmn-node__label {
  font-size: 11px;
  color: var(--c-text-primary, #333);
  white-space: nowrap;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
