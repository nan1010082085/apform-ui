<script setup lang="ts">
/**
 * SessionHistoryDrawer — 会话历史抽屉壳（纯 UI）
 *
 * 默认插槽承载 SessionSidebar 等内容；visible 双向绑定。
 */
withDefaults(
  defineProps<{
    visible: boolean
    title?: string
    size?: string | number
    direction?: 'rtl' | 'ltr' | 'ttb' | 'btt'
  }>(),
  {
    title: '对话历史',
    size: 320,
    direction: 'rtl',
  },
)

const emit = defineEmits<{
  'update:visible': [value: boolean]
}>()
</script>

<template>
  <el-drawer
    :model-value="visible"
    :title="title"
    :size="size"
    :direction="direction"
    class="apf-session-history-drawer"
    append-to-body
    @update:model-value="emit('update:visible', $event)"
  >
    <slot />
  </el-drawer>
</template>

<style>
.apf-session-history-drawer .el-drawer__body {
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
