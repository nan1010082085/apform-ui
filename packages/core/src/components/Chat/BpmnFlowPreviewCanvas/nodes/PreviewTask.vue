<script setup lang="ts">
/**
 * PreviewTask — 对齐 flow 设计器任务卡片（UserTask 等）
 */
import { computed } from 'vue'
import { Handle, Position } from '@vue-flow/core'
import { AppIcon } from '../../../AppIcon'
import type { BpmnPreviewNodeData } from '../types'

const props = defineProps<{ data: BpmnPreviewNodeData }>()

/** bpmnType → AppIcon name（与 flow 设计器一致） */
const iconName = computed(() => {
  const map: Record<string, string> = {
    userTask: 'user',
    serviceTask: 'set-up',
    scriptTask: 'document',
    sendTask: 'promotion',
    receiveTask: 'message',
  }
  return map[props.data.bpmnType] || 'user'
})
</script>

<template>
  <div class="apf-bpmn-task">
    <Handle type="target" :position="Position.Top" class="apf-bpmn-handle" />
    <AppIcon :name="iconName" class="apf-bpmn-task__icon" :size="18" />
    <span class="apf-bpmn-task__label">{{ data.label || '用户任务' }}</span>
    <Handle type="source" :position="Position.Bottom" class="apf-bpmn-handle" />
  </div>
</template>

<style scoped>
.apf-bpmn-task {
  width: 200px;
  height: 48px;
  box-sizing: border-box;
  background: var(--bg-color, #fff);
  border: 1px solid var(--border-color-lighter, #ebeef5);
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
  position: relative;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.08);
}

.apf-bpmn-task__icon {
  color: var(--color-primary, #409eff);
  flex-shrink: 0;
}

.apf-bpmn-task__label {
  font-size: 13px;
  color: var(--text-color-primary, #303133);
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
