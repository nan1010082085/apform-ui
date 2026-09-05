<script setup lang="ts">
/**
 * MessageAttachmentList 文档示例 — 点击打开 AttachmentPreviewModal
 */
import { ref, computed } from 'vue'
import {
  AttachmentPreviewModal,
  MessageAttachmentList,
  type MessageAttachment,
} from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const previewOpen = ref(false)
const current = ref<MessageAttachment | null>(null)

const attachments: MessageAttachment[] = [
  {
    id: 'a1',
    filename: 'preview-a.png',
    mimetype: 'image/png',
    url: 'https://picsum.photos/seed/apform-attach-a/320/180',
    size: 10240,
  },
  {
    id: 'a2',
    filename: 'preview-b.png',
    mimetype: 'image/png',
    url: 'https://picsum.photos/seed/apform-attach-b/320/180',
    size: 8192,
  },
  {
    id: 'a3',
    filename: 'spec.pdf',
    mimetype: 'application/pdf',
    url: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
    size: 40960,
  },
  {
    id: 'a4',
    filename: 'schema.json',
    mimetype: 'application/json',
    url: 'https://example.com/schema.json',
    size: 2048,
    excerpt: '包含用户与权限相关字段定义片段…',
  },
]

const gallery = computed(() =>
  attachments.filter((a) => a.mimetype.startsWith('image/')),
)

/**
 * @param att 被点击的附件
 */
function onPreview(att: MessageAttachment) {
  current.value = att
  previewOpen.value = true
}

const basicSource = `<MessageAttachmentList :attachments="attachments" @preview="onPreview" />
<AttachmentPreviewModal
  v-model="open"
  v-model:attachment="current"
  :gallery="gallery"
/>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="多图 gallery、PDF 预览、带 excerpt 的降级文件。"
      :source="basicSource"
    >
      <div class="panel">
        <MessageAttachmentList :attachments="attachments" @preview="onPreview" />
      </div>
      <AttachmentPreviewModal
        v-model="previewOpen"
        v-model:attachment="current"
        :gallery="gallery"
      />
    </DemoBlock>
  </div>
</template>

<style scoped>
.panel {
  max-width: 560px;
}
</style>
