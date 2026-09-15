<script setup lang="ts">
/**
 * PreviewStartEvent — 对齐 flow 设计器开始事件卡片
 */
import { Handle, Position } from '@vue-flow/core'
import { AppIcon } from '../../../AppIcon'
import type { BpmnPreviewNodeData } from '../types'

defineProps<{ data: BpmnPreviewNodeData }>()
</script>

<template>
  <div class="apf-bpmn-start">
    <AppIcon name="video-play" class="apf-bpmn-start__icon" :size="18" />
    <span class="apf-bpmn-start__label">{{ data.label || '开始' }}</span>
    <Handle type="source" :position="Position.Bottom" class="apf-bpmn-handle" />
  </div>
</template>

<style scoped>
.apf-bpmn-start {
  width: 200px;
  height: 44px;
  box-sizing: border-box;
  background: var(--color-success-bg, #f0f9eb);
  border: 1px solid var(--color-success, #67c23a);
  border-radius: 22px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
  position: relative;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.08);
}

.apf-bpmn-start__icon {
  color: var(--color-success, #67c23a);
  flex-shrink: 0;
}

.apf-bpmn-start__label {
  font-size: 13px;
  color: var(--color-success, #67c23a);
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
