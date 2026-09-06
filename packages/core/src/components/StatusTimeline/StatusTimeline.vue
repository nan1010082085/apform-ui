<script setup lang="ts">
/**
 * StatusTimeline — 服务状态时间线（横向色块条）
 */
import { computed } from 'vue'
import { formatDuration } from '../../utils/metricFormat'

/** 时间线段 */
export interface TimelineSegment {
  start: string
  end: string
  status: 'healthy' | 'warning' | 'error' | 'unknown'
}

const STATUS_LABEL: Record<TimelineSegment['status'], string> = {
  healthy: '健康',
  warning: '告警',
  error: '故障',
  unknown: '未知',
}

const props = withDefaults(
  defineProps<{
    /** 状态段 */
    segments: TimelineSegment[]
    /** 对齐范围 */
    range?: { start: string; end: string }
    /** 高度 */
    height?: number
    /** hover 提示 */
    showTooltip?: boolean
  }>(),
  {
    height: 24,
    showTooltip: true,
  },
)

const resolvedRange = computed(() => {
  if (props.range) return props.range
  if (!props.segments.length) {
    const now = new Date().toISOString()
    return { start: now, end: now }
  }
  return {
    start: props.segments[0].start,
    end: props.segments[props.segments.length - 1].end,
  }
})

const rangeMs = computed(() => {
  const start = Date.parse(resolvedRange.value.start)
  const end = Date.parse(resolvedRange.value.end)
  return Math.max(end - start, 1)
})

const blocks = computed(() => {
  const startMs = Date.parse(resolvedRange.value.start)
  return props.segments.map((seg) => {
    const s = Date.parse(seg.start)
    const e = Date.parse(seg.end)
    const left = ((s - startMs) / rangeMs.value) * 100
    const width = ((e - s) / rangeMs.value) * 100
    return {
      ...seg,
      left: Math.max(0, left),
      width: Math.max(0.2, width),
      durationMs: Math.max(0, e - s),
    }
  })
})

/**
 * 刻度文案
 */
function tickLabel(iso: string): string {
  const d = new Date(iso)
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const mi = String(d.getMinutes()).padStart(2, '0')
  return `${mm}-${dd} ${hh}:${mi}`
}

/**
 * Tooltip 内容
 */
function tip(seg: (typeof blocks.value)[number]): string {
  return `${STATUS_LABEL[seg.status]} · ${tickLabel(seg.start)} ~ ${tickLabel(seg.end)} · ${formatDuration(seg.durationMs)}`
}
</script>

<template>
  <div class="apf-status-timeline">
    <div class="apf-status-timeline__track" :style="{ height: `${height}px` }">
      <el-tooltip
        v-for="(seg, i) in blocks"
        :key="`${seg.start}-${i}`"
        :disabled="!showTooltip"
        :content="tip(seg)"
        placement="top"
      >
        <div
          class="apf-status-timeline__seg"
          :class="`apf-status-timeline__seg--${seg.status}`"
          :style="{ left: `${seg.left}%`, width: `${seg.width}%` }"
        />
      </el-tooltip>
    </div>
    <div class="apf-status-timeline__ticks">
      <span>{{ tickLabel(resolvedRange.start) }}</span>
      <span>{{ tickLabel(resolvedRange.end) }}</span>
    </div>
  </div>
</template>

<style scoped>
.apf-status-timeline {
  width: 100%;
}

.apf-status-timeline__track {
  position: relative;
  width: 100%;
  background: var(--bg-color-gray);
  border-radius: var(--border-radius-sm);
  overflow: hidden;
}

.apf-status-timeline__seg {
  position: absolute;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
  border-right: 1px solid var(--bg-color-white);
  cursor: default;
}

.apf-status-timeline__seg--healthy {
  background: color-mix(in srgb, var(--color-success) 70%, transparent);
}

.apf-status-timeline__seg--warning {
  background: var(--color-warning);
}

.apf-status-timeline__seg--error {
  background: var(--color-danger);
}

.apf-status-timeline__seg--unknown {
  background: var(--bg-color-gray-dark);
}

.apf-status-timeline__ticks {
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  font-size: var(--font-size-10);
  color: var(--text-color-muted);
}
</style>
