/**
 * @schema-ui/icons — 业务场景图标扩展包
 *
 * 提供 @schema-ui/core 的 iconRegistry 之外的额外图标集。
 * 按场景分组：workflow（工作流）、approval（审批）、form（表单）等。
 */

import type { IconifyIcon } from '@iconify/vue'

// ---------- Workflow 工作流图标 ----------
import WorkflowPlay from '@iconify-icons/ep/video-play'
import WorkflowPause from '@iconify-icons/ep/video-pause'
import WorkflowStop from '@iconify-icons/ep/circle-close'
import WorkflowRetry from '@iconify-icons/ep/refresh-right'
import WorkflowBranch from '@iconify-icons/ep/share'
import WorkflowMerge from '@iconify-icons/ep/merge'
import WorkflowParallel from '@iconify-icons/ep/operation'
import WorkflowCondition from '@iconify-icons/ep/switch'

export const workflowIcons: Record<string, IconifyIcon> = {
  'workflow-play': WorkflowPlay,
  'workflow-pause': WorkflowPause,
  'workflow-stop': WorkflowStop,
  'workflow-retry': WorkflowRetry,
  'workflow-branch': WorkflowBranch,
  'workflow-merge': WorkflowMerge,
  'workflow-parallel': WorkflowParallel,
  'workflow-condition': WorkflowCondition,
}

// ---------- Approval 审批图标 ----------
import ApprovalCheck from '@iconify-icons/ep/circle-check'
import ApprovalReject from '@iconify-icons/ep/circle-close'
import ApprovalDelegate from '@iconify-icons/ep/promotion'
import ApprovalComment from '@iconify-icons/ep/comment'
import ApprovalSign from '@iconify-icons/ep/edit-pen'
import ApprovalTransfer from '@iconify-icons/ep/switch-button'

export const approvalIcons: Record<string, IconifyIcon> = {
  'approval-check': ApprovalCheck,
  'approval-reject': ApprovalReject,
  'approval-delegate': ApprovalDelegate,
  'approval-comment': ApprovalComment,
  'approval-sign': ApprovalSign,
  'approval-transfer': ApprovalTransfer,
}

// ---------- Data 数据图标 ----------
import DataJson from '@iconify-icons/ep/document'
import DataCsv from '@iconify-icons/ep/grid'
import DataExcel from '@iconify-icons/ep/document-checked'
import DataPdf from '@iconify-icons/ep/notebook'
import DataImage from '@iconify-icons/ep/picture'
import DataFile from '@iconify-icons/ep/files'

export const dataIcons: Record<string, IconifyIcon> = {
  'data-json': DataJson,
  'data-csv': DataCsv,
  'data-excel': DataExcel,
  'data-pdf': DataPdf,
  'data-image': DataImage,
  'data-file': DataFile,
}

// ---------- 全部图标合并导出 ----------
export const allIcons: Record<string, IconifyIcon> = {
  ...workflowIcons,
  ...approvalIcons,
  ...dataIcons,
}

/** 按场景获取图标集 */
export function getIconsByScene(scene: 'workflow' | 'approval' | 'data'): Record<string, IconifyIcon> {
  const map = { workflow: workflowIcons, approval: approvalIcons, data: dataIcons }
  return map[scene] ?? {}
}

export type IconScene = 'workflow' | 'approval' | 'data'
