/** BPMN 预览画布节点（与 VueFlow node.data 对齐） */
export interface BpmnPreviewNodeData {
  label: string
  bpmnType: string
}

/** 通用预览节点 */
export interface BpmnPreviewNode {
  id: string
  /** VueFlow 节点类型：start-event | end-event | task | gateway */
  type: string
  position: { x: number; y: number }
  data: BpmnPreviewNodeData
}

/** 通用预览边 */
export interface BpmnPreviewEdge {
  id: string
  source: string
  target: string
  label?: string
}

/** BPMN 类型 → VueFlow 预览节点类型 */
export const BPMN_TO_PREVIEW_VF_TYPE: Record<string, string> = {
  startEvent: 'start-event',
  endEvent: 'end-event',
  userTask: 'task',
  serviceTask: 'task',
  scriptTask: 'task',
  sendTask: 'task',
  receiveTask: 'task',
  exclusiveGateway: 'gateway',
  parallelGateway: 'gateway',
  inclusiveGateway: 'gateway',
}

/**
 * @param bpmnType - BPMN 元素类型
 */
export function resolveBpmnPreviewNodeType(bpmnType: string): string {
  return BPMN_TO_PREVIEW_VF_TYPE[bpmnType] ?? 'task'
}
