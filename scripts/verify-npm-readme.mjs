#!/usr/bin/env node
/**
 * 发版后校验：registry 上的 @apform-ui/core 版本与 README 文案已与本地对齐。
 *
 * 用法：
 *   node scripts/verify-npm-readme.mjs
 *   node scripts/verify-npm-readme.mjs --expect 1.22.6
 *   node scripts/verify-npm-readme.mjs --wait 180   # 暂存放行后轮询秒数
 */
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const corePkg = JSON.parse(readFileSync(resolve(root, 'packages/core/package.json'), 'utf8'))
const localReadme = readFileSync(resolve(root, 'packages/core/README.md'), 'utf8')

const expectArg = (() => {
  const i = process.argv.indexOf('--expect')
  return i >= 0 ? String(process.argv[i + 1] || '').trim() : ''
})()
const waitSec = (() => {
  const i = process.argv.indexOf('--wait')
  return i >= 0 ? Number(process.argv[i + 1] || 120) : 120
})()

const expected = expectArg || corePkg.version

/**
 * @param {string[]} args
 */
function npmView(args) {
  try {
    return execFileSync('npm', ['view', ...args], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }).trim()
  } catch (e) {
    const err = /** @type {Error & { stderr?: string }} */ (e)
    return ''
  }
}

/**
 * @param {number} ms
 */
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function main() {
  console.log(`校验 npm @apform-ui/core 与本地 README / 版本对齐`)
  console.log(`期望版本: ${expected}`)

  const deadline = Date.now() + waitSec * 1000
  let latest = ''
  let readme = ''

  while (Date.now() <= deadline) {
    latest = npmView(['@apform-ui/core', 'version'])
    const exact = npmView([`@apform-ui/core@${expected}`, 'version'])
    if (exact === expected) {
      readme = npmView(['@apform-ui/core', 'readme'])
      break
    }
    console.log(
      `  … registry 尚未看到 ${expected}（latest=${latest || 'n/a'}），等待暂存放行 / 传播…`,
    )
    await sleep(8000)
  }

  if (npmView([`@apform-ui/core@${expected}`, 'version']) !== expected) {
    console.error(
      `\n❌ npm 上仍无 @apform-ui/core@${expected}（latest=${latest || 'n/a'}）。\n` +
        `   若 CLI 已显示 +${expected}，请到 https://www.npmjs.com/package/@apform-ui/core 放行暂存后再跑：\n` +
        `   node scripts/verify-npm-readme.mjs --expect ${expected}`,
    )
    process.exit(1)
  }

  latest = npmView(['@apform-ui/core', 'version'])
  if (latest !== expected) {
    console.error(
      `❌ npm dist-tag latest=${latest}，期望 ${expected}。暂存未成为 latest 前不算发版完成。`,
    )
    process.exit(1)
  }

  readme = readme || npmView(['@apform-ui/core', 'readme'])
  if (!readme) {
    console.error('❌ 无法拉取 npm readme')
    process.exit(1)
  }

  const remoteVer = readme.match(/当前版本：\*\*([0-9]+\.[0-9]+\.[0-9]+)\*\*/)
  if (!remoteVer || remoteVer[1] !== expected) {
    console.error(
      `❌ npm README「当前版本」为 ${remoteVer ? remoteVer[1] : '缺失'}，期望 ${expected}`,
    )
    process.exit(1)
  }

  const localVer = localReadme.match(/当前版本：\*\*([0-9]+\.[0-9]+\.[0-9]+)\*\*/)
  if (!localVer || localVer[1] !== expected) {
    console.error(`❌ 本地 packages/core/README.md 版本与期望不符`)
    process.exit(1)
  }

  if (/钉死/.test(readme)) {
    console.error('❌ npm README 仍含「钉死」话术，与现行文档规范不一致')
    process.exit(1)
  }

  console.log(`✅ npm @apform-ui/core@${expected} ≡ latest ≡ npm README ≡ 本地 core/README`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
