<script setup lang="ts">
/**
 * ServiceGrid — 服务状态矩阵
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
      <div class="apf-service-grid__bar" />
      <div class="apf-service-grid__body">
        <div class="apf-service-grid__name">{{ svc.name }}</div>
        <div
          class="apf-service-grid__status"
          :class="`apf-service-grid__status--${svc.status}`"
        >
          {{ STATUS_LABEL[svc.status] }}
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
      </div>
    </button>
  </div>
</template>

<style scoped>
.apf-service-grid {
  display: grid;
  gap: 12px;
  width: 100%;
}

.apf-service-grid__item {
  display: flex;
  text-align: left;
  padding: 0;
  margin: 0;
  border: 1px solid var(--border-color-light);
  border-radius: var(--border-radius-8);
  background: var(--bg-color-white);
  cursor: pointer;
  overflow: hidden;
  transition: box-shadow var(--duration-fast) ease;
  font: inherit;
  color: inherit;
}

.apf-service-grid__item:hover {
  box-shadow: var(--shadow-md);
}

.apf-service-grid__item--error {
  background: var(--color-danger-bg);
  border-color: var(--color-danger);
}

.apf-service-grid__bar {
  width: 3px;
  flex-shrink: 0;
  align-self: stretch;
}

.apf-service-grid__item--healthy .apf-service-grid__bar {
  background: var(--color-success);
}

.apf-service-grid__item--warning .apf-service-grid__bar {
  background: var(--color-warning);
}

.apf-service-grid__item--error .apf-service-grid__bar {
  background: var(--color-danger);
}

.apf-service-grid__item--unknown .apf-service-grid__bar {
  background: var(--text-color-muted);
}

.apf-service-grid__body {
  flex: 1;
  padding: 12px;
  min-width: 0;
}

.apf-service-grid__name {
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-medium);
  color: var(--text-color-title);
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.apf-service-grid__status {
  font-size: var(--font-size-12);
  margin-bottom: 8px;
}

.apf-service-grid__status--healthy {
  color: var(--color-success);
}

.apf-service-grid__status--warning {
  color: var(--color-warning);
}

.apf-service-grid__status--error {
  color: var(--color-danger);
}

.apf-service-grid__status--unknown {
  color: var(--text-color-muted);
}

.apf-service-grid__metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: var(--font-size-12);
  font-family: var(--font-family-mono);
  color: var(--text-color-muted);
}

.apf-service-grid__metrics .is-stale {
  color: var(--color-warning);
}

.apf-service-grid__skel {
  height: 96px;
  border-radius: var(--border-radius-8);
  background: linear-gradient(
    90deg,
    var(--bg-color-gray) 25%,
    var(--bg-color-gray-light) 50%,
    var(--bg-color-gray) 75%
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
