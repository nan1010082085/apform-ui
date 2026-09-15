<script setup lang="ts">
/**
 * PreviewEndEvent — 对齐 flow 设计器结束事件卡片
 */
import { Handle, Position } from '@vue-flow/core'
import { AppIcon } from '../../../AppIcon'
import type { BpmnPreviewNodeData } from '../types'

defineProps<{ data: BpmnPreviewNodeData }>()
</script>

<template>
  <div class="apf-bpmn-end">
    <Handle type="target" :position="Position.Top" class="apf-bpmn-handle" />
    <AppIcon name="switch-button" class="apf-bpmn-end__icon" :size="18" />
    <span class="apf-bpmn-end__label">{{ data.label || '结束' }}</span>
  </div>
</template>

<style scoped>
.apf-bpmn-end {
  width: 200px;
  height: 44px;
  box-sizing: border-box;
  background: var(--color-danger-bg, #fef0f0);
  border: 1px solid var(--color-danger, #f56c6c);
  border-radius: 22px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
  position: relative;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.08);
}

.apf-bpmn-end__icon {
  color: var(--color-danger, #f56c6c);
  flex-shrink: 0;
}

.apf-bpmn-end__label {
  font-size: 13px;
  color: var(--color-danger, #f56c6c);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.apf-bpmn-handle {
  width: 10px;
  height: 10px;
  background: var(--bg-color, #fff);
  border: 1px solid var(--color-primary, #409eff);
}
</style>
