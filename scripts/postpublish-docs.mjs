#!/usr/bin/env node
/**
 * packages/core 的 postpublish 安全网：
 * 若有人直接 `cd packages/core && npm publish`，仍强制部署文档站。
 * 由 scripts/publish-with-docs.sh 发起的发版会设 APFORM_DOCS_DEPLOY_OWNED_BY_PUBLISH_SCRIPT=1，跳过重复部署。
 */
import { spawnSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const version = JSON.parse(readFileSync(resolve(root, 'packages/core/package.json'), 'utf8')).version

if (process.env.APFORM_DOCS_DEPLOY_OWNED_BY_PUBLISH_SCRIPT === '1') {
  console.log('[postpublish] 文档部署由 publish-with-docs.sh 负责，跳过重复执行')
  process.exit(0)
}

if (process.env.APFORM_SKIP_DOCS_DEPLOY === '1') {
  console.error('[postpublish] ❌ 禁止跳过文档站。未部署则发版未完成。')
  console.error('  请执行: bash scripts/deploy-to-pyflow.sh && node scripts/verify-live-docs.mjs')
  process.exit(2)
}

console.log(`[postpublish] 检测到裸 npm publish，强制同步文档站 → ${version}`)
const deploy = spawnSync('bash', ['scripts/deploy-to-pyflow.sh'], {
  cwd: root,
  env: { ...process.env, APFORM_EXPECTED_VERSION: version },
  stdio: 'inherit',
})
if (deploy.status !== 0) {
  console.error('[postpublish] ❌ 文档站部署失败。npm 包可能已发布，但文档未同步——请立即手动部署。')
  process.exit(deploy.status || 1)
}

const verify = spawnSync('node', ['scripts/verify-live-docs.mjs', '--expect', version], {
  cwd: root,
  stdio: 'inherit',
})
if (verify.status !== 0) {
  console.error('[postpublish] ❌ 文档站版本校验失败')
  process.exit(verify.status || 1)
}

console.log('[postpublish] ✅ 文档站已与本次发布版本对齐')
