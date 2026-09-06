<script setup lang="ts">
/**
 * SeverityBadge — 告警严重级别徽章
 *
 * 与 StatusTag（服务健康）语义不同，不混用。
 */
import { computed } from 'vue'

/** 告警严重级别 */
export type AlertSeverity = 'critical' | 'warning' | 'info'

const props = withDefaults(
  defineProps<{
    /** 严重级别 */
    severity: AlertSeverity
    /** 脉冲动画（critical 默认开启） */
    pulse?: boolean
    /** 尺寸 */
    size?: 'small' | 'default' | 'large'
  }>(),
  {
    size: 'default',
  },
)

const shouldPulse = computed(
  () => props.pulse ?? props.severity === 'critical',
)

const labelMap: Record<AlertSeverity, string> = {
  critical: '严重',
  warning: '警告',
  info: '信息',
}
</script>

<template>
  <span
    class="apf-severity-badge"
    :class="[
      `apf-severity-badge--${severity}`,
      `apf-severity-badge--${size}`,
      { 'apf-severity-badge--pulse': shouldPulse },
    ]"
  >
    <i class="apf-severity-badge__dot" aria-hidden="true" />
    <span>{{ labelMap[severity] }}</span>
  </span>
</template>

<style scoped>
.apf-severity-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 2px 10px;
  border-radius: var(--border-radius-full);
  font-weight: var(--font-weight-medium);
  line-height: 1.4;
  white-space: nowrap;
}

.apf-severity-badge--small {
  font-size: var(--font-size-11);
  padding: 1px 8px;
}

.apf-severity-badge--default {
  font-size: var(--font-size-12);
}

.apf-severity-badge--large {
  font-size: var(--font-size-13);
  padding: 4px 12px;
}

.apf-severity-badge__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
}

.apf-severity-badge--critical {
  background: var(--color-danger-bg);
  color: var(--color-danger);
}

.apf-severity-badge--warning {
  background: var(--color-warning-bg);
  color: var(--color-warning);
}

.apf-severity-badge--info {
  background: var(--color-info-bg);
  color: var(--color-info);
}

.apf-severity-badge--pulse .apf-severity-badge__dot {
  animation: apf-severity-pulse var(--duration-slow) ease-out infinite;
}

@keyframes apf-severity-pulse {
  0% {
    box-shadow: 0 0 0 0 currentColor;
  }
  70% {
    box-shadow: 0 0 0 6px transparent;
  }
  100% {
    box-shadow: 0 0 0 0 transparent;
  }
}
</style>
