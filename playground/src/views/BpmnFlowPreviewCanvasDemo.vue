<script setup lang="ts">
import { FlowPreviewShell } from '@apform-ui/core'
import { BpmnFlowPreviewCanvas, type BpmnPreviewNode, type BpmnPreviewEdge } from '@apform-ui/core/bpmn'

const nodes: BpmnPreviewNode[] = [
  { id: 's1', type: 'start-event', position: { x: 80, y: 40 }, data: { label: '开始', bpmnType: 'startEvent' } },
  { id: 't1', type: 'task', position: { x: 60, y: 140 }, data: { label: '填写申请', bpmnType: 'userTask' } },
  { id: 'g1', type: 'gateway', position: { x: 90, y: 240 }, data: { label: '审批', bpmnType: 'exclusiveGateway' } },
  { id: 'e1', type: 'end-event', position: { x: 80, y: 340 }, data: { label: '结束', bpmnType: 'endEvent' } },
]

const edges: BpmnPreviewEdge[] = [
  { id: 'e-s-t', source: 's1', target: 't1' },
  { id: 'e-t-g', source: 't1', target: 'g1' },
  { id: 'e-g-e', source: 'g1', target: 'e1', label: '通过' },
]
</script>

<template>
  <FlowPreviewShell title="请假审批" badge="4 节点 / 3 连线" primary-action="确认发布" secondary-action="打开编辑器">
    <div style="height: 360px">
      <BpmnFlowPreviewCanvas :nodes="nodes" :edges="edges" />
    </div>
  </FlowPreviewShell>
</template>
