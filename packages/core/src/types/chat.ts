/**
 * @apform-ui/core — 对话组件类型定义
 *
 * 从 workflow-agent-chat 和 ai/app 项目提取的通用类型。
 * 去除了业务特定的 store 依赖，保留纯数据结构。
 */

// ========== 消息 ==========

export type MessageRole = 'user' | 'assistant' | 'system'
export type MessageStatus = 'PENDING' | 'RUNNING' | 'WAITING_INPUT' | 'COMPLETED' | 'FAILED' | 'CANCELLED'

export interface Message {
  id: string
  role: MessageRole
  content: string
  status: MessageStatus
  createdAt: string
  thinking?: string
  tip?: string
  toolCalls?: ToolCallInfo[]
  documentSummaries?: MessageDocumentSummary[]
  workflowExecution?: WorkflowExecution
  attachments?: MessageAttachment[]
  runtimeExecutionId?: string | null
}

export interface MessageAttachment {
  id: string
  filename: string
  mimetype: string
  size?: number
  excerpt?: string | null
  url?: string
  createdAt?: string
}

export interface ToolCallInfo {
  id?: string
  name: string
  arguments: Record<string, unknown>
  result?: unknown
  error?: string
}

export interface MessageDocumentSummary {
  documentId: string
  filename: string
  summary: string
  pageCount?: number
  /** 关联附件 id（优先于 filename 匹配） */
  attachmentId?: string
}

export interface WorkflowExecution {
  executionId: string
  workflowId: string
  workflowName: string
  status: string
  nodeRecords?: WorkflowNodeRecord[]
  durationMs?: number
  error?: string
}

export interface WorkflowNodeRecord {
  nodeId: string
  nodeName: string
  nodeType: string
  status: string
  startedAt?: string
  finishedAt?: string
  durationMs?: number
}

// ========== 运行状态 ==========

export type RunStatus = 'RUNNING' | 'COMPLETED' | 'FAILED' | 'WAITING_INPUT' | 'CANCELLED'

export interface RunStatusView {
  runId: string
  sessionId: string
  agentId: string
  runtimeExecutionId: string | null
  status: RunStatus
  errorMessage: string | null
  waiting: WaitingPayload | null
  startedAt: string
  finishedAt: string | null
}

export interface WaitingPayload {
  prompt: string
  fields: WaitingField[]
  actions: WaitingAction[]
  dangerous: boolean
}

export interface WaitingField {
  key: string
  label: string
  type: string
  options: string[]
}

export interface WaitingAction {
  action: string
  label: string
  style: string
}

// ========== 会话 ==========

export interface Session {
  id: string
  title: string
  agentId?: string | null
  agentName?: string | null
  status: string
  createdAt: string
  updatedAt: string
}

// ========== 代理 ==========

export interface Agent {
  id: string
  slug: string
  name: string
  description: string
  icon: string
  supportedInputs: string[]
  hitlCapable: boolean
  version: string
  updatedAt: string
  published: boolean
}

// ========== 附件 ==========

export interface PendingAttachment {
  id: string
  filename: string
  mimetype: string
  size: number
  status: 'uploading' | 'done' | 'error'
  error?: string
  previewUrl?: string
}
