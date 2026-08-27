/**
 * 通用类型工具
 */

/** 将 T 的所有属性变为可选（深度） */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/** T 或 null */
export type Nullable<T> = T | null

/** T 或 undefined */
export type Optional<T> = T | undefined
