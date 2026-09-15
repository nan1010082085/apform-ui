/**
 * GeneratingPlaceholder 相关类型
 */

/** 占位形态：出图 / 文本骨架 / 通用 */
export type GeneratingPlaceholderVariant = 'image' | 'text' | 'generic'

/** GeneratingPlaceholder props */
export interface GeneratingPlaceholderProps {
  /** 占位形态，默认 generic */
  variant?: GeneratingPlaceholderVariant
  /** 主状态文案，如「正在生成图像…」 */
  label?: string
  /** 副文案，如「仍在生成…」 */
  detail?: string
  /** 出图数量提示（variant=image 时显示在框内） */
  count?: number
  /** 图片占位宽高比，默认 1 / 1 */
  aspectRatio?: string
}
