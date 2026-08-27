import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        i18n: resolve(__dirname, 'src/i18n.ts'),
        analytics: resolve(__dirname, 'src/analytics.ts'),
        permission: resolve(__dirname, 'src/permission.ts'),
      },
      name: 'SchemaUIPlugins',
      fileName: 'plugins',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
      },
    },
  },
})
