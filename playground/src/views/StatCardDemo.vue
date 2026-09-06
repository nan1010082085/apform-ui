<script setup lang="ts">
import { StatCard } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const spark = [12, 18, 9, 22, 15, 28, 20, 16, 24, 19]
</script>

<template>
  <DemoBlock title="统计卡片">
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px">
      <StatCard
        label="错误事件"
        :value="1234"
        :trend="{ direction: 'down', percent: 12, positiveIsGood: true }"
        :sparkline="spark"
        status="warning"
      />
      <StatCard label="请求量" value="98.2k" unit="/min" status="healthy" :sparkline="spark" />
      <StatCard label="加载中" :value="0" loading />
    </div>
  </DemoBlock>
</template>
