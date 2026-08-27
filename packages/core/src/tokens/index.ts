/**
 * @apform-ui/core 设计令牌
 *
 * CSS 变量通过 import './tokens.css' 和 './design-tokens.css' 引入
 * 此文件导出令牌常量供 JS/TS 使用
 */

/** 主色 */
export const COLORS = {
  primary: '#0060A2',
  primaryHover: '#4581E9',
  primaryLight: '#4581E9',
  primaryLighter: '#EEF5FF',
  primaryDark: '#0060A2',
  success: '#26A036',
  warning: '#F09700',
  danger: '#E50113',
  info: '#4581E9',
} as const

/** 文字色 */
export const TEXT_COLORS = {
  title: '#303133',
  primary: '#333333',
  regular: '#606266',
  secondary: '#666666',
  muted: '#909399',
  placeholder: '#969FA8',
  disabled: '#C0C4CC',
  inverse: '#FFFFFF',
} as const

/** 间距 */
export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
} as const

/** 圆角 */
export const BORDER_RADIUS = {
  sm: '2px',
  md: '4px',
  lg: '10px',
} as const

/** 阴影 */
export const SHADOWS = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 12px rgba(0, 0, 0, 0.08)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
} as const

/** 动画时长 */
export const DURATION = {
  fast: '0.15s',
  normal: '0.25s',
  slow: '0.35s',
} as const

/** Z-Index 层级 */
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
} as const
