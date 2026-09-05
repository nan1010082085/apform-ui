import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

const coreSrc = fileURLToPath(new URL('../packages/core/src', import.meta.url))
const coreRoot = fileURLToPath(new URL('../packages/core', import.meta.url))

export default defineConfig({
  plugins: [vue()],
  base: '/schema-platform/apform-ui/',
  resolve: {
    alias: [
      {
        find: '@apform-ui/core/docs',
        replacement: `${coreSrc}/docs/index.ts`,
      },
      {
        find: '@apform-ui/core/tokens.css',
        replacement: `${coreSrc}/tokens/tokens.css`,
      },
      {
        find: '@apform-ui/core/design-tokens.css',
        replacement: `${coreSrc}/tokens/design-tokens.css`,
      },
      {
        find: '@apform-ui/core/styles/element-override.css',
        replacement: `${coreRoot}/styles/element-override.css`,
      },
      {
        find: '@apform-ui/core/theme/dark.css',
        replacement: `${coreSrc}/theme/dark.css`,
      },
      {
        find: /^@apform-ui\/core$/,
        replacement: `${coreSrc}/index.ts`,
      },
    ],
  },
})
