<script setup lang="ts">
/**
 * MetricChart — 指标图表卡（ECharts optional peer）
 */
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'
import { ContentPanel } from '../ContentPanel'
import { EmptyState } from '../EmptyState'
import { CHART_COLORS, SHADOWS } from '../../tokens'
import {
  formatMetricValue,
  type MetricUnit,
} from '../../utils/metricFormat'
import {
  tryLoadEcharts,
  type EchartsInstance,
  type EchartsModule,
} from '../../utils/optionalPeers'

export type { MetricUnit }

/** 指标系列 */
export interface MetricSeries {
  name: string
  data: [number, number][]
  color?: string
  area?: boolean
}

/** 阈值参考线 */
export interface MetricThreshold {
  value: number
  label: string
  color?: string
}

const props = withDefaults(
  defineProps<{
    title: string
    unit: MetricUnit
    series: MetricSeries[]
    type?: 'line' | 'bar' | 'area'
    thresholds?: MetricThreshold[]
    variant?: 'full' | 'spark'
    height?: number
    loading?: boolean
    yAxisMin?: number
    yAxisMax?: number
  }>(),
  {
    type: 'line',
    variant: 'full',
    loading: false,
  },
)

const emit = defineEmits<{
  'chart-click': [params: unknown]
}>()

const chartEl = ref<HTMLElement | null>(null)
const echartsMissing = ref(false)
let chart: EchartsInstance | null = null
let echartsMod: EchartsModule | null = null
let resizeObserver: ResizeObserver | null = null
let clickHandler: ((params: unknown) => void) | null = null

const chartHeight = computed(
  () => props.height ?? (props.variant === 'spark' ? 32 : 280),
)

const hasData = computed(() => props.series.some((s) => s.data.length > 0))

/** 是否应渲染画布 DOM */
const showCanvas = computed(
  () => !props.loading && !echartsMissing.value && hasData.value,
)

/**
 * 构建 ECharts option
 */
function buildOption(): object {
  const isSpark = props.variant === 'spark'
  const chartType = props.type === 'area' ? 'line' : props.type
  const allTs = props.series.flatMap((s) => s.data.map((d) => d[0]))
  const span = allTs.length
    ? Math.max(...allTs) - Math.min(...allTs)
    : 0

  const seriesOpts = props.series.map((s, i) => {
    const color = s.color ?? CHART_COLORS.series[i % CHART_COLORS.series.length]
    const area = props.type === 'area' || s.area
    return {
      name: s.name,
      type: chartType,
      data: s.data,
      symbol: isSpark ? 'none' : 'circle',
      symbolSize: 4,
      showSymbol: !isSpark,
      smooth: true,
      itemStyle: { color },
      lineStyle: { color, width: isSpark ? 1.5 : 2 },
      areaStyle: area ? { color, opacity: 0.15 } : undefined,
      barMaxWidth: 24,
      markLine: undefined as object | undefined,
    }
  })

  const markLines = (props.thresholds ?? []).map((t) => ({
    name: t.label,
    yAxis: t.value,
    lineStyle: {
      color: t.color ?? CHART_COLORS.danger,
      type: 'dashed',
    },
    label: {
      formatter: t.label,
      color: t.color ?? CHART_COLORS.danger,
    },
  }))

  if (seriesOpts[0]) {
    seriesOpts[0].markLine = markLines.length
      ? { symbol: 'none', data: markLines }
      : undefined
  }

  return {
    animation: !isSpark,
    grid: isSpark
      ? { left: 0, right: 0, top: 2, bottom: 2 }
      : { left: 48, right: 16, top: 24, bottom: 28 },
    tooltip: isSpark
      ? { show: false }
      : {
          trigger: 'axis',
          backgroundColor: CHART_COLORS.tooltipBg,
          borderColor: CHART_COLORS.splitLine,
          textStyle: {
            color: CHART_COLORS.tooltipText,
            fontSize: 12,
            fontFamily: 'Consolas, Monaco, monospace',
          },
          extraCssText: `box-shadow: ${SHADOWS.md};`,
          valueFormatter: (v: number) => formatMetricValue(Number(v), props.unit),
        },
    legend: isSpark || props.series.length < 2
      ? { show: false }
      : { top: 0, right: 0, textStyle: { fontSize: 12 } },
    xAxis: isSpark
      ? { type: 'time', show: false }
      : {
          type: 'time',
          axisLine: { lineStyle: { color: CHART_COLORS.axisLine } },
          axisLabel: {
            color: CHART_COLORS.tooltipText,
            fontSize: 11,
            formatter: (value: number) => {
              const d = new Date(value)
              const pad = (n: number) => String(n).padStart(2, '0')
              if (span > 24 * 60 * 60 * 1000) {
                return `${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
              }
              return `${pad(d.getHours())}:${pad(d.getMinutes())}`
            },
          },
          splitLine: { show: false },
        },
    yAxis: isSpark
      ? { type: 'value', show: false, min: props.yAxisMin, max: props.yAxisMax }
      : {
          type: 'value',
          min: props.yAxisMin,
          max: props.yAxisMax,
          axisLine: { show: false },
          axisLabel: {
            color: CHART_COLORS.tooltipText,
            fontSize: 11,
            formatter: (v: number) => formatMetricValue(v, props.unit),
          },
          splitLine: {
            lineStyle: { color: CHART_COLORS.splitLine, type: 'dashed' },
          },
        },
    series: seriesOpts,
  }
}

/**
 * 销毁图表与 ResizeObserver
 */
function teardownChart() {
  resizeObserver?.disconnect()
  resizeObserver = null
  if (chart && clickHandler) {
    chart.off('click', clickHandler)
  }
  clickHandler = null
  chart?.dispose()
  chart = null
}

/**
 * 初始化或重建图表（依赖 chartEl 已在 DOM）
 */
async function setupChart() {
  if (!showCanvas.value) {
    teardownChart()
    return
  }
  if (!echartsMod) {
    echartsMod = await tryLoadEcharts()
    if (!echartsMod) {
      echartsMissing.value = true
      return
    }
  }
  echartsMissing.value = false
  await nextTick()
  if (!chartEl.value || !showCanvas.value) return

  teardownChart()
  chart = echartsMod.init(chartEl.value)
  clickHandler = (params: unknown) => emit('chart-click', params)
  chart.on('click', clickHandler)
  chart.setOption(buildOption(), { notMerge: true })
  resizeObserver = new ResizeObserver(() => chart?.resize())
  resizeObserver.observe(chartEl.value)
}

/**
 * 合并更新（series 用 replaceMerge 避免残留）
 */
function refresh() {
  if (!chart || echartsMissing.value || !showCanvas.value) return
  chart.setOption(buildOption(), {
    notMerge: false,
    replaceMerge: ['series'],
  })
}

/**
 * 根据 loading / 数据态同步图表
 */
async function syncChart() {
  if (!showCanvas.value) {
    teardownChart()
    return
  }
  if (!chart) {
    await setupChart()
    return
  }
  refresh()
}

watch(
  () => [
    props.loading,
    props.series,
    props.type,
    props.thresholds,
    props.unit,
    props.variant,
    props.yAxisMin,
    props.yAxisMax,
    hasData.value,
  ],
  () => {
    void syncChart()
  },
  { deep: true },
)

onMounted(() => {
  void syncChart()
})

onUnmounted(() => {
  teardownChart()
})
</script>

<template>
  <ContentPanel
    v-if="variant === 'full'"
    :title="title"
    class="apf-metric-chart"
  >
    <template v-if="$slots['header-actions']" #extra>
      <slot name="header-actions" />
    </template>
    <div
      v-if="loading"
      class="apf-metric-chart__loading"
      :style="{ height: `${chartHeight}px` }"
    >
      加载中…
    </div>
    <EmptyState
      v-else-if="echartsMissing"
      title="需要安装 echarts"
      description="pnpm add echarts"
    />
    <div v-else-if="!hasData" :style="{ height: `${chartHeight}px` }">
      <slot name="empty">
        <EmptyState title="暂无数据" />
      </slot>
    </div>
    <div
      v-else
      ref="chartEl"
      class="apf-metric-chart__canvas"
      :style="{ height: `${chartHeight}px` }"
    />
  </ContentPanel>

  <div
    v-else
    class="apf-metric-chart apf-metric-chart--spark"
  >
    <div
      v-if="loading"
      class="apf-metric-chart__loading"
      :style="{ height: `${chartHeight}px` }"
    >
      …
    </div>
    <EmptyState
      v-else-if="echartsMissing"
      title="需要 echarts"
      description=""
    />
    <div
      v-else-if="!hasData"
      class="apf-metric-chart__spark-empty"
      :style="{ height: `${chartHeight}px` }"
    />
    <div
      v-else
      ref="chartEl"
      class="apf-metric-chart__canvas"
      :style="{ height: `${chartHeight}px` }"
    />
  </div>
</template>

<style scoped>
.apf-metric-chart__loading {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color-muted);
  font-size: var(--font-size-13);
}

.apf-metric-chart__canvas {
  width: 100%;
}

.apf-metric-chart--spark {
  width: 100%;
}

.apf-metric-chart__spark-empty {
  width: 100%;
  background: var(--bg-color-gray-light);
  border-radius: var(--border-radius-sm);
}
</style>
