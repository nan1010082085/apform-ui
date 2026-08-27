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
      name: 'ApformUI',
      fileName: 'apform-ui',
    },
    rollupOptions: {
      // 只保留 vue 和 element-plus 为外部，其余全部打包
      external: ['vue', /^vue\/.*/, 'element-plus', /^element-plus\/.*/],
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'apform-ui.css'
          return assetInfo.name || 'asset'
        },
      },
    },
    cssCodeSplit: false,
  },
})
