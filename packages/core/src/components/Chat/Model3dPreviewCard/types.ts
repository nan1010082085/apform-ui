/**
 * Model3dPreviewCard 相关类型
 */

/** Model3dPreviewCard props */
export interface Model3dPreviewCardProps {
  /** 模型资源 URL */
  url: string
  /** 文件名（用于推断格式徽章） */
  filename?: string
  /** MIME 类型（预留） */
  mimeType?: string
  /** model-viewer poster 图 */
  poster?: string
}
