/**
 * @apform-ui/core/bpmn — BPMN 流程预览入口（依赖 @vue-flow peer）
 *
 * 对话轻量场景请用 `@apform-ui/core/chat`；通用组件请用 `@apform-ui/core`。
 */
export {
  BpmnFlowPreviewCanvas,
  BpmnPreviewStartEvent,
  BpmnPreviewEndEvent,
  BpmnPreviewTask,
  BpmnPreviewGateway,
  BPMN_TO_PREVIEW_VF_TYPE,
  resolveBpmnPreviewNodeType,
} from './components/Chat/BpmnFlowPreviewCanvas'
export type {
  BpmnPreviewNode,
  BpmnPreviewEdge,
  BpmnPreviewNodeData,
} from './components/Chat/BpmnFlowPreviewCanvas'
