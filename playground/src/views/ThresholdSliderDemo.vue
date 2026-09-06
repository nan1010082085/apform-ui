<script setup lang="ts">
import { ref } from 'vue'
import { ThresholdSlider } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const errorRate = ref(5)
const latency = ref(2000)
</script>

<template>
  <DemoBlock title="阈值滑块">
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 560px">
      <ThresholdSlider v-model="errorRate" type="errorRate" />
      <ThresholdSlider v-model="latency" type="latency" />
    </div>
  </DemoBlock>
</template>
