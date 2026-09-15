<script setup lang="ts">
/**
 * PreviewGateway — 对齐 flow 设计器排他网关菱形
 */
import { computed } from 'vue'
import { Handle, Position } from '@vue-flow/core'
import type { BpmnPreviewNodeData } from '../types'

const props = defineProps<{ data: BpmnPreviewNodeData }>()

const symbol = computed(() => {
  const map: Record<string, string> = {
    exclusiveGateway: 'X',
    parallelGateway: '+',
    inclusiveGateway: 'O',
  }
  return map[props.data.bpmnType] || 'X'
})
</script>

<template>
  <div class="apf-bpmn-gateway">
    <Handle type="target" :position="Position.Top" class="apf-bpmn-handle" />
    <div class="apf-bpmn-gateway__diamond">
      <span class="apf-bpmn-gateway__symbol">{{ symbol }}</span>
    </div>
    <Handle type="source" :position="Position.Bottom" class="apf-bpmn-handle" />
    <Handle id="left" type="source" :position="Position.Left" class="apf-bpmn-handle" />
    <Handle id="right" type="source" :position="Position.Right" class="apf-bpmn-handle" />
    <div v-if="data.label" class="apf-bpmn-gateway__label">{{ data.label }}</div>
  </div>
</template>

<style scoped>
.apf-bpmn-gateway {
  width: 48px;
  height: 48px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 1px 3px rgba(15, 23, 42, 0.12));
}

.apf-bpmn-gateway__diamond {
  width: 34px;
  height: 34px;
  background: var(--color-warning-bg, #fdf6ec);
  border: 1.5px solid var(--color-warning, #e6a23c);
  transform: rotate(45deg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.apf-bpmn-gateway__symbol {
  transform: rotate(-45deg);
  font-size: 16px;
  font-weight: 700;
  color: var(--color-warning, #e6a23c);
  line-height: 1;
}

.apf-bpmn-gateway__label {
  position: absolute;
  top: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  color: var(--text-color-regular, #606266);
  white-space: nowrap;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
}

.apf-bpmn-handle {
  width: 10px;
  height: 10px;
  background: var(--bg-color, #fff);
  border: 1px solid var(--color-primary, #409eff);
}
</style>
