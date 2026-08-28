<script setup lang="ts">
import { AppIcon, StatusTag, UserAvatar, EmptyState } from '@apform-ui/core'
</script>

<template>
  <div>
    <h2>@apform-ui 组件库</h2>
    <p>点击左侧导航查看各组件的交互演示。</p>

    <div class="demo-section" style="margin-top: 24px;">
      <div class="demo-title">组件一览</div>
      <div class="demo-grid">
        <div class="demo-card">
          <AppIcon name="setting" :size="32" color="#0060A2" />
          <div style="margin-top: 8px; font-weight: 600;">AppIcon</div>
        </div>
        <div class="demo-card">
          <StatusTag status="approved" />
          <div style="margin-top: 8px; font-weight: 600;">StatusTag</div>
        </div>
        <div class="demo-card">
          <UserAvatar name="张三" :size="40" />
          <div style="margin-top: 8px; font-weight: 600;">UserAvatar</div>
        </div>
        <div class="demo-card">
          <AppIcon name="bell" :size="32" color="#F09700" />
          <div style="margin-top: 8px; font-weight: 600;">Toast</div>
        </div>
      </div>
    </div>
  </div>
</template>
