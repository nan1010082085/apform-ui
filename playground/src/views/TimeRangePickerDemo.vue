<script setup lang="ts">
import { ref } from 'vue'
import { TimeRangePicker, type TimeRange } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const timeRange = ref<TimeRange>({
  preset: '1h',
  start: new Date(Date.now() - 3600_000).toISOString(),
  end: new Date().toISOString(),
})
</script>

<template>
  <DemoBlock title="基础用法" description="快捷预设 + 自定义范围">
    <TimeRangePicker v-model="timeRange" size="small" />
    <pre style="margin-top: 12px; font-size: 12px">{{ timeRange }}</pre>
  </DemoBlock>
</template>
