<script setup lang="ts">
/**
 * ApprovalCard 人机确认卡片文档示例
 */
import { ref } from 'vue'
import { ApprovalCard, type WaitingPayload } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const last = ref('')
const waiting = ref<WaitingPayload>({
  prompt: '是否继续执行部署？',
  fields: [],
  actions: [
    { action: 'approve', label: '同意', style: 'primary' },
    { action: 'reject', label: '拒绝', style: 'danger' },
  ],
  dangerous: false,
})

const basicSource = `<template>
  <ApprovalCard :waiting="waiting" :disabled="false" @resume="onResume" />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="等待用户确认时的操作卡片，@resume 回传用户选择。"
      :source="basicSource"
    >
      <div class="panel">
        <ApprovalCard
          :waiting="waiting"
          :disabled="false"
          @resume="(action) => (last = action)"
        />
      </div>
      <p v-if="last" class="hint">最近操作：{{ last }}</p>
    </DemoBlock>
  </div>
</template>

<style scoped>
.panel {
  max-width: 560px;
  padding-top: 8px;
}
.hint {
  margin: 12px 0 0;
  color: #909399;
  font-size: 13px;
}
</style>
