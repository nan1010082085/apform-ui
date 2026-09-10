<script setup lang="ts">
/**
 * PreviewTask — BPMN 任务预览节点（需 peer @vue-flow/core）
 */
import { Handle, Position } from '@vue-flow/core'
import type { BpmnPreviewNodeData } from '../types'

defineProps<{ data: BpmnPreviewNodeData }>()

const taskIcons: Record<string, string> = {
  userTask: '👤',
  serviceTask: '⚙',
  scriptTask: '📜',
  sendTask: '📤',
  receiveTask: '📥',
}
</script>

<template>
  <div class="apf-bpmn-node">
    <Handle type="target" :position="Position.Top" />
    <div class="apf-bpmn-task">
      <span class="apf-bpmn-task__icon">{{ taskIcons[data.bpmnType] || '📋' }}</span>
      <span class="apf-bpmn-task__label">{{ data.label }}</span>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>

<style scoped>
.apf-bpmn-node {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.apf-bpmn-task {
  min-width: 100px;
  max-width: 160px;
  padding: 8px 12px;
  background: color-mix(in srgb, var(--c-info, #4581e9) 8%, transparent);
  border: 1.5px solid var(--c-info, #4581e9);
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.apf-bpmn-task__icon {
  font-size: 14px;
  flex-shrink: 0;
}

.apf-bpmn-task__label {
  font-size: 11px;
  color: var(--c-text-primary, #333);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
