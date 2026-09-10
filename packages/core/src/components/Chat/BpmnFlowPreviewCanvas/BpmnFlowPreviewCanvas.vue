<script setup lang="ts">
/**
 * BpmnFlowPreviewCanvas — BPMN 流程预览画布（VueFlow + 预览节点）
 *
 * 需 peer：@vue-flow/core、@vue-flow/background、@vue-flow/controls。
 * 不包含卡片壳；与 FlowPreviewShell 组合使用。
 */
import { computed, nextTick, watch } from 'vue'
import { VueFlow, useVueFlow, MarkerType } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/controls/dist/style.css'
import PreviewStartEvent from './nodes/PreviewStartEvent.vue'
import PreviewEndEvent from './nodes/PreviewEndEvent.vue'
import PreviewTask from './nodes/PreviewTask.vue'
import PreviewGateway from './nodes/PreviewGateway.vue'
import type { BpmnPreviewEdge, BpmnPreviewNode } from './types'

const props = withDefaults(
  defineProps<{
    nodes: BpmnPreviewNode[]
    edges: BpmnPreviewEdge[]
    /** VueFlow 实例 id；不传则自动生成（组件生命周期内稳定） */
    flowId?: string
  }>(),
  {},
)

const emit = defineEmits<{
  'node-click': [nodeId: string, data: BpmnPreviewNode['data']]
  'fit-view': []
}>()

const instanceId =
  props.flowId ?? `apf-bpmn-preview-${Math.random().toString(36).slice(2, 8)}`

const vfNodes = computed(() =>
  props.nodes.map((n) => ({
    id: n.id,
    type: n.type,
    position: n.position,
    data: n.data,
    draggable: true,
  })),
)

const vfEdges = computed(() =>
  props.edges.map((e) => ({
    id: e.id,
    source: e.source,
    target: e.target,
    label: e.label,
    type: 'smoothstep' as const,
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'var(--c-info, #4581e9)', strokeWidth: 1.5 },
  })),
)

const { onNodeClick, fitView } = useVueFlow({ id: instanceId })

onNodeClick(({ node }: { node: { id: string; data: BpmnPreviewNode['data'] } }) => {
  emit('node-click', node.id, node.data)
})

/**
 * 适配视口
 */
function handleFitView(): void {
  fitView({ padding: 0.2 })
  emit('fit-view')
}

watch(
  () => [props.nodes, props.edges],
  async () => {
    await nextTick()
    setTimeout(() => fitView({ padding: 0.2 }), 100)
  },
  { deep: true },
)

defineExpose({ fitView: handleFitView })
</script>

<template>
  <VueFlow
    :id="instanceId"
    :nodes="vfNodes"
    :edges="vfEdges"
    :nodes-draggable="true"
    :nodes-connectable="false"
    :edges-updatable="false"
    :elements-selectable="true"
    :default-viewport="{ zoom: 0.8, x: 0, y: 0 }"
    :min-zoom="0.2"
    :max-zoom="2"
    fit-view-on-init
    class="apf-bpmn-canvas"
  >
    <template #node-start-event="nodeProps">
      <PreviewStartEvent v-bind="nodeProps" />
    </template>
    <template #node-end-event="nodeProps">
      <PreviewEndEvent v-bind="nodeProps" />
    </template>
    <template #node-task="nodeProps">
      <PreviewTask v-bind="nodeProps" />
    </template>
    <template #node-gateway="nodeProps">
      <PreviewGateway v-bind="nodeProps" />
    </template>

    <Background :gap="16" :size="0.6" color="#e0e5ec" />
    <Controls :show-interactive="false" />
  </VueFlow>
</template>

<style scoped>
.apf-bpmn-canvas {
  width: 100%;
  height: 100%;
}
</style>
