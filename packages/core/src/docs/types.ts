/**
 * 组件文档元数据类型 — playground 文档站消费
 */

/** Props 文档行 */
export interface PropDoc {
  /** 属性名 */
  name: string
  /** 类型说明 */
  type: string
  /** 默认值（展示用字符串） */
  default?: string
  /** 是否必填 */
  required?: boolean
  /** 说明 */
  description: string
}

/** Emits / Events 文档行 */
export interface EmitDoc {
  /** 事件名 */
  name: string
  /** 载荷类型说明 */
  payload?: string
  /** 说明 */
  description: string
}

/** Slot 文档行 */
export interface SlotDoc {
  /** 插槽名 */
  name: string
  /** 说明 */
  description: string
}

/** 单个组件/组合式 API 的文档描述 */
export interface ComponentDoc {
  /** 导出名称（英文） */
  name: string
  /** 中文名，展示为「Name 中文」 */
  titleZh?: string
  /** 一句话简述 */
  description: string
  /** Props / Attributes */
  props?: PropDoc[]
  /** Emits / Events */
  emits?: EmitDoc[]
  /** Slots */
  slots?: SlotDoc[]
}
