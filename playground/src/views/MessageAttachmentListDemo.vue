<script setup lang="ts">
/**
 * MessageAttachmentList — 附件列表
 */
import { ref } from 'vue'
import { MessageAttachmentList, type MessageAttachment } from '@apform-ui/core'

const last = ref('')
const attachments: MessageAttachment[] = [
  {
    id: 'a1',
    filename: 'preview.png',
    mimetype: 'image/png',
    url: 'https://via.placeholder.com/320x180.png?text=Preview',
    size: 10240,
  },
  {
    id: 'a2',
    filename: 'schema.json',
    mimetype: 'application/json',
    url: '#',
    size: 2048,
  },
]
</script>

<template>
  <div class="wrap">
    <h2>MessageAttachmentList</h2>
    <p>消息附件列表，点击预览。</p>
    <div class="block">
      <MessageAttachmentList :attachments="attachments" @preview="(a) => (last = a.filename)" />
    </div>
    <p v-if="last" class="hint">预览：{{ last }}</p>
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
.hint {
  margin-top: 8px;
  color: var(--text-color-muted, #909399);
  font-size: 13px;
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
