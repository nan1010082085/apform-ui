#!/usr/bin/env node
/**
 * 扫描组件源码中的「左侧状态彩条」反模式（阻断级）。
 * 用法（ui 根目录）：node scripts/check-visual-rules.mjs
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const SCAN_ROOT = join(ROOT, 'packages/core/src/components')

/** 状态色 / 品牌色关键词（命中 border-left 时视为彩条） */
const STATUS_COLOR =
  /(?:var\(\s*--(?:apf-)?(?:color-)?(?:primary|success|warning|danger|error|info|running)|#[0-9a-fA-F]{3,8}|rgb[a]?\()/

/**
 * border-left: 2–6px solid <色> —— 允许 1px 分割线
 * @type {RegExp}
 */
const BORDER_LEFT_BAR =
  /border-left\s*:\s*([2-6])px\s+solid\s+([^;}\n]+)/gi

/**
 * __bar / -bar 类 + 窄竖条宽
 * @type {RegExp}
 */
const BAR_CLASS = /(__bar|-status-bar|statusBar)/i
const BAR_WIDTH = /width\s*:\s*(3|4)px\b/i

/**
 * @param {string} dir
 * @param {(file: string) => void} onFile
 */
function walk(dir, onFile) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    const st = statSync(full)
    if (st.isDirectory()) {
      if (name === 'node_modules' || name === 'dist') continue
      walk(full, onFile)
    } else if (/\.(vue|css|scss)$/.test(name)) {
      onFile(full)
    }
  }
}

/** @type {{ file: string, line: number, snippet: string, rule: string }[]} */
const hits = []

walk(SCAN_ROOT, (file) => {
  const text = readFileSync(file, 'utf8')
  const rel = relative(ROOT, file)
  const lines = text.split(/\r?\n/)

  lines.forEach((line, i) => {
    BORDER_LEFT_BAR.lastIndex = 0
    let m
    while ((m = BORDER_LEFT_BAR.exec(line)) !== null) {
      const colorPart = m[2].trim()
      if (STATUS_COLOR.test(colorPart)) {
        hits.push({
          file: rel,
          line: i + 1,
          snippet: line.trim().slice(0, 120),
          rule: 'border-left-status-bar',
        })
      }
    }

    if (BAR_CLASS.test(line) && BAR_WIDTH.test(line)) {
      hits.push({
        file: rel,
        line: i + 1,
        snippet: line.trim().slice(0, 120),
        rule: 'bar-class-narrow-width',
      })
    }
  })

  // 跨行：类名附近有窄 width + status 色（简单块扫描）
  if (BAR_CLASS.test(text)) {
    const blocks = text.split(/\{/)
    for (let b = 0; b < blocks.length; b++) {
      const block = blocks[b]
      if (!BAR_CLASS.test(block) && b > 0 && !BAR_CLASS.test(blocks[b - 1])) continue
      const body = block.split('}')[0] || ''
      if (BAR_WIDTH.test(body) && STATUS_COLOR.test(body)) {
        const lineNo = text.slice(0, text.indexOf(body)).split(/\r?\n/).length
        hits.push({
          file: rel,
          line: lineNo,
          snippet: body.replace(/\s+/g, ' ').trim().slice(0, 120),
          rule: 'bar-block-status-color',
        })
      }
    }
  }
})

if (hits.length) {
  console.error(`[check-visual-rules] 发现 ${hits.length} 处左侧状态彩条反模式：\n`)
  for (const h of hits) {
    console.error(`  ${h.file}:${h.line} [${h.rule}] ${h.snippet}`)
  }
  console.error('\n见 docs/CONVENTIONS.md「视觉语言」。状态请用色点 / 文案色 / 危险微染。')
  process.exit(1)
}

console.log('[check-visual-rules] OK')
