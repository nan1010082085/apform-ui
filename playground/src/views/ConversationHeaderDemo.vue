<script setup lang="ts">
/**
 * ConversationHeader 对话顶栏文档示例
 */
import { ref } from 'vue'
import { ConversationHeader } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const hasMessages = ref(true)
const processing = ref(false)
const last = ref('')

const basicSource = `<template>
  <ConversationHeader
    title="演示智能体"
    :has-messages="hasMessages"
    :processing="processing"
    @create="onCreate"
  />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="对话页顶栏：标题、处理中、新建 / 选择智能体。"
      :source="basicSource"
    >
      <div class="panel">
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
    </DemoBlock>
  </div>
</template>

<style scoped>
.panel {
  border: 1px solid #ebedf3;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 12px;
}
.row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.hint {
  margin: 8px 0 0;
  color: #909399;
  font-size: 13px;
}
</style>
