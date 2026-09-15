<script setup lang="ts">
/**
 * PdfPreviewCard PDF 预览文档示例
 */
import { PdfPreviewCard } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const basicSource = `<template>
  <PdfPreviewCard
    url="https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
    title="示例 PDF"
  />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="安装 pdfjs-dist 时启用 canvas 翻页/缩放；demo 使用 mozilla 公共 PDF（支持 CORS）。"
      :source="basicSource"
    >
      <PdfPreviewCard
        url="https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
        title="示例 PDF"
      />
    </DemoBlock>
  </div>
</template>
