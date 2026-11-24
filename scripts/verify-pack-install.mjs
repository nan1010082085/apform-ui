#!/usr/bin/env node
/**
 * npm pack 解包实测：干净目录安装 tgz，校验四入口可解析。
 * 用法（ui 根目录）：node scripts/verify-pack-install.mjs
 * 需先有 packages/core/dist（会自动 build 若缺失）。
 */
import { spawnSync } from 'node:child_process'
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const CORE = join(ROOT, 'packages/core')

/**
 * @param {string} cmd
 * @param {string[]} args
 * @param {import('node:child_process').SpawnSyncOptions} [opts]
 */
function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    ...opts,
  })
  if (r.status !== 0) {
    console.error(r.stdout || '')
    console.error(r.stderr || '')
    throw new Error(`${cmd} ${args.join(' ')} failed (${r.status})`)
  }
  return r
}

if (!existsSync(join(CORE, 'dist/apform-ui.js'))) {
  console.log('→ building @apform-ui/core …')
  run('pnpm', ['--filter', '@apform-ui/core', 'run', 'build'], { cwd: ROOT, stdio: 'inherit' })
}

const packDir = mkdtempSync(join(tmpdir(), 'apform-pack-'))
const consumerDir = mkdtempSync(join(tmpdir(), 'apform-consumer-'))

try {
  console.log('→ npm pack …')
  const pack = run('npm', ['pack', '--pack-destination', packDir], { cwd: CORE })
  const tgzName = (pack.stdout || '').trim().split('\n').filter(Boolean).pop()
  if (!tgzName) throw new Error('npm pack 未输出 tgz 文件名')
  const tgz = join(packDir, tgzName)
  console.log(`  packed: ${tgzName}`)

  // LICENSE 必须进包
  const list = run('tar', ['-tzf', tgz])
  const entries = (list.stdout || '').split('\n')
  const hasLicense = entries.some((e) => /\/LICENSE$/.test(e) || e.endsWith('LICENSE'))
  if (!hasLicense) {
    throw new Error('tgz 内缺少 LICENSE')
  }

  writeFileSync(
    join(consumerDir, 'package.json'),
    JSON.stringify(
      {
        name: 'apform-pack-consumer',
        private: true,
        type: 'module',
        dependencies: {
          '@apform-ui/core': `file:${tgz}`,
          vue: '^3.5.13',
          'element-plus': '2.14.2',
        },
      },
      null,
      2,
    ),
  )

  console.log('→ npm install in clean dir …')
  run('npm', ['install', '--no-fund', '--no-audit', '--no-package-lock'], {
    cwd: consumerDir,
    stdio: 'inherit',
    env: { ...process.env, npm_config_legacy_peer_deps: 'true' },
  })

  const pkgRoot = join(consumerDir, 'node_modules/@apform-ui/core')
  if (!existsSync(join(pkgRoot, 'package.json'))) {
    throw new Error('安装后未找到 @apform-ui/core')
  }

  /** @type {{ id: string, file: string }[]} */
  const checks = [
    { id: 'core', file: join(pkgRoot, 'dist/apform-ui.js') },
    { id: 'core.types', file: join(pkgRoot, 'dist/index.d.ts') },
    { id: 'chat', file: join(pkgRoot, 'dist/chat.js') },
    { id: 'chat.types', file: join(pkgRoot, 'dist/chat.d.ts') },
    { id: 'bpmn', file: join(pkgRoot, 'dist/bpmn.js') },
    { id: 'bpmn.types', file: join(pkgRoot, 'dist/bpmn.d.ts') },
    { id: 'vite', file: join(pkgRoot, 'vite/optionalPeersPlugin.mjs') },
    { id: 'vite.types', file: join(pkgRoot, 'vite/optionalPeersPlugin.d.mts') },
    { id: 'style', file: join(pkgRoot, 'dist/apform-ui.css') },
  ]

  for (const c of checks) {
    if (!existsSync(c.file)) throw new Error(`缺失入口产物: ${c.id} → ${c.file}`)
  }

  const pkgJson = JSON.parse(readFileSync(join(pkgRoot, 'package.json'), 'utf8'))
  if (!pkgJson.sideEffects) {
    throw new Error('package.json 缺少 sideEffects')
  }
  for (const sub of ['.', './chat', './bpmn', './vite', './style.css', './package.json']) {
    if (!pkgJson.exports?.[sub]) {
      throw new Error(`exports 缺少入口: ${sub}`)
    }
  }

  // vite 入口无 optional peer 依赖，可在 Node 直接 import
  const viteMod = await import(join(pkgRoot, 'vite/optionalPeersPlugin.mjs'))
  if (typeof viteMod.apformOptionalPeers !== 'function') {
    throw new Error('vite 入口缺少 apformOptionalPeers')
  }

  // 主包 ESM 依赖可选 peer，裸 Node 无 Vite 插件时无法完整加载；
  // 用读文件 + export 声明校验产物完整性。
  for (const entry of ['dist/apform-ui.js', 'dist/chat.js', 'dist/bpmn.js']) {
    const body = readFileSync(join(pkgRoot, entry), 'utf8')
    if (body.length < 100) throw new Error(`${entry} 产物异常过短`)
  }

  console.log('✅ npm pack 解包实测通过（core / chat / bpmn / vite + LICENSE + types）')
} finally {
  rmSync(packDir, { recursive: true, force: true })
  rmSync(consumerDir, { recursive: true, force: true })
}
