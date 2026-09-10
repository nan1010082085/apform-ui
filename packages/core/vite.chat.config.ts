/**
 * Chat 轻量入口独立构建。
 * 与主入口分开打，避免多 entry 触发 shared chunk / 改写 apform-ui.css。
 * 入口不含 BpmnFlowPreviewCanvas，产物不应出现 @vue-flow。
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/chat.ts', 'src/types/chat.ts', 'src/components', 'src/composables', 'src/utils'],
      exclude: [
        'src/components/Chat/BpmnFlowPreviewCanvas/**',
        'src/**/*.spec.ts',
        'src/**/*.test.ts',
        'src/docs/**',
        'src/index.ts',
      ],
      outDir: 'dist',
      entryRoot: 'src',
      rollupTypes: true,
      insertTypesEntry: false,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/chat.ts'),
      name: 'ApformUIChat',
      fileName: 'chat',
    },
    rollupOptions: {
      external: [
        'vue',
        /^vue\/.*/,
        'element-plus',
        /^element-plus\/.*/,
        'pdfjs-dist',
        /^pdfjs-dist\/.*/,
        'xlsx',
        'vue-virtual-scroller',
        /^vue-virtual-scroller\/.*/,
      ],
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
          'pdfjs-dist': 'pdfjsLib',
          xlsx: 'XLSX',
          'vue-virtual-scroller': 'VueVirtualScroller',
        },
        /** 避免覆盖主包 apform-ui.css */
        assetFileNames: () => 'chat.css',
      },
    },
    cssCodeSplit: false,
  },
})
