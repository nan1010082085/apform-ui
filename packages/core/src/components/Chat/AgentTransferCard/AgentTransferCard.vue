<script setup lang="ts">
/**
 * AgentTransferCard — 智能体移交提示条
 */
defineProps<{
  fromLabel: string
  toLabel: string
  reason?: string
}>()
</script>

<template>
  <div class="apf-agent-transfer">
    <div class="apf-agent-transfer__row">
      <span class="apf-agent-transfer__pill">{{ fromLabel }}</span>
      <span class="apf-agent-transfer__arrow" aria-hidden="true">→</span>
      <span class="apf-agent-transfer__pill is-target">{{ toLabel }}</span>
    </div>
    <p v-if="reason" class="apf-agent-transfer__reason">{{ reason }}</p>
  </div>
</template>

<style scoped>
.apf-agent-transfer {
  padding: 10px 12px;
  border: 1px solid var(--c-border, #ebedf3);
  border-radius: var(--radius, 8px);
  background: var(--c-bg-muted, #f7fafa);
}

.apf-agent-transfer__row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.apf-agent-transfer__pill {
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  background: var(--c-surface, #fff);
  border: 1px solid var(--c-border, #ebedf3);
  color: var(--c-text-secondary, #666);
}

.apf-agent-transfer__pill.is-target {
  border-color: var(--c-primary, #0060a2);
  color: var(--c-primary, #0060a2);
  background: var(--c-primary-soft, #eef5ff);
}

.apf-agent-transfer__arrow {
  color: var(--c-text-muted, #999);
  font-size: 12px;
}

.apf-agent-transfer__reason {
  margin: 6px 0 0;
  font-size: 12px;
  color: var(--c-text-secondary, #666);
  line-height: 1.5;
}
</style>
