<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { playgroundRoutes } from './routes'

const route = useRoute()
const dark = ref(false)

const navGroups = computed(() => {
  const map = new Map<string, typeof playgroundRoutes>()
  for (const item of playgroundRoutes) {
    if (item.label.includes('(alias)')) continue
    const list = map.get(item.group) ?? []
    list.push(item)
    map.set(item.group, list)
  }
  return [...map.entries()]
})

function toggleTheme() {
  dark.value = !dark.value
  document.documentElement.dataset.theme = dark.value ? 'dark' : 'light'
}
</script>

<template>
  <div class="playground" :class="{ dark: dark }">
    <aside class="sidebar">
      <div class="logo">@apform-ui</div>
      <button type="button" class="theme-toggle" @click="toggleTheme">
        {{ dark ? '浅色' : '暗色' }}
      </button>
      <nav class="nav">
        <div v-for="[group, items] in navGroups" :key="group" class="nav-group">
          <div class="nav-group-title">{{ group }}</div>
          <router-link
            v-for="item in items"
            :key="item.path"
            :to="item.path"
            class="nav-item"
            :class="{ active: route.path === item.path }"
          >
            {{ item.label }}
          </router-link>
        </div>
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
  padding: 0 20px 12px;
  border-bottom: 1px solid #e4e7ed;
  margin-bottom: 8px;
}

.theme-toggle {
  display: block;
  margin: 0 12px 12px;
  width: calc(100% - 24px);
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #dcdfe6;
  background: #fff;
  cursor: pointer;
  font-size: 13px;
}

.playground.dark {
  background: #141414;
  color: #e5eaf3;
}

.playground.dark .sidebar {
  background: #1d1e1f;
  border-color: #414243;
}

.playground.dark .main {
  color: #e5eaf3;
}

.playground.dark .demo-section,
.playground.dark .demo-block {
  background: #1d1e1f;
  border-color: #414243;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 12px 24px;
}

.nav-group-title {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #909399;
  padding: 8px 8px 4px;
}

.nav-item {
  display: block;
  padding: 8px 12px;
  color: #606266;
  text-decoration: none;
  border-radius: 6px;
  font-size: 13px;
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
