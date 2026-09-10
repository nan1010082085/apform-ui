/**
 * 统一产物展示模型（Chat / 工作流执行共用）
 * 不含 audio / 3D / PPT（本迭代明确不做）
 */

/** 产物类型 */
export type ArtifactKind =
  | 'text'
  | 'image'
  | 'video'
  | 'pdf'
  | 'office'
  | 'file'
  | 'json'

/** 可预览产物项 */
export interface ArtifactItem {
  /** 稳定 ID */
  id: string
  kind: ArtifactKind
  /** 可请求 URL（图/视频/文件） */
  url?: string
  /** 平台文档 ID（走 preview API / 抽屉） */
  documentId?: string
  /** 纯文本或 JSON 字符串 */
  text?: string
  filename?: string
  mimetype?: string
  label?: string
  /** 字段来源：imageUrls / videoUrl / documentIds … */
  source?: string
}

/** Gallery 尺寸 */
export type ArtifactGallerySize = 'compact' | 'default'

/** 按节点（或其它维度）分组的产物 */
export interface ArtifactGroup {
  /** 分组主键 */
  key: string
  /** 展示名 */
  label: string
  items: ArtifactItem[]
}
