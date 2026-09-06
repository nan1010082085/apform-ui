<script setup lang="ts">
/**
 * StatCard — 监控统计卡片
 *
 * 紧凑设计：状态色条、环比趋势、可选 sparkline。
 */
import { computed } from 'vue'

/** 环比趋势 */
export interface StatTrend {
  direction: 'up' | 'down' | 'flat'
  percent?: number
  /** 默认 true：up=绿 */
  positiveIsGood?: boolean
}

const props = withDefaults(
  defineProps<{
    /** 标签 */
    label: string
    /** 数值 */
    value: number | string
    /** 单位后缀 */
    unit?: string
    /** 环比 */
    trend?: StatTrend
    /** 趋势线 */
    sparkline?: number[]
    /** 左侧色条状态 */
    status?: 'healthy' | 'warning' | 'error' | 'unknown'
    /** 跳转链接（宿主路由或外链） */
    to?: string
    /** 骨架屏 */
    loading?: boolean
  }>(),
  {
    loading: false,
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const trendColor = computed(() => {
  const t = props.trend
  if (!t || t.direction === 'flat') return 'var(--text-color-muted)'
  const good = t.positiveIsGood !== false
  const isGoodDir = t.direction === 'up' ? good : !good
  return isGoodDir ? 'var(--color-success)' : 'var(--color-danger)'
})

const trendSymbol = computed(() => {
  const d = props.trend?.direction
  if (d === 'up') return '↑'
  if (d === 'down') return '↓'
  return '→'
})

const sparkPath = computed(() => {
  const data = props.sparkline
  if (!data?.length) return ''
  const w = 80
  const h = 32
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  return data
    .map((v, i) => {
      const x = (i / Math.max(data.length - 1, 1)) * w
      const y = h - ((v - min) / range) * (h - 4) - 2
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
})

const sparkStroke = computed(() => {
  if (props.status === 'healthy') return 'var(--color-success)'
  if (props.status === 'warning') return 'var(--color-warning)'
  if (props.status === 'error') return 'var(--color-danger)'
  return 'var(--color-primary)'
})

/**
 * 点击卡片：仅无 to 时抛 click（有 to 走链接导航）
 */
function onClick(e: MouseEvent) {
  if (props.to) return
  emit('click', e)
}
</script>

<template>
  <component
    :is="to ? 'a' : 'div'"
    class="apf-stat-card"
    :class="[
      status ? `apf-stat-card--${status}` : '',
      { 'apf-stat-card--clickable': !!to },
    ]"
    :href="to || undefined"
    :role="to ? undefined : 'button'"
    :tabindex="to ? undefined : 0"
    @click="onClick"
    @keydown.enter.prevent="!to && onClick($event as unknown as MouseEvent)"
  >
    <div v-if="status" class="apf-stat-card__bar" />
    <div v-if="loading" class="apf-stat-card__body">
      <div class="apf-stat-card__skel apf-stat-card__skel--label" />
      <div class="apf-stat-card__skel apf-stat-card__skel--value" />
      <div class="apf-stat-card__skel apf-stat-card__skel--spark" />
    </div>
    <div v-else class="apf-stat-card__body">
      <div class="apf-stat-card__label">{{ label }}</div>
      <div class="apf-stat-card__value-row">
        <span class="apf-stat-card__value">{{ value }}</span>
        <span v-if="unit" class="apf-stat-card__unit">{{ unit }}</span>
        <span
          v-if="trend"
          class="apf-stat-card__trend"
          :style="{ color: trendColor }"
        >
          {{ trendSymbol }}
          <template v-if="trend.percent != null">{{ trend.percent }}%</template>
        </span>
      </div>
      <svg
        v-if="sparkline?.length"
        class="apf-stat-card__spark"
        viewBox="0 0 80 32"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          :d="sparkPath"
          fill="none"
          :stroke="sparkStroke"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </component>
</template>

<style scoped>
.apf-stat-card {
  position: relative;
  display: flex;
  background: var(--bg-color-white);
  border: 1px solid var(--border-color-light);
  border-radius: var(--border-radius-8);
  overflow: hidden;
  min-width: 0;
  text-decoration: none;
  color: inherit;
}

.apf-stat-card--clickable {
  cursor: pointer;
  transition: box-shadow var(--duration-fast) ease;
}

.apf-stat-card--clickable:hover {
  box-shadow: var(--shadow-md);
}

.apf-stat-card[role='button'] {
  cursor: pointer;
}

.apf-stat-card__bar {
  width: 3px;
  flex-shrink: 0;
  align-self: stretch;
}

.apf-stat-card--healthy .apf-stat-card__bar {
  background: var(--color-success);
}

.apf-stat-card--warning .apf-stat-card__bar {
  background: var(--color-warning);
}

.apf-stat-card--error .apf-stat-card__bar {
  background: var(--color-danger);
}

.apf-stat-card--unknown .apf-stat-card__bar {
  background: var(--text-color-muted);
}

.apf-stat-card__body {
  flex: 1;
  padding: 12px 16px;
  min-width: 0;
}

.apf-stat-card__label {
  font-size: var(--font-size-12);
  color: var(--text-color-muted);
  margin-bottom: 4px;
}

.apf-stat-card__value-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
  flex-wrap: wrap;
}

.apf-stat-card__value {
  font-size: var(--font-size-28);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-mono);
  color: var(--text-color-title);
  line-height: 1.2;
}

.apf-stat-card__unit {
  font-size: var(--font-size-12);
  color: var(--text-color-muted);
}

.apf-stat-card__trend {
  font-size: var(--font-size-12);
  font-family: var(--font-family-mono);
}

.apf-stat-card__spark {
  display: block;
  width: 100%;
  height: 32px;
  margin-top: 8px;
}

.apf-stat-card__skel {
  background: linear-gradient(
    90deg,
    var(--bg-color-gray) 25%,
    var(--bg-color-gray-light) 50%,
    var(--bg-color-gray) 75%
  );
  background-size: 200% 100%;
  animation: apf-stat-skel 1.2s ease infinite;
  border-radius: var(--border-radius-sm);
}

.apf-stat-card__skel--label {
  height: 12px;
  width: 40%;
  margin-bottom: 8px;
}

.apf-stat-card__skel--value {
  height: 28px;
  width: 55%;
  margin-bottom: 8px;
}

.apf-stat-card__skel--spark {
  height: 32px;
  width: 100%;
}

@keyframes apf-stat-skel {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
