<script setup lang="ts">
/**
 * PreviewEndEvent — BPMN 结束事件预览节点（需 peer @vue-flow/core）
 */
import { Handle, Position } from '@vue-flow/core'
import type { BpmnPreviewNodeData } from '../types'

defineProps<{ data: BpmnPreviewNodeData }>()
</script>

<template>
  <div class="apf-bpmn-node">
    <Handle type="target" :position="Position.Top" />
    <div class="apf-bpmn-end">
      <div class="apf-bpmn-end__inner" />
    </div>
    <div class="apf-bpmn-node__label">{{ data.label }}</div>
  </div>
</template>

<style scoped>
.apf-bpmn-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.apf-bpmn-end {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--c-danger, #e50113) 8%, transparent);
  border: 2px solid var(--c-danger, #e50113);
  display: flex;
  align-items: center;
  justify-content: center;
}

.apf-bpmn-end__inner {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--c-danger, #e50113);
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
