<script setup lang="ts">
/**
 * DocumentSummaryList 文档摘要列表文档示例
 */
import { ref } from 'vue'
import {
  AttachmentPreviewModal,
  DocumentSummaryList,
  type MessageDocumentSummary,
  type MessageAttachment,
} from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const previewOpen = ref(false)
const current = ref<MessageAttachment | null>(null)

const summaries: MessageDocumentSummary[] = [
  {
    documentId: 'd1',
    filename: 'requirements.pdf',
    summary: '项目背景、目标用户与核心流程概述。',
    pageCount: 12,
    attachmentId: 'a1',
  },
  {
    documentId: 'd2',
    filename: 'schema.json',
    summary: '包含用户信息与权限相关字段定义（无匹配附件）。',
  },
]

const attachments: MessageAttachment[] = [
  {
    id: 'a1',
    filename: 'requirements.pdf',
    mimetype: 'application/pdf',
    url: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
    size: 4096,
  },
]

/**
 * @param att 被预览的附件
 */
function onPreview(att: MessageAttachment) {
  current.value = att
  previewOpen.value = true
}

const basicSource = `<template>
  <DocumentSummaryList
    :summaries="summaries"
    :attachments="attachments"
    @preview="onPreview"
  />
  <AttachmentPreviewModal v-model="open" v-model:attachment="current" />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="有匹配附件时可点开预览；无匹配时显示不可点提示。"
      :source="basicSource"
    >
      <div class="panel">
        <DocumentSummaryList
          :summaries="summaries"
          :attachments="attachments"
          @preview="onPreview"
        />
      </div>
      <AttachmentPreviewModal
        v-model="previewOpen"
        v-model:attachment="current"
      />
    </DemoBlock>
  </div>
</template>

<style scoped>
.panel {
  max-width: 560px;
}
</style>
