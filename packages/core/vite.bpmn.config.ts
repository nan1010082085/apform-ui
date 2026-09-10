/**
 * BPMN 预览入口独立构建（含 @vue-flow peer，不写入主包 / chat）。
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: [
        'src/bpmn.ts',
        'src/components/Chat/BpmnFlowPreviewCanvas/**',
        'src/components/AppIcon/**',
        'src/utils/iconRegistry.ts',
      ],
      exclude: ['src/**/*.spec.ts', 'src/**/*.test.ts', 'src/docs/**', 'src/index.ts', 'src/chat.ts'],
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
      entry: resolve(__dirname, 'src/bpmn.ts'),
      name: 'ApformUIBpmn',
      fileName: 'bpmn',
    },
    rollupOptions: {
      external: [
        'vue',
        /^vue\/.*/,
        'element-plus',
        /^element-plus\/.*/,
        '@vue-flow/core',
        /^@vue-flow\/core\/.*/,
        '@vue-flow/background',
        /^@vue-flow\/background\/.*/,
        '@vue-flow/controls',
        /^@vue-flow\/controls\/.*/,
      ],
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
          '@vue-flow/core': 'VueFlowCore',
          '@vue-flow/background': 'VueFlowBackground',
          '@vue-flow/controls': 'VueFlowControls',
        },
        assetFileNames: () => 'bpmn.css',
      },
    },
    cssCodeSplit: false,
  },
})
