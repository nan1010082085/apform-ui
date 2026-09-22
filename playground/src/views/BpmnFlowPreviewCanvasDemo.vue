<script setup lang="ts">
/**
 * BpmnFlowPreviewCanvas 文档示例 — 节点/边样式对齐 flow 设计器
 *
 * 与真实用法一致：画布直接放进 FlowPreviewShell，高度由壳的 canvasWrapper（280px）约束，
 * 勿再包一层更高的容器，否则会溢出盖住底部操作按钮。
 */
import { FlowPreviewShell } from '@apform-ui/core'
import { BpmnFlowPreviewCanvas, type BpmnPreviewNode, type BpmnPreviewEdge } from '@apform-ui/core/bpmn'
import DemoBlock from '../components/DemoBlock.vue'

/** 卡片宽约 200px；fitView 会缩放到壳内可视区 */
const nodes: BpmnPreviewNode[] = [
  { id: 's1', type: 'start-event', position: { x: 220, y: 16 }, data: { label: '开始', bpmnType: 'startEvent' } },
  { id: 't1', type: 'task', position: { x: 220, y: 100 }, data: { label: '填写申请', bpmnType: 'userTask' } },
  { id: 'g1', type: 'gateway', position: { x: 296, y: 200 }, data: { label: '审批', bpmnType: 'exclusiveGateway' } },
  { id: 't2', type: 'task', position: { x: 40, y: 310 }, data: { label: '部门经理审批', bpmnType: 'userTask' } },
  { id: 't3', type: 'task', position: { x: 400, y: 310 }, data: { label: '退回修改', bpmnType: 'userTask' } },
  { id: 'e1', type: 'end-event', position: { x: 40, y: 420 }, data: { label: '通过', bpmnType: 'endEvent' } },
  { id: 'e2', type: 'end-event', position: { x: 400, y: 420 }, data: { label: '结束', bpmnType: 'endEvent' } },
]

const edges: BpmnPreviewEdge[] = [
  { id: 'e-s-t', source: 's1', target: 't1' },
  { id: 'e-t-g', source: 't1', target: 'g1' },
  { id: 'e-g-ok', source: 'g1', target: 't2', label: '同意' },
  { id: 'e-g-no', source: 'g1', target: 't3', label: '驳回' },
  { id: 'e-ok-e', source: 't2', target: 'e1' },
  { id: 'e-no-e', source: 't3', target: 'e2' },
  { id: 'e-no-back', source: 't3', target: 't1', label: '重填' },
]

const basicSource = `<FlowPreviewShell
  title="请假审批"
  badge="7 节点 / 7 连线"
  primary-action="确认发布"
  secondary-action="打开编辑器"
>
  <BpmnFlowPreviewCanvas :nodes="nodes" :edges="edges" />
</FlowPreviewShell>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="预览节点/边与 flow 设计器同视觉：白底任务卡、开始/结束胶囊、菱形网关、灰色虚线边。画布高度由 FlowPreviewShell 约束（默认 280px），与业务侧 FlowPreviewCard 用法一致。"
      :source="basicSource"
    >
      <FlowPreviewShell
        title="请假审批"
        badge="7 节点 / 7 连线"
        primary-action="确认发布"
        secondary-action="打开编辑器"
      >
        <BpmnFlowPreviewCanvas :nodes="nodes" :edges="edges" />
      </FlowPreviewShell>
    </DemoBlock>
  </div>
</template>
