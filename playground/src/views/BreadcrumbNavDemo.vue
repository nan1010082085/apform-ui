<template>
  <div class="demo-section">
    <h2>BreadcrumbNav</h2>
    <p>props 驱动面包屑，通过 <code>@navigate</code> 处理跳转（不绑定 vue-router）。</p>
    <BreadcrumbNav :items="items" @navigate="onNavigate" />
    <p v-if="lastNav" class="hint">最近导航: {{ lastNav }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BreadcrumbNav, type BreadcrumbNavItem } from '@apform-ui/core'

const items: BreadcrumbNavItem[] = [
  { label: '首页', to: '/' },
  { label: '项目管理', to: '/projects' },
  { label: '详情' },
]

const lastNav = ref('')
function onNavigate(to: string) {
  lastNav.value = to
}
</script>

<style scoped>
.demo-section { padding: 8px; }
.hint { margin-top: 12px; color: #606266; font-size: 13px; }
</style>
