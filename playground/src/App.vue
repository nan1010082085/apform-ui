<script setup lang="ts">
/**
 * 文档站壳层 — 对齐 Element Plus / Arco：顶栏 + 浅色左导航 + 主内容
 * 禁止：Storybook、VitePress、配方页、暗色展台营销首页、在线 Playground、多语言切换
 */
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { playgroundRoutes } from './routes'

const route = useRoute()
const router = useRouter()
const dark = ref(false)
const navQuery = ref('')

const navGroups = computed(() => {
  const q = navQuery.value.trim().toLowerCase()
  const map = new Map<string, typeof playgroundRoutes>()
  for (const item of playgroundRoutes) {
    if (item.path === '/') continue
    if (q && !item.label.toLowerCase().includes(q) && !item.group.toLowerCase().includes(q)) {
      continue
    }
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

function onSearchEnter() {
  const q = navQuery.value.trim().toLowerCase()
  if (!q) return
  const hit = playgroundRoutes.find(
    (r) => r.path !== '/' && r.label.toLowerCase().includes(q),
  )
  if (hit) router.push(hit.path)
}
</script>

<template>
  <div class="docs" :class="{ dark }">
    <header class="topbar">
      <router-link to="/" class="logo">
        <img src="./assets/logo.svg" alt="APForm" class="logo-icon" />
        <span class="logo-text">APForm</span>
        <span class="logo-version">v1.0</span>
      </router-link>

      <div class="top-center">
        <label class="top-search">
          <svg class="search-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
          <input
            v-model="navQuery"
            type="search"
            placeholder="搜索组件…"
            @keydown.enter.prevent="onSearchEnter"
          />
          <kbd class="search-kbd">⌘K</kbd>
        </label>
      </div>

      <div class="top-actions">
        <a href="https://github.com/apform/apform-ui" target="_blank" class="icon-btn" title="GitHub">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd" />
          </svg>
        </a>
        <button type="button" class="icon-btn" @click="toggleTheme" :title="dark ? '切换浅色' : '切换暗色'">
          <svg v-if="dark" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
          </svg>
          <svg v-else viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </button>
      </div>
    </header>

    <div class="body">
      <aside class="sidebar">
        <nav class="side-nav">
          <router-link
            to="/"
            class="side-link"
            :class="{ active: route.path === '/' }"
          >
            Overview 组件总览
          </router-link>

          <div v-for="[group, items] in navGroups" :key="group" class="side-group">
            <div class="side-group-title">{{ group }}</div>
            <router-link
              v-for="item in items"
              :key="item.path"
              :to="item.path"
              class="side-link"
              :class="{ active: route.path === item.path }"
            >
              {{ item.label }}
            </router-link>
          </div>
        </nav>
      </aside>

      <main class="main">
        <router-view :key="route.path" />
      </main>
    </div>
  </div>
</template>

<style>
:root {
  --docs-bg: #ffffff;
  --docs-bg-soft: #f5f7fa;
  --docs-border: #e4e7ed;
  --docs-text: #303133;
  --docs-muted: #909399;
  --docs-regular: #606266;
  --docs-primary: #0060a2;
  --docs-primary-soft: #ecf5ff;
  --docs-sidebar: 240px;
  --docs-font: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  --docs-mono: 'JetBrains Mono', Consolas, Monaco, monospace;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  min-height: 100%;
}

body {
  font-family: var(--docs-font);
  color: var(--docs-text);
  background: var(--docs-bg);
  -webkit-font-smoothing: antialiased;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}

.docs {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 30;
  height: 56px;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 0 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--docs-text);
  flex-shrink: 0;
}

.logo-icon {
  width: 28px;
  height: 28px;
}

.logo-text {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-version {
  font-size: 11px;
  color: var(--docs-muted);
  padding: 2px 6px;
  background: var(--docs-bg-soft);
  border-radius: 4px;
  font-weight: 500;
}

.top-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.top-search {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--docs-muted);
  pointer-events: none;
}

.top-search input {
  width: 100%;
  height: 36px;
  padding: 0 60px 0 36px;
  border: 1px solid var(--docs-border);
  border-radius: 10px;
  background: var(--docs-bg-soft);
  font-size: 13px;
  font-family: var(--docs-font);
  outline: none;
  transition: all 0.2s ease;
}

.top-search input:focus {
  border-color: #6366f1;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.search-kbd {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  padding: 2px 6px;
  font-size: 11px;
  font-family: var(--docs-mono);
  color: var(--docs-muted);
  background: var(--docs-bg);
  border: 1px solid var(--docs-border);
  border-radius: 4px;
  pointer-events: none;
}

.top-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.icon-btn {
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--docs-regular);
  cursor: pointer;
  transition: all 0.15s ease;
  text-decoration: none;
}

.icon-btn svg {
  width: 18px;
  height: 18px;
}

.icon-btn:hover {
  background: var(--docs-bg-soft);
  color: var(--docs-text);
}

.body {
  display: flex;
  flex: 1;
  min-height: 0;
}

.sidebar {
  position: sticky;
  top: 56px;
  align-self: flex-start;
  width: var(--docs-sidebar);
  height: calc(100vh - 56px);
  overflow-y: auto;
  border-right: 1px solid var(--docs-border);
  background: #fff;
  flex-shrink: 0;
}

.side-nav {
  padding: 12px 12px 32px;
}

.side-group {
  margin-top: 12px;
}

.side-group-title {
  padding: 8px 12px 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--docs-muted);
}

.side-link {
  display: block;
  padding: 7px 12px;
  border-radius: 6px;
  color: var(--docs-regular);
  text-decoration: none;
  font-size: 13px;
  line-height: 1.4;
  transition: background 0.15s, color 0.15s;
}

.side-link:hover {
  color: var(--docs-primary);
  background: var(--docs-primary-soft);
}

.side-link.active {
  color: var(--docs-primary);
  background: var(--docs-primary-soft);
  font-weight: 600;
}

.main {
  flex: 1;
  min-width: 0;
  padding: 32px 40px 72px;
  background: #fff;
}

.docs.dark {
  color: #e5eaf3;
  background: #141414;
}

.docs.dark .topbar,
.docs.dark .sidebar,
.docs.dark .main {
  background: #1d1e1f;
  border-color: #363637;
}

.docs.dark .topbar {
  background: rgba(29, 30, 31, 0.72);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
}

.docs.dark .logo-text {
  background: linear-gradient(135deg, #818cf8 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.docs.dark .logo-version {
  background: #2d2d2d;
  border-color: #404040;
}

.docs.dark .side-link {
  color: #cfd3dc;
}

.docs.dark .side-link:hover,
.docs.dark .side-link.active {
  color: #818cf8;
  background: rgba(99, 102, 241, 0.12);
}

.docs.dark .top-search input {
  background: #2d2d2d;
  border-color: #404040;
  color: #cfd3dc;
}

.docs.dark .top-search input:focus {
  border-color: #818cf8;
  box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.1);
}

.docs.dark .search-kbd {
  background: #1d1e1f;
  border-color: #404040;
}

.docs.dark .icon-btn {
  color: #9ca3af;
}

.docs.dark .icon-btn:hover {
  background: #2d2d2d;
  color: #e5e7eb;
}

@media (max-width: 960px) {
  .body {
    flex-direction: column;
  }

  .sidebar {
    position: relative;
    top: 0;
    width: 100%;
    height: auto;
    max-height: 40vh;
    border-right: none;
    border-bottom: 1px solid var(--docs-border);
  }

  .main {
    padding: 20px 16px 48px;
  }
}
</style>
