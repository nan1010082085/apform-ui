<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { path: '/', label: '首页' },
  { path: '/dialog', label: 'AppDialog' },
  { path: '/icon', label: 'AppIcon' },
  { path: '/pagination', label: 'AppPagination' },
  { path: '/status-tag', label: 'StatusTag' },
  { path: '/skeleton', label: 'Skeleton' },
  { path: '/empty', label: 'EmptyState' },
  { path: '/avatar', label: 'UserAvatar' },
  { path: '/filter-tabs', label: 'FilterTabs' },
  { path: '/toast', label: 'Toast' },
  { path: '/confirm', label: 'useConfirm' },
  { path: '/message', label: 'useMessage' },
  { path: '/error-boundary', label: 'ErrorBoundary' },
  { path: '/debounce', label: 'useDebounceFn' },
]
</script>

<template>
  <div class="playground">
    <aside class="sidebar">
      <div class="logo">@apform-ui</div>
      <nav class="nav">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :class="{ active: route.path === item.path }"
        >
          {{ item.label }}
        </router-link>
      </nav>
    </aside>
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f5f7fa;
  color: #303133;
}

.playground {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 240px;
  background: #fff;
  border-right: 1px solid #e4e7ed;
  padding: 20px 0;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-y: auto;
}

.logo {
  font-size: 20px;
  font-weight: 700;
  color: #0060A2;
  padding: 0 20px 20px;
  border-bottom: 1px solid #e4e7ed;
  margin-bottom: 12px;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 12px;
}

.nav-item {
  display: block;
  padding: 10px 16px;
  color: #606266;
  text-decoration: none;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s;
}

.nav-item:hover {
  background: #f0f5ff;
  color: #0060A2;
}

.nav-item.active {
  background: #0060A2;
  color: #fff;
}

.main {
  flex: 1;
  margin-left: 240px;
  padding: 32px;
  max-width: 960px;
}

.demo-section {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid #e4e7ed;
}

.demo-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #303133;
}

.demo-desc {
  font-size: 14px;
  color: #909399;
  margin-bottom: 20px;
}

.demo-block {
  padding: 24px;
  background: #fafafa;
  border-radius: 6px;
  border: 1px solid #ebeef5;
}

.demo-row {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.demo-card {
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
}

p {
  color: #606266;
  line-height: 1.6;
}
</style>
