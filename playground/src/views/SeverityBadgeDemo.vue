<script setup lang="ts">
import { SeverityBadge } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'
</script>

<template>
  <DemoBlock title="严重级别" description="critical 默认脉冲">
    <div style="display: flex; gap: 12px; flex-wrap: wrap">
      <SeverityBadge severity="critical" />
      <SeverityBadge severity="warning" />
      <SeverityBadge severity="info" />
      <SeverityBadge severity="critical" :pulse="false" />
      <SeverityBadge severity="warning" size="large" />
    </div>
  </DemoBlock>
</template>
