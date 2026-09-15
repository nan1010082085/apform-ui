/**
 * 文档站演示用占位图 — SVG data URI，品牌色，不依赖外网随机图
 */

/**
 * @param label - 图上短文案
 * @param w - 宽
 * @param h - 高
 * @param tone - primary | muted | success
 */
export function demoPlaceholderSvg(
  label: string,
  w = 512,
  h = 384,
  tone: 'primary' | 'muted' | 'success' = 'primary',
): string {
  const fills: Record<string, { bg: string; fg: string; accent: string }> = {
    primary: { bg: '#EEF5FF', fg: '#0060A2', accent: '#4581E9' },
    muted: { bg: '#F5F7FA', fg: '#909399', accent: '#D5DDE3' },
    success: { bg: '#F0F9EB', fg: '#26A036', accent: '#67C23A' },
  }
  const c = fills[tone]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="100%" height="100%" fill="${c.bg}"/>
  <rect x="24" y="24" width="${w - 48}" height="${h - 48}" rx="12" fill="none" stroke="${c.accent}" stroke-width="2" stroke-dasharray="8 6"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${c.fg}" font-family="system-ui,sans-serif" font-size="${Math.max(14, Math.min(22, w / 18))}" font-weight="600">${escapeXml(label)}</text>
</svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

/**
 * @param text - 原始文本
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
