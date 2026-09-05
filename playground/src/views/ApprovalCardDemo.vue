<script setup lang="ts">
/**
 * ApprovalCard — 人机确认卡片
 */
import { ref } from 'vue'
import { ApprovalCard, type WaitingPayload } from '@apform-ui/core'

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
</script>

<template>
  <div class="wrap">
    <h2>ApprovalCard</h2>
    <p>等待用户确认时的操作卡片。</p>
    <div class="block">
      <ApprovalCard
        :waiting="waiting"
        :disabled="false"
        @resume="(action) => (last = action)"
      />
    </div>
    <p v-if="last" class="hint">最近操作：{{ last }}</p>
  </div>
</template>

<style scoped>
.wrap {
  padding: var(--spacing-md, 16px);
  max-width: 560px;
}
.block {
  background: var(--bg-color-white, #fff);
  border: 1px solid var(--border-color-light, #ebedf3);
  border-radius: 4px;
  padding-top: 8px;
}
.hint {
  margin-top: 12px;
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
