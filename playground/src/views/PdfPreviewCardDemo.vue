<script setup lang="ts">
/**
 * PdfPreviewCard PDF 预览文档示例
 */
import { PdfPreviewCard } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const basicSource = `<template>
  <PdfPreviewCard url="https://example.com/doc.pdf" title="示例 PDF" />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="iframe PDF 预览；解析/鉴权由父组件处理，或通过 slot 注入自定义渲染器。"
      :source="basicSource"
    >
      <PdfPreviewCard
        url="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        title="示例 PDF"
      />
    </DemoBlock>
  </div>
</template>
