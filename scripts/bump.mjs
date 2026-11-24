#!/usr/bin/env node
/**
 * apform-ui 本地 bump：core + monorepo version、CHANGELOG、core/README「当前版本」同源。
 *
 * 用法（ui 根）：
 *   node scripts/bump.mjs --type patch --message "说明"
 *   pnpm bump:patch -- --message "说明"
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const coreDir = join(root, 'packages/core')

/**
 * @param {string[]} argv
 */
function parseArgs(argv) {
  /** @type {{ type: string, message: string }} */
  const out = { type: 'patch', message: '' }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--type') out.type = argv[++i]
    else if (a === '--message' || a === '-m') out.message = argv[++i]
  }
  return out
}

/**
 * @param {string} version
 * @param {'major'|'minor'|'patch'} type
 */
function bumpSemver(version, type) {
  const m = String(version).replace(/^v/, '').match(/^(\d+)\.(\d+)\.(\d+)/)
  if (!m) throw new Error(`无法解析版本: ${version}`)
  let major = Number(m[1])
  let minor = Number(m[2])
  let patch = Number(m[3])
  if (type === 'major') return `${major + 1}.0.0`
  if (type === 'minor') return `${major}.${minor + 1}.0`
  return `${major}.${minor}.${patch + 1}`
}

/**
 * @param {string} newVersion
 * @param {string} oldVersion
 * @param {string} message
 */
function renderEntry(newVersion, oldVersion, message) {
  const today = new Date().toISOString().slice(0, 10)
  const body = message.trim()
    ? message
        .split(/\n|;|；/)
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) => `- ${s}`)
        .join('\n')
    : `- 版本迭代（${oldVersion} → ${newVersion}）`
  return `## ${newVersion} — ${today}\n\n${body}\n`
}

/**
 * @param {string} changelogPath
 * @param {string} entry
 */
function prependChangelog(changelogPath, entry) {
  const header = `# Changelog\n\n> 本包独立版本日志。格式参考 Keep a Changelog；版本遵循 SemVer。\n`
  if (!existsSync(changelogPath)) return `${header}\n${entry}\n`
  const prev = readFileSync(changelogPath, 'utf8')
  const idx = prev.search(/^##\s+/m)
  if (idx >= 0) return `${prev.slice(0, idx)}${entry}\n${prev.slice(idx)}`
  return `${prev.trimEnd()}\n\n${entry}\n`
}

function main() {
  const args = parseArgs(process.argv.slice(2))
  if (!['major', 'minor', 'patch'].includes(args.type)) {
    console.error('`--type` 必须是 major | minor | patch')
    process.exit(1)
  }

  const corePkgPath = join(coreDir, 'package.json')
  const monoPkgPath = join(root, 'package.json')
  const changelogPath = join(coreDir, 'CHANGELOG.md')
  const readmePath = join(coreDir, 'README.md')
  const rootChangelog = join(root, 'CHANGELOG.md')

  const corePkg = JSON.parse(readFileSync(corePkgPath, 'utf8'))
  const oldVersion = corePkg.version
  const newVersion = bumpSemver(oldVersion, /** @type {'patch'|'minor'|'major'} */ (args.type))
  const entry = renderEntry(newVersion, oldVersion, args.message)

  console.log(`@apform-ui/core: ${oldVersion} → ${newVersion} (${args.type})`)

  corePkg.version = newVersion
  writeFileSync(corePkgPath, `${JSON.stringify(corePkg, null, 2)}\n`)
  writeFileSync(changelogPath, prependChangelog(changelogPath, entry))

  const mono = JSON.parse(readFileSync(monoPkgPath, 'utf8'))
  mono.version = newVersion
  writeFileSync(monoPkgPath, `${JSON.stringify(mono, null, 2)}\n`)
  console.log(`已同步 monorepo version → ${newVersion}`)

  if (existsSync(rootChangelog)) {
    writeFileSync(rootChangelog, prependChangelog(rootChangelog, entry))
  }

  if (existsSync(readmePath)) {
    const readme = readFileSync(readmePath, 'utf8')
    const next = readme.replace(
      /当前版本：\*\*[0-9]+\.[0-9]+\.[0-9]+\*\*/,
      `当前版本：**${newVersion}**`,
    )
    if (next === readme) {
      console.warn('⚠️  README 未找到「当前版本：**x.y.z**」')
    } else {
      writeFileSync(readmePath, next)
      console.log(`已同步 packages/core/README.md 当前版本 → ${newVersion}`)
    }
  }

  console.log('✅ bump 完成（package.json + CHANGELOG + README 同源）')
}

main()
