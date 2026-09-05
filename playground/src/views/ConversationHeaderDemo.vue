<script setup lang="ts">
/**
 * ConversationHeader — 对话顶栏
 */
import { ref } from 'vue'
import { ConversationHeader } from '@apform-ui/core'

const hasMessages = ref(true)
const processing = ref(false)
const last = ref('')
</script>

<template>
  <div class="wrap">
    <h2>ConversationHeader</h2>
    <p>对话页顶栏：标题、处理中、新建 / 选择智能体。</p>
    <div class="block">
      <ConversationHeader
        title="演示智能体"
        :has-messages="hasMessages"
        :processing="processing"
        @create="last = 'create'"
        @change-assistant="last = 'changeAssistant'"
        @toggle-details="last = 'toggleDetails'"
      />
    </div>
    <div class="row">
      <el-switch v-model="hasMessages" active-text="有消息" />
      <el-switch v-model="processing" active-text="处理中" />
    </div>
    <p v-if="last" class="hint">事件：{{ last }}</p>
  </div>
</template>

<style scoped>
.wrap {
  padding: var(--spacing-md, 16px);
}
.block {
  border: 1px solid var(--border-color-light, #ebedf3);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 12px;
  background: var(--bg-color-white, #fff);
}
.row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
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
