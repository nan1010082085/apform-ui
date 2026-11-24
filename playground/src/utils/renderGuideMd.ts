/**
 * 轻量 Markdown → HTML（指南页专用，覆盖标题/列表/表格/代码块/链接）
 * @param src Markdown 原文
 */
export function renderGuideMd(src: string): string {
  const fences: string[] = []
  let text = src.replace(/```(\w*)\n([\s\S]*?)```/g, (_m, lang: string, code: string) => {
    const i = fences.length
    const escaped = escapeHtml(code.replace(/\n$/, ''))
    fences.push(
      `<pre class="guide-pre"><code class="language-${escapeHtml(lang || 'text')}">${escaped}</code></pre>`,
    )
    return `@@FENCE${i}@@`
  })

  text = escapeHtml(text)
  text = text.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  text = text.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  text = text.replace(/^# (.+)$/gm, '<h1>$1</h1>')
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>')
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')

  // 表格：连续以 | 开头的行
  text = text.replace(/(^(|.+\|)\n)+/gm, (block) => {
    const rows = block
      .trim()
      .split('\n')
      .filter((r) => r.trim().startsWith('|'))
    if (rows.length < 2) return block
    const parse = (row: string) =>
      row
        .split('|')
        .slice(1, -1)
        .map((c) => c.trim())
    const header = parse(rows[0])
    const bodyRows = rows.slice(2).map(parse) // skip separator
    const thead = `<thead><tr>${header.map((h) => `<th>${h}</th>`).join('')}</tr></thead>`
    const tbody = `<tbody>${bodyRows
      .map((cols) => `<tr>${cols.map((c) => `<td>${c}</td>`).join('')}</tr>`)
      .join('')}</tbody>`
    return `<div class="guide-table-wrap"><table class="guide-table">${thead}${tbody}</table></div>\n`
  })

  // 无序列表
  text = text.replace(/(^- .+\n?)+/gm, (block) => {
    const items = block
      .trim()
      .split('\n')
      .map((l) => `<li>${l.replace(/^- /, '')}</li>`)
      .join('')
    return `<ul>${items}</ul>`
  })

  text = text
    .split(/\n{2,}/)
    .map((p) => {
      if (p.startsWith('<')) return p
      if (p.includes('@@FENCE')) return p
      return `<p>${p.replace(/\n/g, '<br/>')}</p>`
    })
    .join('\n')

  text = text.replace(/@@FENCE(\d+)@@/g, (_m, i) => fences[Number(i)] || '')
  return text
}

/**
 * @param s 原始字符串
 */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
