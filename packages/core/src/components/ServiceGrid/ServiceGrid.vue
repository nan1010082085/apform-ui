<script setup lang="ts">
/**
 * ServiceGrid — 服务状态矩阵
 *
 * 状态靠文案色与轻量徽标表达，不用左侧色条。
 */
import { computed } from 'vue'
import { EmptyState } from '../EmptyState'
import { formatRelativeTime } from '../../utils/metricFormat'

/** 服务项 */
export interface ServiceItem {
  id: string | number
  name: string
  status: 'healthy' | 'warning' | 'error' | 'unknown'
  metrics?: {
    errorRate?: number
    latencyP95?: number
    eventCount?: number
    lastSeen?: string
  }
}

const STATUS_LABEL: Record<ServiceItem['status'], string> = {
  healthy: '健康',
  warning: '告警',
  error: '故障',
  unknown: '未知',
}

const props = withDefaults(
  defineProps<{
    /** 服务列表 */
    services: ServiceItem[]
    /** 列数（不传则响应式） */
    columns?: number
    /** 骨架屏 */
    loading?: boolean
  }>(),
  {
    loading: false,
  },
)

const emit = defineEmits<{
  'service-click': [service: ServiceItem]
}>()

const gridStyle = computed(() => {
  if (props.columns && props.columns > 0) {
    return {
      gridTemplateColumns: `repeat(${props.columns}, minmax(0, 1fr))`,
    }
  }
  return {
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  }
})

/**
 * lastSeen 是否超时（>5 分钟）
 * @param lastSeen ISO 时间
 */
function isStale(lastSeen?: string): boolean {
  if (!lastSeen) return false
  const ts = Date.parse(lastSeen)
  return Number.isFinite(ts) && Date.now() - ts > 5 * 60 * 1000
}
</script>

<template>
  <div v-if="loading" class="apf-service-grid" :style="gridStyle">
    <div v-for="i in 6" :key="i" class="apf-service-grid__skel" />
  </div>
  <EmptyState v-else-if="!services.length" title="暂无服务" description="等待上报或检查筛选条件" />
  <div v-else class="apf-service-grid" :style="gridStyle">
    <button
      v-for="svc in services"
      :key="svc.id"
      type="button"
      class="apf-service-grid__item"
      :class="`apf-service-grid__item--${svc.status}`"
      @click="emit('service-click', svc)"
    >
      <div class="apf-service-grid__head">
        <span class="apf-service-grid__name" :title="svc.name">{{ svc.name }}</span>
        <span
          class="apf-service-grid__status"
          :class="`apf-service-grid__status--${svc.status}`"
        >
          <i class="apf-service-grid__dot" aria-hidden="true" />
          {{ STATUS_LABEL[svc.status] }}
        </span>
      </div>
      <div v-if="svc.metrics" class="apf-service-grid__metrics">
        <span v-if="svc.metrics.errorRate != null">
          err {{ svc.metrics.errorRate.toFixed(1) }}%
        </span>
        <span v-if="svc.metrics.latencyP95 != null">
          p95 {{ Math.round(svc.metrics.latencyP95) }}ms
        </span>
        <span v-if="svc.metrics.eventCount != null">
          n {{ svc.metrics.eventCount.toLocaleString() }}
        </span>
        <span
          v-if="svc.metrics.lastSeen"
          :class="{ 'is-stale': isStale(svc.metrics.lastSeen) }"
        >
          {{ formatRelativeTime(svc.metrics.lastSeen) }}
        </span>
      </div>
    </button>
  </div>
</template>

<style scoped>
.apf-service-grid {
  display: grid;
  gap: 10px;
  width: 100%;
}

.apf-service-grid__item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
  padding: 12px 14px;
  margin: 0;
  border: 1px solid var(--border-color-light, #e3e8ef);
  border-radius: var(--border-radius-8, 8px);
  background: var(--bg-color-white, #fff);
  cursor: pointer;
  font: inherit;
  color: inherit;
  transition:
    border-color var(--duration-fast, 0.15s) ease,
    background-color var(--duration-fast, 0.15s) ease;
}

.apf-service-grid__item:hover {
  border-color: var(--border-color, #c0c4cc);
}

.apf-service-grid__item:focus-visible {
  outline: 2px solid var(--color-primary, #0060a2);
  outline-offset: 2px;
}

/* 仅故障态微染，健康/告警不加底色，避免「每卡一条彩边」 */
.apf-service-grid__item--error {
  background: color-mix(in srgb, var(--color-danger-bg, #fef0f0) 70%, #fff);
  border-color: color-mix(in srgb, var(--color-danger, #f56c6c) 35%, var(--border-color-light, #e3e8ef));
}

.apf-service-grid__item--warning:hover {
  border-color: color-mix(in srgb, var(--color-warning, #e6a23c) 40%, var(--border-color, #c0c4cc));
}

.apf-service-grid__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-width: 0;
}

.apf-service-grid__name {
  min-width: 0;
  font-size: var(--font-size-14, 14px);
  font-weight: var(--font-weight-semibold, 600);
  color: var(--text-color-title, #303133);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: -0.01em;
}

.apf-service-grid__status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
  font-size: var(--font-size-12, 12px);
  line-height: 1;
  color: var(--text-color-secondary, #606266);
}

.apf-service-grid__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
}

.apf-service-grid__status--healthy {
  color: var(--color-success, #67c23a);
}

.apf-service-grid__status--warning {
  color: var(--color-warning, #e6a23c);
}

.apf-service-grid__status--error {
  color: var(--color-danger, #f56c6c);
}

.apf-service-grid__status--unknown {
  color: var(--text-color-muted, #909399);
}

.apf-service-grid__metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 10px;
  font-size: 11px;
  font-family: var(--font-family-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  color: var(--text-color-muted, #909399);
  line-height: 1.45;
}

.apf-service-grid__metrics .is-stale {
  color: var(--color-warning, #e6a23c);
}

.apf-service-grid__skel {
  height: 72px;
  border-radius: var(--border-radius-8, 8px);
  border: 1px solid var(--border-color-light, #e3e8ef);
  background: linear-gradient(
    90deg,
    var(--bg-color-gray, #f5f7fa) 25%,
    var(--bg-color-gray-light, #fafafa) 50%,
    var(--bg-color-gray, #f5f7fa) 75%
  );
  background-size: 200% 100%;
  animation: apf-svc-skel 1.2s ease infinite;
}

@keyframes apf-svc-skel {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
