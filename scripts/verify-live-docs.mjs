#!/usr/bin/env node
/**
 * 校验线上 playground 文档站版本是否与本地 @apform-ui/core 一致。
 *
 * 用法：
 *   node scripts/verify-live-docs.mjs
 *   node scripts/verify-live-docs.mjs --expect 1.21.2
 */
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const PUBLIC_URL = process.env.APFORM_DOCS_URL || 'https://pyflow.icu/schema-platform/apform-ui/'

const expectArg = (() => {
  const i = process.argv.indexOf('--expect')
  return i >= 0 ? String(process.argv[i + 1] || '').trim() : ''
})()

const corePkg = JSON.parse(readFileSync(resolve(root, 'packages/core/package.json'), 'utf8'))
const expected = expectArg || corePkg.version

/**
 * @param {string} url
 */
async function fetchText(url) {
  const res = await fetch(url, { redirect: 'follow' })
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`)
  return res.text()
}

async function main() {
  console.log(`校验线上文档: ${PUBLIC_URL}`)
  console.log(`期望版本: ${expected}`)

  const html = await fetchText(PUBLIC_URL)
  const jsMatch = html.match(/src="\/schema-platform\/apform-ui\/(assets\/[^"]+\.js)"/)
  if (!jsMatch) {
    throw new Error('未在首页找到 playground 主 JS（/schema-platform/apform-ui/assets/...）')
  }
  const jsUrl = new URL(jsMatch[1], PUBLIC_URL).href
  const js = await fetchText(jsUrl)

  if (!js.includes(expected)) {
    throw new Error(
      `线上主包未包含版本 ${expected}。文档站仍是旧构建，须执行: bash scripts/deploy-to-pyflow.sh`,
    )
  }

  const required = [
    { id: 'expert-picker', hint: 'ExpertPicker' },
    { id: 'citation-block', hint: 'CitationBlock' },
  ]
  for (const { id, hint } of required) {
    if (!js.includes(id) && !js.includes(hint)) {
      throw new Error(`线上文档缺少 ${hint}（路由 ${id}）。请重新 docs:build 并部署。`)
    }
  }

  console.log(`✅ 线上文档已对齐 @apform-ui/core@${expected}`)
  console.log(`   ${PUBLIC_URL}`)
}

main().catch((err) => {
  console.error(`❌ 文档站校验失败: ${err.message || err}`)
  process.exit(1)
})
