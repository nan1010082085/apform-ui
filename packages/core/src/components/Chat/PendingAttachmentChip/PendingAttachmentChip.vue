<script setup lang="ts">
/**
 * PendingAttachmentChip — 待发送附件 chip（上传中 / 完成 / 失败）
 */
import { AppIcon } from '../../AppIcon'
import type { PendingAttachment } from '../../../types'

const props = defineProps<{
  attachment: PendingAttachment
}>()

const emit = defineEmits<{
  preview: [attachment: PendingAttachment]
  remove: [id: string]
}>()

/**
 * @param mimetype - MIME
 */
function iconName(mimetype?: string): string {
  return mimetype?.startsWith('image/') ? 'picture' : 'document'
}

function onOpen(): void {
  if (props.attachment.status === 'done') {
    emit('preview', props.attachment)
  }
}
</script>

<template>
  <div
    class="apf-pending-chip"
    :class="{
      'is-error': attachment.status === 'error',
      'is-clickable': attachment.status === 'done',
    }"
    :title="attachment.status === 'error' ? (attachment.error || attachment.filename) : attachment.filename"
  >
    <span v-if="attachment.status === 'uploading'" class="apf-pending-chip__spinner" />
    <img
      v-else-if="attachment.previewUrl && attachment.mimetype?.startsWith('image/')"
      class="apf-pending-chip__thumb"
      :src="attachment.previewUrl"
      :alt="attachment.filename"
    />
    <AppIcon
      v-else
      :name="iconName(attachment.mimetype)"
      :size="14"
      class="apf-pending-chip__icon"
    />
    <button
      type="button"
      class="apf-pending-chip__name"
      :disabled="attachment.status !== 'done'"
      @click="onOpen"
    >
      {{ attachment.filename }}
    </button>
    <span v-if="attachment.status === 'uploading'" class="apf-pending-chip__status">上传中</span>
    <span v-else-if="attachment.status === 'error'" class="apf-pending-chip__status is-error">
      {{ attachment.error || '失败' }}
    </span>
    <button
      type="button"
      class="apf-pending-chip__remove"
      aria-label="移除"
      @click="emit('remove', attachment.id)"
    >
      <AppIcon name="close" :size="12" />
    </button>
  </div>
</template>

<style scoped>
.apf-pending-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 100%;
  padding: 4px 6px 4px 8px;
  border: 1px solid var(--border-color-light, #ebedf3);
  border-radius: var(--border-radius-md, 6px);
  background: var(--bg-color-gray-light, #f5f7fa);
}

.apf-pending-chip.is-clickable {
  cursor: pointer;
}

.apf-pending-chip.is-clickable:hover {
  border-color: var(--el-color-primary-light-5, #a0cfff);
}

.apf-pending-chip.is-error {
  border-color: var(--el-color-danger, #f56c6c);
  background: var(--el-color-danger-light-9, #fef0f0);
}

.apf-pending-chip__icon {
  flex-shrink: 0;
  color: var(--text-color-secondary, #666);
}

.apf-pending-chip__thumb {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  object-fit: cover;
  border-radius: 3px;
  background: var(--bg-color-white, #fff);
}

.apf-pending-chip__name {
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  padding: 0;
  font-size: var(--font-size-12, 12px);
  line-height: 1.4;
  color: var(--text-color-primary, #333);
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: inherit;
}

.apf-pending-chip__name:disabled {
  cursor: default;
}

.apf-pending-chip__name:not(:disabled):hover {
  color: var(--el-color-primary, #409eff);
}

.apf-pending-chip__status {
  flex: none;
  font-size: var(--font-size-11, 11px);
  color: var(--text-color-secondary, #909399);
}

.apf-pending-chip__status.is-error {
  color: var(--el-color-danger, #f56c6c);
}

.apf-pending-chip__remove {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--text-color-placeholder, #999);
  cursor: pointer;
}

.apf-pending-chip__remove:hover {
  background: var(--el-color-danger-light-9, #fef0f0);
  color: var(--el-color-danger, #f56c6c);
}

.apf-pending-chip__spinner {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  border: 2px solid var(--border-color-light, #ebedf3);
  border-top-color: var(--el-color-primary, #409eff);
  border-radius: 50%;
  animation: apf-pending-spin 0.8s linear infinite;
}

@keyframes apf-pending-spin {
  to { transform: rotate(360deg); }
}
</style>
