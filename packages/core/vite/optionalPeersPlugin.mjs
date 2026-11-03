/**
 * 宿主 Vite 插件：可选 peer 未安装时解析到空模块。
 *
 * `import('xlsx')` 这类字面量会被 Vite 在转换阶段解析；失败发生在组件 try/catch 之前，整站起不来。
 * 包已安装时放行真实模块；未安装时指向本目录 stubs，动态加载返回空对象，静态 import 得到同名占位导出。
 */
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const stubDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'stubs')

/** @type {readonly string[]} */
const OPTIONAL_PACKAGES = [
  'xlsx',
  'echarts',
  'pdfjs-dist',
  'vue-virtual-scroller',
  '@vue-flow/core',
  '@vue-flow/background',
  '@vue-flow/controls',
]

const OPTIONAL_SPEC_RE =
  /^(?:xlsx|echarts|pdfjs-dist|vue-virtual-scroller|@vue-flow\/(?:core|background|controls))(?:\/|\?|$)/

const dynamicStub = path.join(stubDir, 'dynamic.js')
const emptyCss = path.join(stubDir, 'empty.css')

/** @type {Record<string, string>} */
const ENTRY_STUBS = {
  'vue-virtual-scroller': path.join(stubDir, 'vue-virtual-scroller.js'),
  '@vue-flow/core': path.join(stubDir, 'vue-flow-core.js'),
  '@vue-flow/background': path.join(stubDir, 'vue-flow-background.js'),
  '@vue-flow/controls': path.join(stubDir, 'vue-flow-controls.js'),
}

/**
 * 去掉查询串后的模块说明符
 * @param {string} id
 */
function bareSpecifier(id) {
  const query = id.indexOf('?')
  return query === -1 ? id : id.slice(0, query)
}

/**
 * 命中可选 peer 时返回包名，否则 null
 * @param {string} id
 * @returns {string | null}
 */
export function matchOptionalPeer(id) {
  const bare = bareSpecifier(id)
  return OPTIONAL_PACKAGES.find((name) => bare === name || bare.startsWith(`${name}/`)) ?? null
}

/**
 * 未安装时应对应的占位文件绝对路径
 * @param {string} id
 */
export function optionalPeerStubPath(id) {
  const bare = bareSpecifier(id)
  if (bare.endsWith('.css')) return emptyCss
  return ENTRY_STUBS[bare] ?? dynamicStub
}

/**
 * 从 Vite 项目根向上查找 node_modules。
 * 不用 require.resolve：测试运行器和宿主的模块解析起点可能不是当前项目。
 * @param {string} spec
 * @param {string} projectRoot
 */
function canResolveFrom(spec, projectRoot) {
  const pkgName = matchOptionalPeer(spec)
  if (!pkgName || !projectRoot) return false
  let dir = path.resolve(projectRoot)
  for (let i = 0; i < 8; i++) {
    if (existsSync(path.join(dir, 'node_modules', pkgName, 'package.json'))) return true
    const parent = path.dirname(dir)
    if (parent === dir) break
    dir = parent
  }
  return false
}

/**
 * @returns {import('vite').Plugin}
 */
export function apformOptionalPeers() {
  let projectRoot = process.cwd()

  /** @type {import('esbuild').Plugin} */
  const esbuildPlugin = {
    name: 'apform-optional-peers',
    setup(build) {
      build.onResolve({ filter: OPTIONAL_SPEC_RE }, (args) => {
        if (canResolveFrom(args.path, projectRoot)) return null
        return { path: optionalPeerStubPath(args.path) }
      })
    },
  }

  return {
    name: 'apform-optional-peers',
    enforce: 'pre',
    config() {
      return {
        optimizeDeps: {
          esbuildOptions: {
            plugins: [esbuildPlugin],
          },
        },
      }
    },
    configResolved(config) {
      projectRoot = config.root
      const allow = config.server.fs.allow
      if (!allow.includes(stubDir)) allow.push(stubDir)
    },
    /**
     * @param {string} source
     * @param {string | undefined} importer
     */
    resolveId(source) {
      if (!matchOptionalPeer(source)) return null
      if (canResolveFrom(source, projectRoot)) return null
      return optionalPeerStubPath(source)
    },
  }
}
