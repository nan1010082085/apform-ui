<script setup lang="ts">
/**
 * ChartOptionPreview — 任意 ECharts option 预览（optional peer）
 */
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { EmptyState } from '../EmptyState'
import {
  tryLoadEcharts,
  type EchartsInstance,
  type EchartsModule,
} from '../../utils/optionalPeers'

const props = withDefaults(
  defineProps<{
    option: Record<string, unknown>
    chartType?: string
    height?: number
  }>(),
  { height: 280 },
)

const chartEl = ref<HTMLElement | null>(null)
const missing = ref(false)
const errorMsg = ref('')

let chart: EchartsInstance | null = null
let echartsMod: EchartsModule | null = null
let resizeObserver: ResizeObserver | null = null

/**
 * 初始化 / 刷新图表
 */
async function renderChart() {
  errorMsg.value = ''
  if (!chartEl.value) return

  try {
    if (!echartsMod) {
      echartsMod = await tryLoadEcharts()
    }
    if (!echartsMod) {
      missing.value = true
      return
    }
    missing.value = false
    if (!chart) {
      chart = echartsMod.init(chartEl.value)
      resizeObserver = new ResizeObserver(() => chart?.resize())
      resizeObserver.observe(chartEl.value)
    }
    chart.setOption(props.option, { notMerge: true })
  } catch (err) {
    missing.value = true
    errorMsg.value = err instanceof Error ? err.message : String(err)
  }
}

onMounted(async () => {
  await nextTick()
  await renderChart()
})

watch(
  () => props.option,
  async () => {
    await nextTick()
    await renderChart()
  },
  { deep: true },
)

onUnmounted(() => {
  resizeObserver?.disconnect()
  resizeObserver = null
  chart?.dispose()
  chart = null
})
</script>

<template>
  <div class="apf-chart-option-preview">
    <div v-if="chartType" class="apf-chart-option-preview__meta">类型：{{ chartType }}</div>
    <div
      v-show="!missing"
      ref="chartEl"
      class="apf-chart-option-preview__canvas"
      :style="{ height: `${height}px` }"
    />
    <EmptyState
      v-if="missing"
      title="未加载 ECharts"
      :description="errorMsg || '请在宿主安装 peer 依赖 echarts'"
    />
  </div>
</template>

<style scoped>
.apf-chart-option-preview {
  width: 100%;
}

.apf-chart-option-preview__meta {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  margin-bottom: 8px;
}

.apf-chart-option-preview__canvas {
  width: 100%;
  min-height: 120px;
}
</style>
