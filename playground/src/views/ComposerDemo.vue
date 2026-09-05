<script setup lang="ts">
/**
 * Composer — 输入发送区
 */
import { ref } from 'vue'
import { Composer } from '@apform-ui/core'

const last = ref('')
function onSend(content: string) {
  last.value = content
}
</script>

<template>
  <div class="wrap">
    <h2>Composer</h2>
    <p>对话输入框，支持发送。</p>
    <div class="block">
      <Composer :disabled="false" placeholder="输入消息…" @send="onSend" />
      <p v-if="last" class="hint">最近发送：{{ last }}</p>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  padding: var(--spacing-md, 16px);
  max-width: 720px;
}
.block {
  border: 1px solid var(--border-color-light, #ebedf3);
  border-radius: 4px;
  overflow: hidden;
  background: var(--bg-color-white, #fff);
}
.hint {
  margin: 0;
  padding: 8px 16px;
  font-size: 13px;
  color: var(--text-color-muted, #909399);
  border-top: 1px solid var(--border-color-light, #ebedf3);
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
