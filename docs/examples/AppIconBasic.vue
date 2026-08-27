<script setup>
import { AppIcon } from '@apform-ui/core'
</script>

<template>
  <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
      <AppIcon name="home-filled" :size="24" />
      <span style="font-size: 12px; color: #999;">home-filled</span>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
      <AppIcon name="setting" :size="24" />
      <span style="font-size: 12px; color: #999;">setting</span>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
      <AppIcon name="user" :size="24" color="var(--color-primary)" />
      <span style="font-size: 12px; color: #999;">user</span>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
      <AppIcon name="search" :size="24" />
      <span style="font-size: 12px; color: #999;">search</span>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
      <AppIcon name="bell" :size="24" />
      <span style="font-size: 12px; color: #999;">bell</span>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
      <AppIcon name="loading" :size="24" color="var(--color-primary)" />
      <span style="font-size: 12px; color: #999;">loading</span>
    </div>
  </div>
</template>
