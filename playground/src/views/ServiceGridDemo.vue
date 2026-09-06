<script setup lang="ts">
import { ServiceGrid, type ServiceItem } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const services: ServiceItem[] = [
  {
    id: 1,
    name: 'api-gateway',
    status: 'healthy',
    metrics: {
      errorRate: 0.2,
      latencyP95: 120,
      eventCount: 12890,
      lastSeen: new Date().toISOString(),
    },
  },
  {
    id: 2,
    name: 'billing-svc',
    status: 'warning',
    metrics: {
      errorRate: 4.5,
      latencyP95: 890,
      eventCount: 320,
      lastSeen: new Date(Date.now() - 2 * 60_000).toISOString(),
    },
  },
  {
    id: 3,
    name: 'auth-svc',
    status: 'error',
    metrics: {
      errorRate: 18.2,
      latencyP95: 2400,
      eventCount: 88,
      lastSeen: new Date(Date.now() - 8 * 60_000).toISOString(),
    },
  },
]
</script>

<template>
  <DemoBlock title="服务矩阵">
    <ServiceGrid :services="services" @service-click="(s) => console.log(s)" />
  </DemoBlock>
</template>
