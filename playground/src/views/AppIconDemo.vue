<template>
  <div class="demo-section">
    <h2>AppIcon 图标</h2>
    <p>统一图标组件，基于 Iconify 实现。</p>
    
    <div class="demo-block">
      <h3>基础用法</h3>
      <div class="icon-grid">
        <AppIcon name="ep:home" />
        <AppIcon name="ep:search" />
        <AppIcon name="ep:setting" />
        <AppIcon name="ep:user" />
        <AppIcon name="ep:bell" />
        <AppIcon name="ep:star" />
      </div>
    </div>
    
    <div class="demo-block">
      <h3>不同尺寸</h3>
      <div class="icon-sizes">
        <AppIcon name="ep:home" size="12" />
        <AppIcon name="ep:home" size="16" />
        <AppIcon name="ep:home" size="20" />
        <AppIcon name="ep:home" size="24" />
        <AppIcon name="ep:home" size="32" />
      </div>
    </div>
    
    <div class="demo-block">
      <h3>不同颜色</h3>
      <div class="icon-colors">
        <AppIcon name="ep:home" color="#409eff" />
        <AppIcon name="ep:home" color="#67c23a" />
        <AppIcon name="ep:home" color="#e6a23c" />
        <AppIcon name="ep:home" color="#f56c6c" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { AppIcon } from '@apform-ui/core'
</script>

<style scoped>
.demo-section {
  padding: 20px;
}

.demo-block {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.demo-block h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 16px;
  color: #303133;
}

.icon-grid {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.icon-sizes {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon-colors {
  display: flex;
  gap: 20px;
}
</style>
