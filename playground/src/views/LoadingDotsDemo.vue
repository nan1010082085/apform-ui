<script setup lang="ts">
/**
 * LoadingDots 加载动画文档示例
 */
import { LoadingDots } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const defaultSource = `<template>
  <span>正在思考</span>
  <LoadingDots />
</template>`

const largeSource = `<template>
  <LoadingDots :size="10" />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="默认尺寸"
      description="三点跳动加载指示，常用于对话等待态。"
      :source="defaultSource"
    >
      <div class="row">
        <span class="label">正在思考</span>
        <LoadingDots />
      </div>
    </DemoBlock>

    <DemoBlock
      title="较大圆点"
      description="size 控制圆点直径。"
      :source="largeSource"
    >
      <LoadingDots :size="10" />
    </DemoBlock>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.label {
  font-size: 14px;
  color: #606266;
}
</style>
