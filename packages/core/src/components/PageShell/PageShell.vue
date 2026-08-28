<script setup lang="ts">
/**
 * PageShell — 路由页统一外沿容器
 *
 * 为列表 / 设置页提供内边距、滚动与页面背景。
 * 全幅页（对话、设计器）不要使用本组件。
 */
withDefaults(
  defineProps<{
    /** 一屏填满：overflow hidden，末子 flex:1 可内滚 */
    fill?: boolean
  }>(),
  { fill: false },
)
</script>

<template>
  <div :class="[$style.shell, fill && $style.shellFill]">
    <slot />
  </div>
</template>

<style module>
.shell {
  box-sizing: border-box;
  height: 100%;
  overflow: auto;
  background: var(--bg-color-page, #f5f7fa);
  padding: 0 var(--page-padding-x, 24px) var(--page-padding-bottom, 24px);
}

.shellFill {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.shellFill > *:not(:last-child) {
  flex-shrink: 0;
}

.shellFill > :last-child {
  flex: 1;
  min-width: 0;
  min-height: 0;
}
</style>
