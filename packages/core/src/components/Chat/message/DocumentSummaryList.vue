<script setup lang="ts">
/**
 * DocumentSummaryList — 文档摘要卡片列表
 *
 * 可点击项需能匹配到 attachments 池中的附件。
 */
import type { MessageDocumentSummary, MessageAttachment } from '../../../types'

const props = defineProps<{
  summaries: MessageDocumentSummary[]
  /** 可匹配的附件池（当前消息等），由父组件传入 */
  attachments?: MessageAttachment[]
}>()

const emit = defineEmits<{
  (e: 'preview', attachment: MessageAttachment): void
}>()

/**
 * 匹配摘要对应的附件：优先 attachmentId，其次 filename（忽略大小写）
 * @param doc 文档摘要
 */
function findAttachment(doc: MessageDocumentSummary): MessageAttachment | null {
  if (!props.attachments?.length) return null

  if (doc.attachmentId) {
    const byId = props.attachments.find((a) => a.id === doc.attachmentId)
    if (byId) return byId
  }

  const filename = (doc.filename || '').toLowerCase()
  return props.attachments.find((a) => (a.filename || '').toLowerCase() === filename) || null
}

/**
 * 点击摘要卡片
 * @param doc 文档摘要
 */
function onDocClick(doc: MessageDocumentSummary) {
  const attachment = findAttachment(doc)
  if (attachment) emit('preview', attachment)
}

/**
 * 是否可点击预览
 * @param doc 文档摘要
 */
function isClickable(doc: MessageDocumentSummary): boolean {
  return findAttachment(doc) !== null
}
</script>

<template>
  <div v-if="summaries?.length" class="apf-doc-list">
    <article
      v-for="doc in summaries"
      :key="doc.documentId"
      class="apf-doc-card"
      :class="{ 'apf-clickable': isClickable(doc) }"
      :role="isClickable(doc) ? 'button' : undefined"
      :tabindex="isClickable(doc) ? 0 : undefined"
      :aria-label="isClickable(doc) ? `预览 ${doc.filename}` : undefined"
      @click="onDocClick(doc)"
      @keydown.enter="onDocClick(doc)"
      @keydown.space.prevent="onDocClick(doc)"
    >
      <div class="apf-doc-icon" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="14" height="14">
          <path d="M4 2.5h5.2L12 5.3V13.5H4V2.5Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
          <path d="M9.2 2.5V5.3H12" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="apf-doc-body">
        <strong class="apf-doc-name">{{ doc.filename }}</strong>
        <p class="apf-doc-summary">{{ doc.summary }}</p>
        <span v-if="doc.pageCount" class="apf-doc-meta">{{ doc.pageCount }} 页</span>
        <span v-if="!isClickable(doc)" class="apf-doc-hint">无对应附件，请从附件列表打开</span>
      </div>
    </article>
  </div>
</template>

<style scoped>
.apf-doc-list { display: flex; flex-direction: column; gap: var(--spacing-sm, 8px); margin-top: var(--spacing-10px, 10px); }
.apf-doc-card {
  display: flex; gap: var(--spacing-10px, 10px); padding: var(--spacing-10px, 10px) var(--spacing-12px, 12px);
  border: 1px solid var(--c-border); border-radius: var(--radius); background: #f7fafa;
}
.apf-doc-card.apf-clickable { cursor: pointer; transition: border-color .15s ease, box-shadow .15s ease; }
.apf-doc-card.apf-clickable:hover { border-color: var(--c-primary); box-shadow: 0 0 0 2px rgba(13, 107, 103, .08); }
.apf-doc-card.apf-clickable:focus-visible { outline: 2px solid var(--c-primary); outline-offset: 2px; }
.apf-doc-icon {
  flex: none; display: grid; place-items: center; width: var(--control-height-sm, 28px); height: var(--control-height-sm, 28px);
  border-radius: var(--border-radius-6, 6px); background: var(--c-primary-soft); color: var(--c-primary);
}
.apf-doc-body { min-width: 0; flex: 1; }
.apf-doc-name { display: block; font-size: var(--font-size-13, 13px); font-weight: var(--font-weight-semibold, 600); }
.apf-doc-summary { margin: var(--spacing-xs, 4px) 0 0; font-size: var(--font-size-12, 12px); line-height: 1.5; color: var(--c-text-secondary); }
.apf-doc-meta { display: inline-block; margin-top: var(--spacing-xs, 4px); font-size: var(--font-size-11, 11px); color: var(--c-text-muted); }
.apf-doc-hint {
  display: block; margin-top: var(--spacing-xs, 4px);
  font-size: var(--font-size-11, 11px); color: var(--c-text-muted); font-style: italic;
}
</style>
