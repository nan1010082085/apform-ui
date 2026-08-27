import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SchemaUI',
      fileName: 'schema-ui',
    },
    rollupOptions: {
      external: ['vue', 'element-plus', /^element-plus\/.*/, /^vue\/.*/, '@element-plus/icons-vue', /^@element-plus\/.*/],
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
          '@element-plus/icons-vue': 'ElementPlusIconsVue',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'schema-ui.css'
          return assetInfo.name || 'asset'
        },
      },
    },
    cssCodeSplit: false,
  },
})
