<script setup lang="ts">
/**
 * DocumentSummaryList — 文档摘要列表
 */
import {
  DocumentSummaryList,
  type MessageDocumentSummary,
  type MessageAttachment,
} from '@apform-ui/core'

const summaries: MessageDocumentSummary[] = [
  {
    documentId: 'd1',
    filename: 'requirements.pdf',
    summary: '项目背景、目标用户与核心流程概述。',
    pageCount: 12,
  },
  {
    documentId: 'd2',
    filename: 'schema.json',
    summary: '包含用户信息与权限相关字段定义。',
  },
]

const attachments: MessageAttachment[] = [
  {
    id: 'a1',
    filename: 'requirements.pdf',
    mimetype: 'application/pdf',
    url: '#',
    size: 4096,
  },
]
</script>

<template>
  <div class="wrap">
    <h2>DocumentSummaryList</h2>
    <p>文档摘要卡片列表，可关联附件预览。</p>
    <div class="block">
      <DocumentSummaryList :summaries="summaries" :attachments="attachments" />
    </div>
  </div>
</template>

<style scoped>
.wrap {
  padding: var(--spacing-md, 16px);
  max-width: 560px;
}
.block {
  padding: 16px;
  background: var(--bg-color-white, #fff);
  border: 1px solid var(--border-color-light, #ebedf3);
  border-radius: 4px;
}
h2 {
  margin: 0 0 4px;
}
p {
  margin: 0 0 16px;
  color: var(--text-color-secondary, #666);
  font-size: 13px;
}
</style>
