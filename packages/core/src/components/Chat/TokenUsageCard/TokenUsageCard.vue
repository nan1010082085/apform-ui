<script setup lang="ts">
/**
 * TokenUsageCard — Token / 费用摘要卡
 */
import { computed } from 'vue'

const props = defineProps<{
  inputTokens: number
  outputTokens: number
  totalTokens?: number
  estimatedCost?: number | null
  model?: string
  title?: string
}>()

const total = computed(
  () => props.totalTokens ?? props.inputTokens + props.outputTokens,
)

const totalLabel = computed(() => {
  const tokens = total.value
  if (tokens >= 1000000) return `${(tokens / 1000000).toFixed(2)}M`
  if (tokens >= 1000) return `${(tokens / 1000).toFixed(1)}K`
  return String(tokens)
})

const costLabel = computed(() => {
  const cost = props.estimatedCost
  if (cost == null) return null
  if (cost < 0.01) return '<$0.01'
  return `$${cost.toFixed(4)}`
})
</script>

<template>
  <div class="apf-token-usage">
    <div class="apf-token-usage__head">
      <span class="apf-token-usage__title">{{ title || 'Token 消耗' }}</span>
    </div>
    <div class="apf-token-usage__body">
      <div class="apf-token-usage__stats">
        <div class="apf-token-usage__stat">
          <span class="apf-token-usage__label">输入</span>
          <span class="apf-token-usage__value">{{ inputTokens.toLocaleString() }}</span>
        </div>
        <div class="apf-token-usage__stat">
          <span class="apf-token-usage__label">输出</span>
          <span class="apf-token-usage__value">{{ outputTokens.toLocaleString() }}</span>
        </div>
        <div class="apf-token-usage__stat is-total">
          <span class="apf-token-usage__label">总计</span>
          <span class="apf-token-usage__value">{{ totalLabel }}</span>
        </div>
      </div>
      <div v-if="costLabel || model" class="apf-token-usage__footer">
        <span v-if="model" class="apf-token-usage__model">{{ model }}</span>
        <span v-if="costLabel" class="apf-token-usage__cost">{{ costLabel }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.apf-token-usage {
  border: 1px solid var(--c-border, #e4e7ed);
  border-radius: 8px;
  overflow: hidden;
}

.apf-token-usage__head {
  padding: 8px 12px;
  background: var(--c-bg-muted, #f5f7fa);
  border-bottom: 1px solid var(--c-border, #e4e7ed);
}

.apf-token-usage__title {
  font-size: 12px;
  font-weight: 500;
}

.apf-token-usage__body {
  padding: 12px;
}

.apf-token-usage__stats {
  display: flex;
  gap: 16px;
}

.apf-token-usage__stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.apf-token-usage__stat.is-total {
  padding-left: 16px;
  border-left: 1px solid var(--c-border, #e4e7ed);
}

.apf-token-usage__label {
  font-size: 11px;
  color: var(--c-text-muted, #909399);
}

.apf-token-usage__value {
  font-size: 16px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.apf-token-usage__footer {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--c-border, #e4e7ed);
}

.apf-token-usage__model {
  font-size: 11px;
  color: var(--c-text-muted, #909399);
}

.apf-token-usage__cost {
  font-size: 13px;
  font-weight: 500;
  color: var(--c-warning, #e6a23c);
}
</style>
