#!/usr/bin/env node
/**
 * 扫描 ui/ 待发包内容中的敏感信息（阻断级）。
 * 用法（ui 根目录）：node scripts/scan-sensitive.mjs
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..')

/** @type {{ id: string, re: RegExp, hint: string }[]} */
const RULES = [
  {
    id: 'openai-sk',
    re: /\bsk-[A-Za-z0-9]{20,}\b/g,
    hint: '疑似 OpenAI/API secret',
  },
  {
    id: 'github-pat',
    re: /\bghp_[A-Za-z0-9]{20,}\b/g,
    hint: '疑似 GitHub PAT',
  },
  {
    id: 'github-oauth',
    re: /\bgho_[A-Za-z0-9]{20,}\b/g,
    hint: '疑似 GitHub OAuth token',
  },
  {
    id: 'aws-key',
    re: /\bAKIA[0-9A-Z]{16}\b/g,
    hint: '疑似 AWS Access Key',
  },
  {
    id: 'private-key',
    re: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g,
    hint: '私钥块',
  },
]

/** 允许出现在文档说明中的模式（非密钥） */
const ALLOW_PATH_FRAGMENTS = [
  'node_modules',
  'dist',
  '.git',
  'coverage',
  'CHANGELOG.md',
  'scan-sensitive.mjs',
  'verify-pack-install.mjs',
]

const TEXT_EXT = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.mjs',
  '.cjs',
  '.vue',
  '.json',
  '.md',
  '.css',
  '.scss',
  '.yml',
  '.yaml',
  '.html',
  '.txt',
  '.env',
  '.sh',
])

/**
 * @param {string} dir
 * @param {(abs: string) => void} visit
 */
function walk(dir, visit) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist' || name === '.git') continue
    const abs = join(dir, name)
    const st = statSync(abs)
    if (st.isDirectory()) walk(abs, visit)
    else visit(abs)
  }
}

/** @type {{ file: string, id: string, hint: string, sample: string }[]} */
const hits = []

walk(ROOT, (abs) => {
  const rel = relative(ROOT, abs)
  if (ALLOW_PATH_FRAGMENTS.some((f) => rel.includes(f))) return
  const dot = abs.lastIndexOf('.')
  const ext = dot >= 0 ? abs.slice(dot).toLowerCase() : ''
  if (!TEXT_EXT.has(ext) && !abs.endsWith('Dockerfile')) return
  let text
  try {
    text = readFileSync(abs, 'utf8')
  } catch {
    return
  }
  if (text.includes('\0')) return
  for (const rule of RULES) {
    rule.re.lastIndex = 0
    const m = text.match(rule.re)
    if (!m) continue
    hits.push({
      file: rel,
      id: rule.id,
      hint: rule.hint,
      sample: m[0].slice(0, 12) + '…',
    })
  }
})

if (hits.length) {
  console.error('❌ 敏感信息扫描未通过：')
  for (const h of hits) {
    console.error(`  [${h.id}] ${h.file} — ${h.hint} (${h.sample})`)
  }
  process.exit(1)
}

console.log('✅ 敏感信息扫描通过（ui/）')
