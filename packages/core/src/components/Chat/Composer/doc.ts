/**
 * Composer 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** Composer 文档 */
export const ComposerDoc: ComponentDoc = {
  name: 'Composer',
  titleZh: '输入编排器',
  description:
    '对话输入区：文本、附件、发送、可选提示词优化。事件：send / upload / remove-attachment。',
  props: [
    { name: 'disabled', type: 'boolean', required: true, description: '禁用整区' },
    { name: 'placeholder', type: 'string', description: '占位文案' },
    {
      name: 'supportedInputs',
      type: "string[]",
      default: "['text']",
      description: '能力：text / file / image / document',
    },
    { name: 'hitlCapable', type: 'boolean', description: '是否展示 HITL 相关提示' },
    { name: 'wsStatus', type: "'ok'|'pending'|'streaming'|'warn'|'err'|'idle'", description: '连接状态' },
    { name: 'wsLabel', type: 'string', description: '状态文案' },
    { name: 'hideDefaultInput', type: 'boolean', description: '使用 #input 时隐藏默认 textarea' },
    { name: 'hideSend', type: 'boolean', description: '隐藏发送按钮' },
    { name: 'hideFileButton', type: 'boolean', description: '隐藏文件按钮' },
    { name: 'hideMeta', type: 'boolean', description: '隐藏底部能力芯片' },
    { name: 'stretch', type: 'boolean', description: '撑满父宽' },
    { name: 'promptOptimize', type: 'PromptOptimizeConfig', description: '提示词优化配置' },
    { name: 'actionShape', type: "'round'|'square'", default: 'round', description: '操作按钮外形' },
  ],
  emits: [
    { name: 'send', payload: 'content, attachmentIds', description: '发送' },
    { name: 'upload', payload: 'File', description: '选择文件' },
    { name: 'remove-attachment', payload: 'id', description: '移除待发附件' },
    { name: 'ws-click', description: '点击连接状态' },
    { name: 'optimize-error', payload: 'unknown', description: '优化失败' },
  ],
  slots: [
    { name: 'input', description: '自定义输入' },
    { name: 'actions', description: '替换整块操作区' },
    { name: 'optimize', description: '替换优化按钮' },
  ],
}
