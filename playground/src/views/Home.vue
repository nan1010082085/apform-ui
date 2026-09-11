<script setup lang="ts">
/**
 * Overview — 组件总览：分层导航 + 分类锚点，避免整页平铺卡片
 */
import { computed, nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import { SCHEMA_UI_VERSION } from '@apform-ui/core'
import { playgroundRoutes, type PlaygroundRoute } from '../routes'
import { useDocsLocale } from '../composables/useDocsLocale'

const router = useRouter()
const { t, groupLabel, groupDesc, locale } = useDocsLocale()
const activeGroup = ref('')

const groups = computed(() => {
  const map = new Map<string, PlaygroundRoute[]>()
  for (const item of playgroundRoutes) {
    if (item.path === '/') continue
    const list = map.get(item.group) ?? []
    list.push(item)
    map.set(item.group, list)
  }
  return [...map.entries()].map(([key, items]) => ({
    key,
    label: groupLabel(key),
    desc: groupDesc(key),
    items,
  }))
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

/**
 * @param key 分组 key，滚动到对应区块
 */
async function jumpTo(key: string) {
  activeGroup.value = key
  await nextTick()
  const el = document.getElementById(`group-${key}`)
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div class="overview" :key="locale">
    <header class="hero">
      <div class="hero-glow" aria-hidden="true" />
      <div class="hero-grid" aria-hidden="true" />
      <div class="hero-inner">
        <p class="eyebrow">@apform-ui · v{{ SCHEMA_UI_VERSION }}</p>
        <h1>{{ t.overview.title }}</h1>
        <p class="lead">
          <span class="stat">{{ total }}</span>
          {{ t.overview.componentsUnit }}
          · {{ t.overview.lead }}
        </p>

        <div class="packages">
          <span class="pkg-label">{{ t.overview.entriesLabel }}</span>
          <div class="pkg-row">
            <code
              v-for="pkg in t.overview.packages"
              :key="pkg.name"
              class="pkg"
              :title="pkg.note"
            >
              <span class="pkg-name">{{ pkg.name }}</span>
              <span class="pkg-note">{{ pkg.note }}</span>
            </code>
          </div>
        </div>
      </div>
    </header>

    <nav class="toc" :aria-label="t.overview.browse">
      <span class="toc-label">{{ t.overview.browse }}</span>
      <div class="toc-chips">
        <button
          v-for="g in groups"
          :key="g.key"
          type="button"
          class="chip"
          :class="{ active: activeGroup === g.key }"
          @click="jumpTo(g.key)"
        >
          <span>{{ g.label }}</span>
          <em>{{ g.items.length }}</em>
        </button>
      </div>
    </nav>

    <section
      v-for="(g, idx) in groups"
      :id="`group-${g.key}`"
      :key="g.key"
      class="group"
      :style="{ '--i': idx }"
    >
      <header class="group-head">
        <div class="group-titles">
          <h2>{{ g.label }}</h2>
          <p>{{ g.desc }}</p>
        </div>
        <span class="count">{{ g.items.length }}</span>
      </header>

      <ul class="list">
        <li v-for="item in g.items" :key="item.path">
          <button type="button" class="row" @click="go(item.path)">
            <span class="name">{{ item.label }}</span>
            <span class="path">{{ item.path }}</span>
            <span class="arrow" aria-hidden="true">→</span>
          </button>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.overview {
  width: 100%;
  max-width: 920px;
}

.hero {
  position: relative;
  margin: -8px 0 28px;
  padding: 28px 28px 32px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--docs-border, #e4e7ed);
  background:
    linear-gradient(145deg, rgba(0, 96, 162, 0.06) 0%, transparent 42%),
    linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
  animation: rise 0.55s ease both;
}

.hero-glow {
  position: absolute;
  top: -40%;
  right: -10%;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(11, 126, 194, 0.18), transparent 68%);
  pointer-events: none;
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 96, 162, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 96, 162, 0.04) 1px, transparent 1px);
  background-size: 24px 24px;
  mask-image: linear-gradient(180deg, #000 20%, transparent 90%);
  pointer-events: none;
}

.hero-inner {
  position: relative;
  z-index: 1;
}

.eyebrow {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--docs-primary, #0060a2);
}

h1 {
  margin: 0 0 12px;
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1.15;
  color: var(--docs-text, #1f2937);
}

.lead {
  margin: 0;
  max-width: 640px;
  font-size: 14px;
  line-height: 1.75;
  color: var(--docs-regular, #606266);
}

.stat {
  display: inline-block;
  padding: 0 6px;
  margin-right: 2px;
  border-radius: 6px;
  background: var(--docs-primary-soft, #ecf5ff);
  color: var(--docs-primary, #0060a2);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.packages {
  margin-top: 22px;
}

.pkg-label {
  display: block;
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 600;
  color: var(--docs-muted, #909399);
}

.pkg-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.pkg {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid var(--docs-border, #e4e7ed);
  background: rgba(255, 255, 255, 0.85);
  font-family: var(--docs-mono, monospace);
  font-size: 12px;
  transition: border-color 0.15s, transform 0.15s;
}

.pkg:hover {
  border-color: #b3d8ff;
  transform: translateY(-1px);
}

.pkg-name {
  color: var(--docs-text, #1f2937);
  font-weight: 500;
}

.pkg-note {
  color: var(--docs-muted, #909399);
  font-family: var(--docs-font, inherit);
  font-size: 11px;
}

.toc {
  position: sticky;
  top: 64px;
  z-index: 5;
  margin-bottom: 28px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--docs-border, #e4e7ed);
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  animation: rise 0.55s ease 0.06s both;
}

.toc-label {
  display: block;
  margin-bottom: 8px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--docs-muted, #909399);
}

.toc-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--docs-border, #e4e7ed);
  background: var(--docs-bg-soft, #f4f6f9);
  color: var(--docs-regular, #606266);
  font-size: 12px;
  font-weight: 600;
  font-family: var(--docs-font, inherit);
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s, transform 0.15s;
}

.chip em {
  font-style: normal;
  font-variant-numeric: tabular-nums;
  color: var(--docs-muted, #909399);
}

.chip:hover,
.chip.active {
  color: var(--docs-primary, #0060a2);
  border-color: #b3d8ff;
  background: var(--docs-primary-soft, #ecf5ff);
  transform: translateY(-1px);
}

.group {
  margin-bottom: 36px;
  scroll-margin-top: 140px;
  animation: rise 0.5s ease both;
  animation-delay: calc(0.08s + var(--i, 0) * 0.035s);
}

.group-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--docs-border, #e4e7ed);
}

.group-titles h2 {
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--docs-text, #1f2937);
}

.group-titles p {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--docs-muted, #909399);
}

.count {
  flex-shrink: 0;
  min-width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  border-radius: 8px;
  background: var(--docs-bg-soft, #f4f6f9);
  font-size: 12px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--docs-regular, #606266);
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2px 16px;
}

.row {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: none;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font-family: var(--docs-font, inherit);
  transition: background 0.15s;
}

.row:hover {
  background: var(--docs-primary-soft, #ecf5ff);
}

.name {
  font-size: 13px;
  font-weight: 600;
  color: var(--docs-text, #1f2937);
}

.path {
  font-size: 11px;
  color: var(--docs-muted, #909399);
  font-family: var(--docs-mono, monospace);
  opacity: 0.85;
}

.arrow {
  font-size: 13px;
  color: var(--docs-primary, #0060a2);
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.15s, transform 0.15s;
}

.row:hover .name {
  color: var(--docs-primary, #0060a2);
}

.row:hover .arrow {
  opacity: 1;
  transform: translateX(0);
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

:global(.docs.dark) .hero {
  background:
    linear-gradient(145deg, rgba(0, 96, 162, 0.18) 0%, transparent 42%),
    linear-gradient(180deg, #222426 0%, #1d1e1f 100%);
  border-color: #363637;
}

:global(.docs.dark) .pkg,
:global(.docs.dark) .toc,
:global(.docs.dark) .count {
  background: #252628;
  border-color: #363637;
}

:global(.docs.dark) .chip {
  background: #252628;
  border-color: #363637;
  color: #cfd3dc;
}

:global(.docs.dark) .chip:hover,
:global(.docs.dark) .chip.active,
:global(.docs.dark) .row:hover {
  background: rgba(0, 96, 162, 0.22);
  color: #7ec8f0;
}

:global(.docs.dark) .group-head {
  border-color: #363637;
}

:global(.docs.dark) .name,
:global(.docs.dark) .group-titles h2,
:global(.docs.dark) .pkg-name {
  color: #e5eaf3;
}

@media (max-width: 720px) {
  .hero {
    padding: 22px 18px 24px;
  }

  .list {
    grid-template-columns: 1fr;
  }

  .path {
    display: none;
  }

  .row {
    grid-template-columns: minmax(0, 1fr) auto;
  }
}
</style>
