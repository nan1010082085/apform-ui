<script setup lang="ts">
import { StatusTimeline, type TimelineSegment } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const now = Date.now()
const segments: TimelineSegment[] = [
  {
    start: new Date(now - 6 * 3600_000).toISOString(),
    end: new Date(now - 4 * 3600_000).toISOString(),
    status: 'healthy',
  },
  {
    start: new Date(now - 4 * 3600_000).toISOString(),
    end: new Date(now - 3.5 * 3600_000).toISOString(),
    status: 'warning',
  },
  {
    start: new Date(now - 3.5 * 3600_000).toISOString(),
    end: new Date(now - 3 * 3600_000).toISOString(),
    status: 'error',
  },
  {
    start: new Date(now - 3 * 3600_000).toISOString(),
    end: new Date(now).toISOString(),
    status: 'healthy',
  },
]
</script>

<template>
  <DemoBlock title="状态时间线">
    <StatusTimeline :segments="segments" :height="28" />
  </DemoBlock>
</template>
