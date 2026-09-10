/**
 * FlowPreviewShell 相关类型
 */

/** FlowPreviewShell props */
export interface FlowPreviewShellProps {
  /** 卡片标题 */
  title: string
  /** 右侧徽章文案，如「3 节点 / 2 连线」 */
  badge?: string
  /** 主操作按钮文案 */
  primaryAction?: string
  /** 次操作按钮文案 */
  secondaryAction?: string
  /** 紧凑模式（消息内联卡） */
  compact?: boolean
  /** 是否显示适配画布按钮，默认 true */
  showFitButton?: boolean
}
