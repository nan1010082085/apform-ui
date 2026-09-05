<script setup lang="ts">
/**
 * AttachmentPreviewModal 附件预览弹框文档示例
 */
import { ref } from 'vue'
import { AttachmentPreviewModal, type MessageAttachment } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const open = ref(false)
const current = ref<MessageAttachment | null>(null)

const gallery: MessageAttachment[] = [
  {
    id: 'img1',
    filename: 'demo-a.png',
    mimetype: 'image/png',
    url: 'https://picsum.photos/seed/apform-a/640/400',
  },
  {
    id: 'img2',
    filename: 'demo-b.png',
    mimetype: 'image/png',
    url: 'https://picsum.photos/seed/apform-b/640/400',
  },
]

const pdfAtt: MessageAttachment = {
  id: 'pdf1',
  filename: 'sample.pdf',
  mimetype: 'application/pdf',
  url: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
}

const officeAtt: MessageAttachment = {
  id: 'xlsx1',
  filename: 'report.xlsx',
  mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  url: 'https://example.com/report.xlsx',
  size: 20480,
}

/**
 * @param att 打开预览的附件
 */
function openWith(att: MessageAttachment) {
  current.value = att
  open.value = true
}

const basicSource = `<AttachmentPreviewModal
  v-model="open"
  v-model:attachment="current"
  :gallery="gallery"
/>`
</script>

<template>
  <div>
    <DemoBlock
      title="多图 gallery / PDF / 降级下载"
      description="多图可左右切换；PDF iframe 预览；Office 降级打开/下载。"
      :source="basicSource"
    >
      <div class="actions">
        <el-button type="primary" @click="openWith(gallery[0])">多图预览</el-button>
        <el-button @click="openWith(pdfAtt)">PDF 预览</el-button>
        <el-button @click="openWith(officeAtt)">Office 降级</el-button>
      </div>
      <AttachmentPreviewModal
        v-model="open"
        v-model:attachment="current"
        :gallery="gallery"
      />
    </DemoBlock>
  </div>
</template>

<style scoped>
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
