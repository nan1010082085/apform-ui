/**
 * PropertyPanel / PropertyField 共享类型与尺寸常量
 *
 * 独立于 editor widget / Pinia；消费方自行映射业务对象为 sections。
 */

/** 库内属性控件统一尺寸，避免各处 size 不一致（对齐 CSS `--apf-control-size`） */
export const PROPERTY_CONTROL_SIZE = 'small' as const

/** 内置字段类型 */
export type BuiltinPropertyFieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'switch'
  | 'color'
  | 'select'
  | 'remote-select'
  | 'json'
  | 'color-array'
  | 'options'
  | 'number-array'
  | 'array-editor'

/** array-editor 行模式 */
export type PropertyArrayEditorMode = 'string' | 'label-value'

/** 字段类型：内置 + 自定义（自定义走 slot） */
export type PropertyFieldType = BuiltinPropertyFieldType | (string & {})

/** 下拉选项 */
export interface PropertySelectOption {
  label: string
  value: string | number | boolean
}

/** 单行属性项 */
export interface PropertyItem {
  /** 字段键 */
  key: string
  /** 标签 */
  label: string
  /** 控件类型 */
  type: PropertyFieldType
  /** 当前值 */
  value: unknown
  /** 提示（label tooltip） */
  desc?: string
  /** 占位文案 */
  placeholder?: string
  /** select 选项 */
  options?: PropertySelectOption[]
  /** remote-select URL（由 fetchRemoteOptions 消费） */
  remoteUrl?: string
  /** remote 标签字段名 */
  labelField?: string
  /** remote 值字段名 */
  valueField?: string
  /**
   * 可见条件（可由 `evalVisibleOn` / `filterVisiblePropertyItems` 求值；
   * PropertyPanel 传入 `values` 时自动过滤）
   */
  visibleOn?: string
  /** number / number-array 下限 */
  min?: number
  /** number / number-array 上限 */
  max?: number
  /** 必填标记 */
  required?: boolean
  /**
   * array-editor 行模式：
   * - `string`（默认）：字符串列表
   * - `label-value`：{ label, value } 对象列表
   */
  arrayMode?: PropertyArrayEditorMode
}

/** 属性分区 */
export interface PropertySection {
  /** 分区键 */
  key: string
  /** 分区标题 */
  label: string
  /** 字段列表 */
  items: PropertyItem[]
  /** 默认是否展开 */
  defaultOpen?: boolean
}

/** PropertyPanel update 载荷 */
export interface PropertyUpdatePayload {
  sectionKey: string
  key: string
  value: unknown
}

/** 远程选项拉取函数 */
export type FetchRemoteOptionsFn = (
  url: string,
  labelField: string,
  valueField: string,
) => Promise<PropertySelectOption[]>

/** provide/inject key：远程选项 */
export const PROPERTY_FETCH_REMOTE_KEY = 'apfPropertyFetchRemote' as const
