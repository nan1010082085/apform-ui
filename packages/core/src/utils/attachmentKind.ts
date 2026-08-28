/**
 * 附件类型判断工具
 *
 * 从 workflow-agent-chat/frontend/src/utils/attachmentKind.ts 提取。
 */

import type { MessageAttachment } from '../types'

export function isImage(att: MessageAttachment): boolean {
  const mime = (att.mimetype || '').toLowerCase()
  const name = (att.filename || '').toLowerCase()
  return mime.startsWith('image/') || /\.(png|jpe?g|gif|webp|bmp)$/.test(name)
}

export function isPdf(att: MessageAttachment): boolean {
  const mime = (att.mimetype || '').toLowerCase()
  const name = (att.filename || '').toLowerCase()
  return mime.includes('pdf') || name.endsWith('.pdf')
}

export function isOffice(att: MessageAttachment): boolean {
  const mime = (att.mimetype || '').toLowerCase()
  const name = (att.filename || '').toLowerCase()
  return (
    name.endsWith('.docx') ||
    name.endsWith('.doc') ||
    name.endsWith('.xlsx') ||
    name.endsWith('.xls') ||
    mime.includes('word') ||
    mime.includes('sheet') ||
    mime.includes('excel')
  )
}

export function isPreviewable(att: MessageAttachment): boolean {
  return isImage(att) || isPdf(att)
}

export function fileKind(att: MessageAttachment): string {
  const name = (att.filename || '').toLowerCase()
  const mime = (att.mimetype || '').toLowerCase()
  if (isPdf(att)) return 'PDF'
  if (name.endsWith('.docx') || name.endsWith('.doc') || mime.includes('word')) return 'Word'
  if (name.endsWith('.xlsx') || name.endsWith('.xls') || mime.includes('sheet') || mime.includes('excel')) return 'Excel'
  if (name.endsWith('.csv')) return 'CSV'
  if (name.endsWith('.txt') || name.endsWith('.md')) return '文本'
  if (name.endsWith('.json')) return 'JSON'
  return '文件'
}

export function formatSize(size?: number): string {
  if (size == null || size < 0) return ''
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}
