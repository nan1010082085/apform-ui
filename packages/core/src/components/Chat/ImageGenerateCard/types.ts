/**
 * ImageGenerateCard 相关类型
 */

/** ImageGenerateCard props */
export interface ImageGenerateCardProps {
  /** 生成图片 URL */
  imageUrl?: string
  /** 生成 prompt */
  prompt?: string
  /** 模型名 */
  model?: string
  /** 尺寸，如 1024x1024 */
  size?: string
  /** 风格：vivid / natural 等 */
  imageStyle?: string
  /** @deprecated 使用 imageStyle */
  style?: string
  /** 质量：standard / hd 等 */
  quality?: string
  /** 生成中 */
  loading?: boolean
  /** 错误信息 */
  error?: string
}
