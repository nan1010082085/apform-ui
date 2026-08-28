import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: [
    '../packages/core/src/**/*.mdx',
    '../packages/core/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@apform-ui/core': resolve(__dirname, '../packages/core/src/index.ts'),
    }
    return config
  },
}
export default config
