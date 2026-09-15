/**
 * Composer / PromptOptimizeButton 提示词优化配置（业务注入调用，库不写死模型与 URL）
 */

/** 操作按钮外形：平台方块、聊天端常用圆角 */
export type ControlShape = 'square' | 'round'

export interface PromptOptimizeConfig {
  /**
   * 业务侧请求：原文 → 优化后文案
   * @param text 当前输入框文本
   */
  request: (text: string) => Promise<string>
  /** 按钮 tooltip，默认「优化提示词」 */
  tooltip?: string
}

/**
 * `#optimize` 作用域插槽参数
 */
export interface PromptOptimizeSlotProps {
  /** 当前输入文本 */
  text: string
  /**
   * 写入输入框并自适应高度
   * @param value 新文本
   */
  setText: (value: string) => void | Promise<void>
  /** 是否禁用（Composer disabled / 上传中等） */
  disabled: boolean
  /** 优化请求进行中 */
  loading: boolean
  /** 触发一次优化（内部会调 config.request） */
  optimize: () => Promise<void>
  /** 与 Composer.actionShape 对齐，供自定义 #optimize 使用 */
  shape: ControlShape
}
