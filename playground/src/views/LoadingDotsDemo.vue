<script setup lang="ts">
/**
 * LoadingDots — 加载动画 Demo
 */
import { LoadingDots } from '@apform-ui/core'
</script>

<template>
  <div>
    <h2>LoadingDots 加载点</h2>
    <p>三点跳动加载指示，常用于对话等待态。</p>

    <div class="demo-section">
      <div class="demo-title">默认尺寸</div>
      <div class="demo-block">
        <span style="font-size: 14px; color: var(--text-color-regular)">正在思考</span>
        <LoadingDots />
      </div>
    </div>

    <div class="demo-section">
      <div class="demo-title">较大圆点</div>
      <div class="demo-block">
        <LoadingDots :size="10" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-block {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm, 8px);
}
</style>
