import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * @apform-ui Storybook — 组件库唯一文档入口
 * 展示源：playground Demo（与真实使用同源）
 * @type { import('@storybook/vue3-vite').StorybookConfig }
 */
const config = {
  stories: [
    './Introduction.mdx',
    '../packages/core/src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: false,
  },
  async viteFinal(config, { configType }) {
    config.resolve = config.resolve || {}
    config.resolve.alias = [
      ...(Array.isArray(config.resolve.alias)
        ? config.resolve.alias
        : Object.entries(config.resolve.alias || {}).map(([find, replacement]) => ({
            find,
            replacement,
          }))),
      {
        find: /^@apform-ui\/core$/,
        replacement: resolve(__dirname, '../packages/core/src/index.ts'),
      },
    ]
    config.optimizeDeps = config.optimizeDeps || {}
    config.optimizeDeps.include = [
      ...(config.optimizeDeps.include || []),
      'element-plus',
      '@element-plus/icons-vue',
      '@iconify/vue',
    ]
    /**
     * Storybook 自带 vue 插件可能未覆盖 playground 路径；
     * 追加一个全量 .vue 处理器。
     */
    config.plugins = [
      vue({ include: [/\.vue$/] }),
      ...(config.plugins || []),
    ]
    if (configType === 'PRODUCTION') {
      config.base = '/apform-ui/'
    }
    return config
  },
}

export default config
