#!/usr/bin/env node
/**
 * 校验文档 / npm 包文案与包版本同源（发版前阻断）
 *
 * - SCHEMA_UI_VERSION 必须从 packages/core/package.json 派生（禁止手写字面量）
 * - monorepo 根 package.json version 必须与 core 一致
 * - packages/core/README.md「当前版本」必须与 core version 一致（npm 页 README 同源）
 *
 * 用法：node scripts/check-version-sync.mjs
 */
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const corePkgPath = resolve(root, 'packages/core/package.json')
const monoPkgPath = resolve(root, 'package.json')
const versionPath = resolve(root, 'packages/core/src/version.ts')
const coreReadmePath = resolve(root, 'packages/core/README.md')

const corePkg = JSON.parse(readFileSync(corePkgPath, 'utf8'))
const monoPkg = JSON.parse(readFileSync(monoPkgPath, 'utf8'))
const versionSrc = readFileSync(versionPath, 'utf8')
const coreReadme = readFileSync(coreReadmePath, 'utf8')

const errors = []

const derivesFromPkg =
  /import\s+pkg\s+from\s+['"]\.\.\/package\.json['"]/.test(versionSrc) &&
  /SCHEMA_UI_VERSION\s*[:=].*pkg\.version/.test(versionSrc)

if (!derivesFromPkg) {
  const literal = versionSrc.match(/SCHEMA_UI_VERSION\s*=\s*['"]([^'"]+)['"]/)
  if (literal) {
    errors.push(
      `SCHEMA_UI_VERSION 仍是手写字面量 "${literal[1]}"，须改为从 package.json 派生（当前 core=${corePkg.version}）`,
    )
  } else {
    errors.push('packages/core/src/version.ts 未从 ../package.json 派生 SCHEMA_UI_VERSION')
  }
}

if (monoPkg.version !== corePkg.version) {
  errors.push(
    `monorepo version (${monoPkg.version}) !== @apform-ui/core (${corePkg.version})`,
  )
}

const readmeVer = coreReadme.match(/当前版本：\*\*([0-9]+\.[0-9]+\.[0-9]+)\*\*/)
if (!readmeVer) {
  errors.push(
    'packages/core/README.md 缺少「当前版本：**x.y.z**」行（npm 页与 GitHub 须同源）',
  )
} else if (readmeVer[1] !== corePkg.version) {
  errors.push(
    `packages/core/README.md 当前版本 ${readmeVer[1]} !== package.json ${corePkg.version}（会导致 npm 页与 GitHub 不一致）`,
  )
}

if (/钉死/.test(coreReadme)) {
  errors.push(
    'packages/core/README.md 含「钉死」话术；对外请写 peerDependency / 精确依赖',
  )
}

if (errors.length) {
  console.error('❌ 版本/文档不同步：GitHub README ≡ package.json ≡ 即将发布的 npm README\n')
  for (const e of errors) console.error(`  - ${e}`)
  console.error(
    '\n修复：pnpm bump:*（会同步 README 版本）或手改 packages/core/README.md「当前版本」与 package.json 对齐。',
  )
  process.exit(1)
}

console.log(
  `✅ 版本同步: @apform-ui/core@${corePkg.version} ≡ SCHEMA_UI_VERSION ≡ monorepo ≡ core/README`,
)
