/**
 * @apform-ui/utils — 通用工具函数
 *
 * 无 UI 依赖的纯逻辑工具。
 */

// ---------- 防抖/节流 ----------
export { debounce } from './debounce'
export { throttle } from './throttle'

// ---------- 数据处理 ----------
export { deepClone } from './deepClone'
export { deepMerge } from './deepMerge'
export { isEmpty } from './isEmpty'

// ---------- 格式化 ----------
export { formatBytes } from './formatBytes'
export { formatDate } from './formatDate'
export { formatNumber } from './formatNumber'

// ---------- 验证 ----------
export { isEmail, isPhone, isUrl, isIdCard } from './validators'

// ---------- 类型 ----------
export type { DeepPartial, Nullable, Optional } from './types'
