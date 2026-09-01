<template>
  <div class="demo-section">
    <h2>DocumentPreview 组件</h2>
    <p>DocumentPreviewPanel 文档预览面板的示例。</p>

    <div class="demo-block">
      <h3>基础用法</h3>
      <DocumentPreviewPanel
        filename="需求说明.pdf"
        mimetype="application/pdf"
        :size="248320"
        extraction-method="text"
        has-original-file
        :chunks="chunks"
        @download="onDownload"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DocumentPreviewPanel } from '@apform-ui/core'

const chunks = ref([
  { index: 0, text: '第一章 项目背景：Schema Platform 面向表单/流程垂直场景……' },
  { index: 1, text: '第二章 核心目标：对话智能体、可视化工作流编排、RAG 知识库……' },
])

function onDownload() {
  // 下载由宿主处理
}
</script>

<style scoped>
.demo-section {
  padding: 20px;
}

.demo-block {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.demo-block h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 16px;
  color: #303133;
}
</style>
