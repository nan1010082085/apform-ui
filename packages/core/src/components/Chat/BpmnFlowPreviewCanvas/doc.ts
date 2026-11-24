/**
 * BpmnFlowPreviewCanvas 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** BpmnFlowPreviewCanvas 文档 */
export const BpmnFlowPreviewCanvasDoc: ComponentDoc = {
  name: 'BpmnFlowPreviewCanvas',
  titleZh: 'BPMN 预览画布',
  description:
    '仅从 @apform-ui/core/bpmn 引入。需安装 @vue-flow/core|background|controls，并引入 vue-flow 自带 CSS + @apform-ui/core/bpmn.css（顺序：vue-flow → bpmn.css）。缺 peer 时为空态提示。',
  props: [
    { name: 'nodes', type: 'BpmnPreviewNode[]', required: true, description: '节点' },
    { name: 'edges', type: 'BpmnPreviewEdge[]', required: true, description: '边' },
    { name: 'flowId', type: 'string', description: 'VueFlow 实例 id；不传则自动生成' },
  ],
  emits: [
    { name: 'node-click', payload: 'nodeId, data', description: '节点点击，可联动产物面板' },
    { name: 'fit-view', description: '适应画布' },
  ],
}
