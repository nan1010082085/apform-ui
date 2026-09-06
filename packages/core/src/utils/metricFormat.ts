/**
 * 监控指标数值格式化
 */

/** 指标单位 */
export type MetricUnit = 'count' | 'ms' | 'percent' | 'currency' | 'tokens' | 'bytes'

/**
 * 按单位格式化数值
 * @param value - 原始数值
 * @param unit - 单位类型
 */
export function formatMetricValue(value: number, unit: MetricUnit): string {
  if (!Number.isFinite(value)) return '—'
  switch (unit) {
    case 'count':
      return Math.round(value).toLocaleString('en-US')
    case 'ms':
      return value >= 1000 ? `${(value / 1000).toFixed(1)}s` : `${Math.round(value)}ms`
    case 'percent':
      return `${value.toFixed(1)}%`
    case 'currency':
      return `$${value.toFixed(4)}`
    case 'tokens':
      return `${Math.round(value).toLocaleString('en-US')} tokens`
    case 'bytes': {
      const abs = Math.abs(value)
      if (abs >= 1e9) return `${(value / 1e9).toFixed(1)}GB`
      if (abs >= 1e6) return `${(value / 1e6).toFixed(1)}MB`
      if (abs >= 1e3) return `${(value / 1e3).toFixed(1)}KB`
      return `${Math.round(value)}B`
    }
    default:
      return String(value)
  }
}

/**
 * 相对时间文案（用于 lastSeen 等）
 * @param iso - ISO 8601 时间
 */
export function formatRelativeTime(iso: string): string {
  const ts = Date.parse(iso)
  if (!Number.isFinite(ts)) return iso
  const diff = Date.now() - ts
  const sec = Math.floor(diff / 1000)
  if (sec < 60) return `${sec}s 前`
  const min = Math.floor(sec / 60)
  if (min < 60) return `${min}m 前`
  const hr = Math.floor(min / 60)
  if (hr < 24) return `${hr}h 前`
  const day = Math.floor(hr / 24)
  return `${day}d 前`
}

/**
 * 时长文案
 * @param ms - 毫秒
 */
export function formatDuration(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)}ms`
  const sec = Math.floor(ms / 1000)
  if (sec < 60) return `${sec}s`
  const min = Math.floor(sec / 60)
  if (min < 60) return `${min}m ${sec % 60}s`
  const hr = Math.floor(min / 60)
  return `${hr}h ${min % 60}m`
}
