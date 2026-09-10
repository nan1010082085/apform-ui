<script setup lang="ts">
/**
 * HitlArtifactPanel — HITL / 详情侧栏的产物面板
 *
 * default 尺寸 Gallery + 可选标题；文档抽屉由宿主处理 preview 事件。
 */
import type { ArtifactItem } from '../../types/artifact'
import ArtifactGallery from '../ArtifactGallery/ArtifactGallery.vue'

withDefaults(
  defineProps<{
    items: ArtifactItem[]
    title?: string
    max?: number
  }>(),
  { title: '节点产物', max: 24 },
)

const emit = defineEmits<{
  preview: [item: ArtifactItem]
}>()
</script>

<template>
  <section v-if="items.length" class="apf-hitl-artifact-panel">
    <header v-if="title" class="apf-hitl-artifact-panel__head">{{ title }}</header>
    <ArtifactGallery
      :items="items"
      size="default"
      :max="max"
      @preview="emit('preview', $event)"
    />
  </section>
</template>

<style scoped>
.apf-hitl-artifact-panel {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.apf-hitl-artifact-panel__head {
  font-size: 12px;
  font-weight: 600;
  color: var(--apf-text-secondary, var(--el-text-color-secondary, #909399));
}
</style>
