/**
 * 格式化数字（千分位）
 *
 * formatNumber(1234567) → "1,234,567"
 * formatNumber(1234.5, 2) → "1,234.50"
 */
export function formatNumber(num: number, decimals?: number): string {
  const fixed = decimals !== undefined ? num.toFixed(decimals) : String(num)
  const [int, dec] = fixed.split('.')
  const formatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return dec !== undefined ? `${formatted}.${dec}` : formatted
}
