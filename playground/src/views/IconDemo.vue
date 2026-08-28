<script setup lang="ts">
import { AppIcon, APP_ICON_NAMES } from '@apform-ui/core'
</script>

<template>
  <div>
    <h2>AppIcon 图标</h2>
    <p>基于 Iconify 的统一图标组件，120+ 图标。</p>

    <div class="demo-section">
      <div class="demo-title">常用图标</div>
      <div class="demo-grid" style="grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));">
        <div v-for="name in APP_ICON_NAMES" :key="name" class="demo-card" style="padding: 12px;">
          <AppIcon :name="name" :size="24" />
          <div style="margin-top: 4px; font-size: 11px; color: #909399; word-break: break-all;">{{ name }}</div>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <div class="demo-title">不同尺寸</div>
      <div class="demo-block">
        <div class="demo-row">
          <AppIcon name="star" :size="16" />
          <AppIcon name="star" :size="24" />
          <AppIcon name="star" :size="32" />
          <AppIcon name="star" :size="48" />
        </div>
      </div>
    </div>

    <div class="demo-section">
      <div class="demo-title">自定义颜色</div>
      <div class="demo-block">
        <div class="demo-row">
          <AppIcon name="heart" :size="24" color="#E50113" />
          <AppIcon name="star" :size="24" color="#F09700" />
          <AppIcon name="circle-check" :size="24" color="#26A036" />
          <AppIcon name="info-filled" :size="24" color="#0060A2" />
        </div>
      </div>
    </div>
  </div>
</template>
