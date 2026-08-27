/**
 * 常用验证器
 */

/** 邮箱 */
export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

/** 手机号（中国大陆） */
export function isPhone(value: string): boolean {
  return /^1[3-9]\d{9}$/.test(value)
}

/** URL */
export function isUrl(value: string): boolean {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

/** 身份证号（中国大陆 18 位） */
export function isIdCard(value: string): boolean {
  return /^\d{17}[\dXx]$/.test(value)
}
