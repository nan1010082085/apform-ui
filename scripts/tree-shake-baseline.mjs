#!/usr/bin/env node
/**
 * 树摇体积基线：esbuild CLI 打包单组件 import，与全量 dist 对比。
 * 用法：`node scripts/tree-shake-baseline.mjs`
 */
import { execFileSync } from 'node:child_process'
import { mkdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const esbuildBin = resolve(
  root,
  'node_modules/.pnpm/vite@6.4.3_@types+node@26.3.0_sass-embedded@1.103.1_sass@1.103.1/node_modules/vite/node_modules/.bin/esbuild',
)
const outDir = resolve(root, 'docs/internal')
const tmpDir = resolve(root, 'playground/.treeshake-baseline')
const coreDist = resolve(root, 'packages/core/dist/apform-ui.js')

/** @type {Array<[string, string]>} */
const CASES = [
  ['PageShell', `import { PageShell } from '@apform-ui/core'; export { PageShell };`],
  ['AppPagination', `import { AppPagination } from '@apform-ui/core'; export { AppPagination };`],
  ['MessageBubble', `import { MessageBubble } from '@apform-ui/core'; export { MessageBubble };`],
  ['FilterBar', `import { FilterBar } from '@apform-ui/core'; export { FilterBar };`],
  ['Composer', `import { Composer } from '@apform-ui/core'; export { Composer };`],
]

/**
 * @param {string} name
 * @param {string} code
 */
function bundleCase(name, code) {
  mkdirSync(tmpDir, { recursive: true })
  const entry = resolve(tmpDir, `${name}.ts`)
  const outfile = resolve(tmpDir, `${name}.min.js`)
  writeFileSync(entry, code)
  execFileSync(
    esbuildBin,
    [
      entry,
      '--bundle',
      '--format=esm',
      '--platform=browser',
      '--minify',
      `--outfile=${outfile}`,
      '--external:vue',
      '--external:element-plus',
      `--alias:@apform-ui/core=${coreDist}`,
    ],
    { stdio: 'pipe' },
  )
  return statSync(outfile).size
}

function main() {
  const fullJs = statSync(coreDist).size
  const fullCss = statSync(resolve(root, 'packages/core/dist/apform-ui.css')).size
  const rows = CASES.map(([name, code]) => ({
    export: name,
    minifiedJsBytes: bundleCase(name, code),
  }))

  const lines = [
    '# 树摇体积基线',
    '',
    `> 生成时间：${new Date().toISOString().slice(0, 10)} · core dist 已 build`,
    '',
    '## 全量产物（未 tree-shake）',
    '',
    '| 文件 | 体积 |',
    '|------|------|',
    `| \`dist/apform-ui.js\` | ${(fullJs / 1024).toFixed(1)} KB |`,
    `| \`dist/apform-ui.css\` | ${(fullCss / 1024).toFixed(1)} KB |`,
    '',
    '## 单组件 import（esbuild minify，vue / element-plus external）',
    '',
    '| Export | minified JS |',
    '|--------|-------------|',
    ...rows.map((r) => `| \`${r.export}\` | ${(r.minifiedJsBytes / 1024).toFixed(1)} KB |`),
    '',
    '复测：`node scripts/tree-shake-baseline.mjs`（需先 `pnpm --filter @apform-ui/core build`）',
    '',
  ]

  mkdirSync(outDir, { recursive: true })
  const outPath = resolve(outDir, 'tree-shake-baseline.md')
  writeFileSync(outPath, lines.join('\n'))
  console.log(`Wrote ${outPath}`)
}

main()
