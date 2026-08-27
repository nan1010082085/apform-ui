/**
 * 格式化日期
 *
 * formatDate(new Date()) → "2026-08-27"
 * formatDate(new Date(), 'datetime') → "2026-08-27 23:00:00"
 */
export function formatDate(
  date: Date | string | number,
  format: 'date' | 'datetime' | 'time' = 'date',
): string {
  const d = new Date(date)
  const pad = (n: number) => String(n).padStart(2, '0')

  const year = d.getFullYear()
  const month = pad(d.getMonth() + 1)
  const day = pad(d.getDate())
  const hours = pad(d.getHours())
  const minutes = pad(d.getMinutes())
  const seconds = pad(d.getSeconds())

  switch (format) {
    case 'datetime':
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    case 'time':
      return `${hours}:${minutes}:${seconds}`
    default:
      return `${year}-${month}-${day}`
  }
}
