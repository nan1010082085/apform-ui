/**
 * BpmnFlowPreviewCanvas 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** BpmnFlowPreviewCanvas 文档 */
export const BpmnFlowPreviewCanvasDoc: ComponentDoc = {
  name: 'BpmnFlowPreviewCanvas',
  description:
    'BPMN 流程预览画布（VueFlow）。须从 `@apform-ui/core/bpmn` 引入，并安装 `@vue-flow/core` / `background` / `controls` peer。不包含卡片壳，可与 FlowPreviewShell 组合。',
  props: [
    { name: 'nodes', type: 'BpmnPreviewNode[]', required: true, description: '预览节点列表' },
    { name: 'edges', type: 'BpmnPreviewEdge[]', required: true, description: '预览边列表' },
    {
      name: 'flowId',
      type: 'string',
      description: 'VueFlow 实例 id；不传则组件内自动生成且生命周期内稳定',
    },
  ],
  emits: [
    { name: 'node-click', payload: 'nodeId: string, data: BpmnPreviewNodeData', description: '节点点击' },
    { name: 'fit-view', description: '适配视口完成' },
  ],
  slots: [],
}
