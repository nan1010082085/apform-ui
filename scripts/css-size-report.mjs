#!/usr/bin/env node
/**
 * 输出 dist CSS 体积，供 README / 兼容指南引用。
 * 用法：node scripts/css-size-report.mjs
 */
import { existsSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const DIST = join(ROOT, 'packages/core/dist')

const FILES = [
  { key: 'style.css', file: 'apform-ui.css', exportPath: '@apform-ui/core/style.css' },
  { key: 'chat.css', file: 'chat.css', exportPath: '@apform-ui/core/chat.css' },
  { key: 'bpmn.css', file: 'bpmn.css', exportPath: '@apform-ui/core/bpmn.css' },
]

/**
 * @param {number} bytes
 */
function fmt(bytes) {
  if (bytes < 1024) return `${bytes} B`
  return `${(bytes / 1024).toFixed(1)} KB`
}

/** @type {Record<string, { bytes: number, human: string, exportPath: string }>} */
const report = {}
for (const item of FILES) {
  const abs = join(DIST, item.file)
  if (!existsSync(abs)) {
    console.error(`缺失 ${abs}，请先 pnpm build:core`)
    process.exit(1)
  }
  const bytes = statSync(abs).size
  report[item.key] = { bytes, human: fmt(bytes), exportPath: item.exportPath }
  console.log(`${item.exportPath.padEnd(36)} ${fmt(bytes).padStart(8)} (${bytes} bytes)`)
}

const out = join(ROOT, 'docs/guide/css-size.json')
writeFileSync(out, JSON.stringify({ generatedAt: new Date().toISOString(), files: report }, null, 2) + '\n')
console.log(`→ wrote ${out}`)
