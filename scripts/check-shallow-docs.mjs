#!/usr/bin/env node
/**
 * 扫描 packages/core 组件 doc.ts，拦截过浅描述（阻断级）。
 * 用法（ui 根目录）：node scripts/check-shallow-docs.mjs
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const SCAN_ROOT = join(ROOT, 'packages/core/src/components')

/** 过浅：`Xxx 组件。` 或描述过短 */
const SHALLOW_DESC = /description:\s*['"`]([^'"`]+)['"`]/g
const PLACEHOLDER = /^[\w./-]+\s*组件。?$/
const TOO_SHORT = 12

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
    } else if (name === 'doc.ts') {
      onFile(full)
    }
  }
}

/** @type {{ file: string, reason: string, snippet: string }[]} */
const hits = []

walk(SCAN_ROOT, (file) => {
  const text = readFileSync(file, 'utf8')
  const rel = relative(ROOT, file)
  SHALLOW_DESC.lastIndex = 0
  let m
  let foundTop = false
  while ((m = SHALLOW_DESC.exec(text)) !== null) {
    const desc = m[1].trim()
    // 只拦组件顶层 description（第一处较长语义块前的 export 描述）
    // 简化：凡命中「Xxx 组件。」或过短且像占位的都报
    if (PLACEHOLDER.test(desc)) {
      hits.push({ file: rel, reason: 'placeholder-组件。', snippet: desc })
      foundTop = true
      break
    }
  }
  if (!foundTop) {
    // 顶层 export 的 description 字段：取第一个 description:
    const top = text.match(/export const \w+Doc: ComponentDoc = \{[\s\S]*?description:\s*['"`]([\s\S]*?)['"`]/)
    if (top) {
      const desc = top[1].replace(/\s+/g, ' ').trim()
      if (desc.length < TOO_SHORT || PLACEHOLDER.test(desc)) {
        hits.push({
          file: rel,
          reason: desc.length < TOO_SHORT ? 'description-too-short' : 'placeholder',
          snippet: desc.slice(0, 80),
        })
      }
    } else if (/ComponentDoc/.test(text)) {
      hits.push({ file: rel, reason: 'missing-description', snippet: '' })
    }
  }
})

if (hits.length) {
  console.error(`[check-shallow-docs] 发现 ${hits.length} 个过浅 doc.ts：\n`)
  for (const h of hits) {
    console.error(`  ${h.file} [${h.reason}] ${h.snippet}`)
  }
  console.error('\n见 docs/CONVENTIONS.md：description 须一句真实职责，禁止「Xxx 组件。」')
  process.exit(1)
}

console.log(`[check-shallow-docs] OK（已扫描 doc.ts）`)
