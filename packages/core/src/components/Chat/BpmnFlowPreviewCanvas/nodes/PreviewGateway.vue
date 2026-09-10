<script setup lang="ts">
/**
 * PreviewGateway — BPMN 网关预览节点（需 peer @vue-flow/core）
 */
import { Handle, Position } from '@vue-flow/core'
import type { BpmnPreviewNodeData } from '../types'

defineProps<{ data: BpmnPreviewNodeData }>()

const gatewayIcons: Record<string, string> = {
  exclusiveGateway: '✕',
  parallelGateway: '+',
  inclusiveGateway: '◎',
}
</script>

<template>
  <div class="apf-bpmn-node">
    <Handle type="target" :position="Position.Top" />
    <div class="apf-bpmn-gateway">
      <span class="apf-bpmn-gateway__icon">{{ gatewayIcons[data.bpmnType] || '◆' }}</span>
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

.apf-bpmn-gateway {
  width: 32px;
  height: 32px;
  background: color-mix(in srgb, var(--c-warning, #faad14) 10%, transparent);
  border: 1.5px solid var(--c-warning, #faad14);
  transform: rotate(45deg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.apf-bpmn-gateway__icon {
  transform: rotate(-45deg);
  font-size: 14px;
  color: var(--c-warning, #faad14);
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
