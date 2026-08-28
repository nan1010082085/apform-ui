<script setup lang="ts">
import { StatusTag } from '@apform-ui/core'

const statuses = [
  'pending', 'approved', 'rejected', 'delegated',
  'active', 'inactive', 'draft', 'published', 'archived',
  'running', 'completed', 'failed', 'cancelled', 'waiting',
]
</script>

<template>
  <div>
    <h2>StatusTag 状态标签</h2>
    <p>预设 15 种状态的颜色映射。</p>

    <div class="demo-section">
      <div class="demo-title">所有预设状态</div>
      <div class="demo-block">
        <div class="demo-row">
          <StatusTag v-for="s in statuses" :key="s" :status="s" />
        </div>
      </div>
    </div>

    <div class="demo-section">
      <div class="demo-title">不同尺寸</div>
      <div class="demo-block">
        <div class="demo-row">
          <StatusTag status="approved" size="small" />
          <StatusTag status="approved" />
          <StatusTag status="approved" size="large" />
        </div>
      </div>
    </div>

    <div class="demo-section">
      <div class="demo-title">自定义状态</div>
      <div class="demo-block">
        <StatusTag
          status="custom"
          :status-map="{
            custom: { label: '自定义', type: 'primary', effect: 'dark' }
          }"
        />
      </div>
    </div>
  </div>
</template>
