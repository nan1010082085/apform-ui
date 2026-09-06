<script setup lang="ts">
import { computed } from 'vue'
import { MetricChart, type MetricSeries } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const now = Date.now()
const series = computed<MetricSeries[]>(() => [
  {
    name: '错误率',
    data: Array.from({ length: 24 }, (_, i) => [
      now - (23 - i) * 5 * 60_000,
      Math.random() * 8,
    ]),
    area: true,
  },
])
</script>

<template>
  <DemoBlock title="指标图表" description="需要 peer echarts">
    <MetricChart
      title="错误率"
      unit="percent"
      :series="series"
      type="area"
      :thresholds="[{ value: 5, label: '告警阈值' }]"
    />
  </DemoBlock>
</template>
