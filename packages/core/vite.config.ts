import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src'],
      outDir: 'dist',
      rollupTypes: true,
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.{spec,test}.ts'],
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ApformUI',
      fileName: 'apform-ui',
    },
    rollupOptions: {
      // 只保留 vue 和 element-plus 为外部，其余全部打包
      external: [
        'vue',
        /^vue\/.*/,
        'element-plus',
        /^element-plus\/.*/,
        'pdfjs-dist',
        /^pdfjs-dist\/.*/,
        'xlsx',
      ],
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
          'pdfjs-dist': 'pdfjsLib',
          xlsx: 'XLSX',
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
