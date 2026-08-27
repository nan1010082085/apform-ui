import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SchemaUIIcons',
      fileName: 'icons',
    },
    rollupOptions: {
      external: ['@iconify/vue', /^@iconify-icons\/.*/],
      output: {
        globals: { '@iconify/vue': 'IconifyVue' },
      },
    },
  },
})
