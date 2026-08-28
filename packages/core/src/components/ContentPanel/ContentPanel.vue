<script setup lang="ts">
/**
 * ContentPanel — 白底内容面板
 *
 * 对应会议系统 MsPanel：title / extra / flush / fill。
 */
withDefaults(
  defineProps<{
    /** 面板标题 */
    title?: string
    /** 去除 body 内边距 */
    flush?: boolean
    /** 在父级 flex 中撑满剩余高度 */
    fill?: boolean
  }>(),
  { flush: false, fill: false },
)
</script>

<template>
  <section
    class="apf-content-panel"
    :class="{
      'apf-content-panel--flush': flush,
      'apf-content-panel--fill': fill,
    }"
  >
    <header v-if="title || $slots.extra" class="apf-content-panel__head">
      <span v-if="title" class="apf-content-panel__title">{{ title }}</span>
      <div v-if="$slots.extra" class="apf-content-panel__extra">
        <slot name="extra" />
      </div>
    </header>
    <div class="apf-content-panel__body">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.apf-content-panel {
  background: var(--bg-color-white, #fff);
  border: 1px solid var(--border-color-light, #ebeef5);
  border-radius: var(--border-radius-lg, 8px);
  box-shadow: var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.04));
}

.apf-content-panel + .apf-content-panel {
  margin-top: 16px;
}

.apf-content-panel__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-color-light, #ebeef5);
  background: var(--bg-color-gray-light, #fafafa);
  flex-shrink: 0;
}

.apf-content-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color-title, #303133);
}

.apf-content-panel__extra {
  display: flex;
  gap: 8px;
  align-items: center;
}

.apf-content-panel__body {
  padding: 16px 20px;
}

.apf-content-panel--flush .apf-content-panel__body {
  padding: 0;
}

.apf-content-panel--fill {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.apf-content-panel--fill .apf-content-panel__body {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
</style>
