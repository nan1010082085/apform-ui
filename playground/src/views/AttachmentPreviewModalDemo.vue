<template>
  <div class="demo-section">
    <h2>AttachmentPreviewModal</h2>
    <p>附件预览弹框。</p>
    <div class="demo-block">
      <button type="button" @click="open = true">打开预览</button>
      <AttachmentPreviewModal
        v-model="open"
        :attachment="{ id: '1', filename: 'demo.png', mimetype: 'image/png', url: 'https://via.placeholder.com/320x180' }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AttachmentPreviewModal } from '@apform-ui/core'

const open = ref(false)
</script>

<style scoped>
.demo-section { padding: 20px; }
.demo-block { padding: 16px; border: 1px solid #ebeef5; border-radius: 8px; }
</style>
