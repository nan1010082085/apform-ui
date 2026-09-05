/**
 * Composer 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** Composer 文档 */
export const ComposerDoc: ComponentDoc = {
  name: 'Composer',
  titleZh: '输入框',
  description: '对话输入区：文本发送、附件上传与 WebSocket 状态展示。',
  props: [
    { name: 'disabled', type: 'boolean', required: true, description: '是否禁用输入与发送' },
    { name: 'placeholder', type: 'string', description: '输入框占位文案' },
    {
      name: 'supportedInputs',
      type: 'string[]',
      default: "['text']",
      description: '支持的输入类型：text / file / image / document',
    },
    { name: 'hitlCapable', type: 'boolean', description: '是否展示人机协同相关能力标记' },
    {
      name: 'wsStatus',
      type: "'ok' | 'pending' | 'streaming' | 'warn' | 'err' | 'idle'",
      description: 'WebSocket 连接状态',
    },
    { name: 'wsLabel', type: 'string', description: 'WebSocket 状态文案' },
  ],
  emits: [
    {
      name: 'send',
      payload: '(content: string, attachmentIds: string[])',
      description: '发送消息',
    },
    { name: 'upload', payload: 'File', description: '选择文件后触发上传' },
    { name: 'remove-attachment', payload: 'string', description: '移除待发送附件' },
    { name: 'ws-click', description: '点击 WebSocket 状态区域' },
  ],
  slots: [],
}
