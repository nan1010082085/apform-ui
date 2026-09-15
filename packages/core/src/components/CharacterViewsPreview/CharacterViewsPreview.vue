<script setup lang="ts">
/**
 * CharacterViewsPreview — 按角色展示名称 + 正/侧/背三视图
 */
import type { ArtifactItem } from '../../types/artifact'
import type { CharacterViewGroup } from '../../utils/resolveResultBlocks'
import ImagePreviewCard from '../ImagePreviewCard/ImagePreviewCard.vue'

defineProps<{
  /** 角色分组 */
  groups: CharacterViewGroup[]
  /** 区块标题 */
  title?: string
}>()

const emit = defineEmits<{
  preview: [item: ArtifactItem]
}>()
</script>

<template>
  <div class="apf-character-views" data-testid="character-views-preview">
    <div v-if="title" class="apf-character-views__title">{{ title }}</div>
    <div
      v-for="(group, gi) in groups"
      :key="`${group.name}-${gi}`"
      class="apf-character-views__group"
    >
      <div class="apf-character-views__name">{{ group.name }}</div>
      <div class="apf-character-views__row">
        <div
          v-for="(art, ai) in group.artifacts"
          :key="art.id || `${gi}-${ai}`"
          class="apf-character-views__cell"
        >
          <span v-if="art.label" class="apf-character-views__label">{{ art.label }}</span>
          <ImagePreviewCard
            v-if="art.url"
            :url="art.url"
            :alt="`${group.name} ${art.label || '视图'}`"
            size="default"
          />
          <button
            v-else-if="art.documentId"
            type="button"
            class="apf-character-views__doc"
            @click="emit('preview', art)"
          >
            {{ art.label || '文档' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.apf-character-views {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.apf-character-views__title {
  font-size: 12px;
  font-weight: 600;
  color: var(--apf-text-secondary, #909399);
}

.apf-character-views__group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.apf-character-views__name {
  font-size: 14px;
  font-weight: 600;
  color: var(--apf-text-primary, #303133);
  line-height: 1.4;
}

.apf-character-views__row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.apf-character-views__cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
}

.apf-character-views__label {
  font-size: 12px;
  color: var(--apf-text-secondary, #909399);
  line-height: 1.2;
}

.apf-character-views__doc {
  padding: 6px 10px;
  border: 1px solid var(--apf-border-color, #ebeef5);
  border-radius: 6px;
  background: var(--apf-bg-page, #f5f7fa);
  color: var(--apf-text-regular, #606266);
  cursor: pointer;
  font-size: 12px;
}

.apf-character-views__cell :deep(.apf-image-preview__thumb) {
  width: 112px;
  height: 112px;
}
</style>
