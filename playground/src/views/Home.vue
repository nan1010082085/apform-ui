<script setup lang="ts">
/**
 * Overview — 组件总览（克制列表，非营销页）
 */
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { SCHEMA_UI_VERSION } from '@apform-ui/core'
import { playgroundRoutes } from '../routes'

const router = useRouter()

const groups = computed(() => {
  const map = new Map<string, typeof playgroundRoutes>()
  for (const item of playgroundRoutes) {
    if (item.path === '/') continue
    const list = map.get(item.group) ?? []
    list.push(item)
    map.set(item.group, list)
  }
  return [...map.entries()]
})

const total = computed(
  () => playgroundRoutes.filter((r) => r.path !== '/').length,
)

/**
 * @param path 组件文档路径
 */
function go(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="overview">
    <header class="hero">
      <h1>Overview 组件总览</h1>
      <p class="lead">
        @apform-ui {{ SCHEMA_UI_VERSION }} · {{ total }} 个组件与 Composable。文档对齐 Element Plus /
        Arco：实时预览、源码、Attributes / Events / Slots。
      </p>
    </header>

    <section v-for="[group, items] in groups" :key="group" class="group">
      <div class="group-head">
        <h2>{{ group }}</h2>
        <span class="count">{{ items.length }}</span>
      </div>
      <div class="grid">
        <button
          v-for="item in items"
          :key="item.path"
          type="button"
          class="card"
          @click="go(item.path)"
        >
          <span class="name">{{ item.label }}</span>
          <span class="path">{{ item.path }}</span>
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.overview {
  max-width: 920px;
}

.hero {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--docs-border, #e4e7ed);
}

h1 {
  margin: 0 0 10px;
  font-size: 30px;
  font-weight: 650;
  letter-spacing: -0.02em;
}

.lead {
  margin: 0;
  font-size: 14px;
  line-height: 1.75;
  color: var(--docs-regular, #606266);
  max-width: 640px;
}

.group {
  margin-bottom: 28px;
}

.group-head {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 12px;
}

.group h2 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--docs-text, #303133);
}

.count {
  font-size: 12px;
  color: var(--docs-muted, #909399);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(168px, 1fr));
  gap: 10px;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding: 12px 14px;
  border: 1px solid var(--docs-border, #e4e7ed);
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  text-align: left;
  font-family: var(--docs-font, inherit);
  transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
}

.card:hover {
  border-color: #b3d8ff;
  background: var(--docs-primary-soft, #ecf5ff);
  box-shadow: 0 1px 4px rgba(0, 96, 162, 0.08);
}

.name {
  font-size: 13px;
  font-weight: 600;
  color: var(--docs-text, #303133);
}

.path {
  font-size: 11px;
  color: var(--docs-muted, #909399);
  font-family: var(--docs-mono, monospace);
}

.card:hover .name {
  color: var(--docs-primary, #0060a2);
}
</style>
