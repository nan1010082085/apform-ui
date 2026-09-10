<script setup lang="ts">
/**
 * NodeArtifactStrip — 流程图节点上的紧凑产物条
 *
 * 包装 ArtifactGallery(size=compact)，点击文件时向上抛 preview。
 */
import type { ArtifactItem } from '../../types/artifact'
import ArtifactGallery from '../ArtifactGallery/ArtifactGallery.vue'

withDefaults(
  defineProps<{
    items: ArtifactItem[]
    max?: number
  }>(),
  { max: 6 },
)

const emit = defineEmits<{
  preview: [item: ArtifactItem]
}>()
</script>

<template>
  <ArtifactGallery
    class="apf-node-artifact-strip"
    :items="items"
    size="compact"
    :max="max"
    @preview="emit('preview', $event)"
  />
</template>

<style scoped>
.apf-node-artifact-strip {
  margin-top: 6px;
  max-width: 100%;
}
</style>
