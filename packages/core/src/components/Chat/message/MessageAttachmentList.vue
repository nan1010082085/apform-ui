<script setup lang="ts">
/**
 * MessageAttachmentList — 消息附件列表（图片网格 + 文件行）
 */
import { computed } from 'vue'
import type { MessageAttachment } from '../../../types'
import { isImage, isPdf, isOffice, fileKind, formatSize } from '../../../utils/attachmentKind'

const props = defineProps<{ attachments: MessageAttachment[] }>()
const emit = defineEmits<{ (e: 'preview', attachment: MessageAttachment): void }>()

const images = computed(() => props.attachments.filter(isImage))
const files = computed(() => props.attachments.filter((a) => !isImage(a)))

/**
 * 打开预览
 * @param att 附件
 */
function openPreview(att: MessageAttachment) {
  emit('preview', att)
}
</script>

<template>
  <div v-if="attachments?.length" class="apf-att-list">
    <div v-if="images.length" class="apf-image-grid" :class="{ 'apf-multi': images.length > 1 }">
      <button
        v-for="att in images"
        :key="att.id"
        type="button"
        class="apf-att-image"
        :aria-label="`预览图片 ${att.filename}`"
        @click="openPreview(att)"
      >
        <img :src="att.url" :alt="att.filename" loading="lazy" />
      </button>
    </div>
    <button
      v-for="att in files"
      :key="att.id"
      type="button"
      class="apf-att-file"
      :aria-label="`${isPdf(att) ? '预览' : isOffice(att) ? '查看' : '打开'} ${att.filename}`"
      @click="openPreview(att)"
    >
      <span class="apf-att-badge" aria-hidden="true">{{ fileKind(att) }}</span>
      <span class="apf-att-meta">
        <strong>{{ att.filename }}</strong>
        <small>
          <template v-if="att.size">{{ formatSize(att.size) }}</template>
          <template v-if="isPdf(att)"> · 点击预览</template>
          <template v-else-if="isOffice(att)"> · 点击查看</template>
          <template v-else> · 点击打开</template>
        </small>
        <em v-if="att.excerpt">{{ att.excerpt }}</em>
      </span>
    </button>
  </div>
</template>

<style scoped>
.apf-att-list { display: flex; flex-direction: column; gap: var(--spacing-sm, 8px); margin-bottom: var(--spacing-sm, 8px); }
.apf-image-grid { display: grid; gap: var(--spacing-sm, 8px); grid-template-columns: minmax(0, 1fr); }
.apf-image-grid.apf-multi { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.apf-att-image {
  display: block; width: 100%; padding: 0; border: 1px solid var(--c-border);
  border-radius: var(--radius); overflow: hidden; background: #f7fafa; cursor: zoom-in;
}
.apf-att-image img { display: block; width: 100%; max-height: 240px; object-fit: cover; background: #fff; }
.apf-att-file {
  display: flex; gap: var(--spacing-10px, 10px); align-items: flex-start; width: 100%; padding: var(--spacing-10px, 10px) var(--spacing-12px, 12px);
  border: 1px solid var(--c-border); border-radius: var(--radius); background: #f7fafa;
  text-align: left; color: inherit; cursor: pointer; font: inherit;
}
.apf-att-file:hover { border-color: var(--c-primary); }
.apf-att-badge {
  flex: none; min-width: var(--control-height-lg, 40px); height: var(--control-height-sm, 28px); padding: 0 var(--spacing-sm, 8px); display: grid; place-items: center;
  border-radius: var(--border-radius-6, 6px); background: var(--c-primary-soft); color: var(--c-primary);
  font-size: var(--font-size-11, 11px); font-weight: var(--font-weight-bold, 700); letter-spacing: 0.02em;
}
.apf-att-meta { min-width: 0; flex: 1; display: flex; flex-direction: column; gap: 2px; }
.apf-att-meta strong { font-size: var(--font-size-13, 13px); font-weight: var(--font-weight-semibold, 600); word-break: break-all; }
.apf-att-meta small { font-size: var(--font-size-11, 11px); color: var(--c-text-muted); }
.apf-att-meta em {
  font-style: normal; font-size: var(--font-size-12, 12px); line-height: 1.45; color: var(--c-text-secondary);
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
</style>
