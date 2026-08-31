<template>
  <div class="demo-section">
    <h2>PdfPreviewCard</h2>
    <p>iframe PDF 预览；解析/鉴权由父组件处理，或通过 slot 注入自定义渲染器。</p>
    <PdfPreviewCard
      url="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      title="示例 PDF"
    />
  </div>
</template>

<script setup lang="ts">
import { PdfPreviewCard } from '@apform-ui/core'
</script>

<style scoped>
.demo-section { padding: 8px; }
</style>
