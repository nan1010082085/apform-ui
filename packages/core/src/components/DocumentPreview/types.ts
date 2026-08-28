/**
 * DocumentPreview 相关类型
 */

/** 文档分块 */
export interface DocumentPreviewChunk {
  /** 块序号（可选） */
  index?: number
  /** 块文本 */
  text: string
}

/** DocumentPreviewPanel 展示 props */
export interface DocumentPreviewPanelProps {
  /** 文件名 */
  filename: string
  /** MIME 类型 */
  mimetype?: string
  /** 文件大小（字节） */
  size?: number
  /** 文本分块 */
  chunks?: DocumentPreviewChunk[]
  /** 抽取方法 */
  extractionMethod?: string
  /** 是否有原文件可下载 */
  hasOriginalFile?: boolean
  /** PDF 预览 URL（提供时用 iframe/embed） */
  pdfUrl?: string
  /** Excel 预览 URL（提供时用 iframe） */
  excelUrl?: string
  /** 加载中 */
  loading?: boolean
  /** 错误信息 */
  error?: string | null
}
