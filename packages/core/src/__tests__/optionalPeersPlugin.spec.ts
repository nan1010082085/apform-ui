/**
 * @vitest-environment node
 */
import { mkdtempSync, mkdirSync, realpathSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { createServer, type ViteDevServer } from 'vite'
import { describe, expect, it } from 'vitest'
import {
  apformOptionalPeers,
  matchOptionalPeer,
  optionalPeerStubPath,
} from '../../vite/optionalPeersPlugin.mjs'

describe('matchOptionalPeer', () => {
  it('匹配可选 peer 及其子路径', () => {
    expect(matchOptionalPeer('xlsx')).toBe('xlsx')
    expect(matchOptionalPeer('pdfjs-dist/build/pdf.worker.mjs')).toBe('pdfjs-dist')
    expect(matchOptionalPeer('@vue-flow/core/dist/style.css')).toBe('@vue-flow/core')
    expect(matchOptionalPeer('vue')).toBeNull()
  })
})

describe('optionalPeerStubPath', () => {
  it('入口与样式走不同占位文件', () => {
    expect(optionalPeerStubPath('xlsx')).toMatch(/dynamic\.js$/)
    expect(optionalPeerStubPath('vue-virtual-scroller')).toMatch(/vue-virtual-scroller\.js$/)
    expect(optionalPeerStubPath('@vue-flow/core/dist/style.css')).toMatch(/empty\.css$/)
  })
})

describe('apformOptionalPeers', () => {
  /**
   * @param root 临时 Vite 根目录
   * @param source 入口源码
   */
  async function transformEntry(root: string, source: string): Promise<string> {
    mkdirSync(path.join(root, 'src'), { recursive: true })
    writeFileSync(path.join(root, 'src', 'entry.ts'), source)
    const server: ViteDevServer = await createServer({
      root,
      configFile: false,
      logLevel: 'silent',
      plugins: [apformOptionalPeers()],
      server: { middlewareMode: true },
      appType: 'custom',
      optimizeDeps: { noDiscovery: true },
    })
    try {
      const result = await server.transformRequest('/src/entry.ts')
      expect(result?.code).toBeTruthy()
      return result?.code ?? ''
    } finally {
      await server.close()
    }
  }

  it('未安装 xlsx 时动态 import 解析到空模块', async () => {
    const root = realpathSync(mkdtempSync(path.join(tmpdir(), 'apform-opt-missing-')))
    try {
      const code = await transformEntry(root, `export const load = () => import('xlsx')\n`)
      expect(code).toContain('dynamic.js')
      expect(code).not.toContain('Failed to resolve')
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('已安装 xlsx 时走真实包', async () => {
    const root = realpathSync(mkdtempSync(path.join(tmpdir(), 'apform-opt-present-')))
    try {
      const pkgDir = path.join(root, 'node_modules', 'xlsx')
      mkdirSync(pkgDir, { recursive: true })
      writeFileSync(
        path.join(pkgDir, 'package.json'),
        JSON.stringify({ name: 'xlsx', type: 'module', module: './index.js' }),
      )
      writeFileSync(path.join(pkgDir, 'index.js'), 'export function read() { return {} }\nexport const utils = {}\n')
      const code = await transformEntry(root, `export const load = () => import('xlsx')\n`)
      expect(code).toContain('xlsx')
      expect(code).not.toContain('stubs/dynamic.js')
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('未安装 vue-virtual-scroller 时静态 import 仍能转换', async () => {
    const root = realpathSync(mkdtempSync(path.join(tmpdir(), 'apform-opt-static-')))
    try {
      const code = await transformEntry(
        root,
        `import { DynamicScroller } from 'vue-virtual-scroller'\nexport { DynamicScroller }\n`,
      )
      expect(code).toContain('vue-virtual-scroller.js')
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })
})
