<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { AppIcon, StatusTag, UserAvatar, SCHEMA_UI_VERSION } from '@apform-ui/core'
import { playgroundRoutes } from '../routes'

const router = useRouter()
const query = ref('')

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return []
  return playgroundRoutes.filter(
    (r) => r.path !== '/' && !r.label.includes('(alias)') && r.label.toLowerCase().includes(q),
  )
})

function go(path: string) {
  router.push(path)
}
</script>

<template>
  <div>
    <h2>@apform-ui 组件库</h2>
    <p>版本 {{ SCHEMA_UI_VERSION }} · 点击左侧导航或下方搜索进入 Demo。</p>

    <div class="search-box">
      <input v-model="query" type="search" placeholder="搜索组件名称…" aria-label="搜索组件" />
      <ul v-if="filtered.length" class="search-results">
        <li v-for="item in filtered" :key="item.path">
          <button type="button" @click="go(item.path)">{{ item.label }}</button>
          <span class="group">{{ item.group }}</span>
        </li>
      </ul>
    </div>

    <div class="demo-section" style="margin-top: 24px;">
      <div class="demo-title">推荐入口</div>
      <div class="demo-row">
        <button type="button" class="recipe-btn" @click="go('/list-recipe')">列表页配方</button>
        <button type="button" class="recipe-btn" @click="go('/chat-recipe')">对话配方</button>
      </div>
    </div>

    <div class="demo-section">
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
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-box { margin-top: 16px; max-width: 420px; }
.search-box input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  font-size: 14px;
}
.search-results {
  list-style: none;
  margin: 8px 0 0;
  padding: 0;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  overflow: hidden;
}
.search-results li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ebeef5;
}
.search-results li:last-child { border-bottom: none; }
.search-results button {
  flex: 1;
  text-align: left;
  padding: 10px 12px;
  border: none;
  background: #fff;
  cursor: pointer;
}
.search-results button:hover { background: #f0f5ff; }
.group { padding: 0 12px; font-size: 12px; color: #909399; }
.recipe-btn {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #0060A2;
  background: #fff;
  color: #0060A2;
  cursor: pointer;
}
.recipe-btn:hover { background: #f0f5ff; }
</style>
