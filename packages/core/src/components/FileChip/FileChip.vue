<script setup lang="ts">
/**
 * FileChip — 通用文件 chip（pdf / office / 未知文件）
 */
import { computed } from 'vue'
import { AppIcon } from '../AppIcon'
import { fileKind } from '../../utils/attachmentKind'
import type { ArtifactItem } from '../../types/artifact'

const props = defineProps<{
  item: ArtifactItem
}>()

const emit = defineEmits<{
  preview: [item: ArtifactItem]
}>()

const kindLabel = computed(() => {
  if (props.item.kind === 'pdf') return 'PDF'
  if (props.item.kind === 'office') {
    return fileKind({
      id: props.item.id,
      filename: props.item.filename || props.item.label || 'file',
      mimetype: props.item.mimetype || '',
    })
  }
  return '文件'
})

const title = computed(() => props.item.filename || props.item.label || kindLabel.value)
</script>

<template>
  <button type="button" class="apf-file-chip" @click.stop="emit('preview', item)">
    <AppIcon name="document" :size="14" />
    <span class="apf-file-chip__name">{{ title }}</span>
    <span class="apf-file-chip__kind">{{ kindLabel }}</span>
  </button>
</template>

<style scoped>
.apf-file-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border: 1px solid var(--apf-border-color, var(--el-border-color-lighter, #ebeef5));
  border-radius: 6px;
  background: var(--apf-bg-page, var(--el-bg-color-page, #f5f7fa));
  cursor: pointer;
  font-size: 12px;
  color: var(--apf-text-primary, var(--el-text-color-primary, #303133));
}

.apf-file-chip__name {
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.apf-file-chip__kind {
  font-size: 11px;
  color: var(--apf-text-secondary, var(--el-text-color-secondary, #909399));
}
</style>
