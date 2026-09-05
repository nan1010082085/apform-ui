<script setup lang="ts">
/**
 * DocumentPreviewPanel 文档预览面板文档示例
 */
import { ref } from 'vue'
import { DocumentPreviewPanel } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'
import { ElMessage } from 'element-plus'

const chunks = ref([
  { index: 0, text: '第一章 项目背景：Schema Platform 面向表单/流程垂直场景……' },
  { index: 1, text: '第二章 核心目标：对话智能体、可视化工作流编排、RAG 知识库……' },
])

const pdfUrl =
  'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'

/**
 * 下载事件由宿主处理（示例：提示）
 */
function onDownload() {
  ElMessage.success('宿主已收到 download 事件（可在此触发真实下载）')
}

const basicSource = `<DocumentPreviewPanel
  filename="需求说明.pdf"
  mimetype="application/pdf"
  :pdf-url="pdfUrl"
  has-original-file
  @download="onDownload"
/>`
</script>

<template>
  <div>
    <DemoBlock
      title="PDF 预览 + 下载回调"
      description="默认接入 PdfPreviewCard；未装 pdfjs 时回退 iframe。下载事件由宿主处理。"
      :source="basicSource"
    >
      <div class="panel">
        <DocumentPreviewPanel
          filename="需求说明.pdf"
          mimetype="application/pdf"
          :size="248320"
          :pdf-url="pdfUrl"
          has-original-file
          @download="onDownload"
        />
      </div>
    </DemoBlock>

    <DemoBlock
      title="文本分块"
      description="无 pdf/excel URL 时展示 chunks。"
      source="<DocumentPreviewPanel :chunks=\"chunks\" />"
    >
      <DocumentPreviewPanel
        filename="notes.md"
        mimetype="text/markdown"
        :chunks="chunks"
      />
    </DemoBlock>
  </div>
</template>

<style scoped>
.panel {
  min-height: 360px;
}
</style>
