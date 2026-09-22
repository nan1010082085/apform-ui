#!/usr/bin/env node
/**
 * 校验文档站展示版本与包版本同源
 *
 * - SCHEMA_UI_VERSION 必须从 packages/core/package.json 派生（禁止手写字面量）
 * - monorepo 根 package.json version 必须与 core 一致
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

const corePkg = JSON.parse(readFileSync(corePkgPath, 'utf8'))
const monoPkg = JSON.parse(readFileSync(monoPkgPath, 'utf8'))
const versionSrc = readFileSync(versionPath, 'utf8')

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

if (errors.length) {
  console.error('❌ 版本不同步：文档顶栏 SCHEMA_UI_VERSION 与包版本必须一致\n')
  for (const e of errors) console.error(`  - ${e}`)
  console.error(
    '\n修复：只改 packages/core/package.json 的 version，并同步根 package.json；不要手写 SCHEMA_UI_VERSION。',
  )
  process.exit(1)
}

console.log(`✅ 版本同步: @apform-ui/core@${corePkg.version} ≡ SCHEMA_UI_VERSION ≡ monorepo`)
