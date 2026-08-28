<script setup lang="ts">
import type { MessageDocumentSummary, MessageAttachment } from '../../../types'

const props = defineProps<{
  summaries: MessageDocumentSummary[]
  attachments?: MessageAttachment[]
}>()

const emit = defineEmits<{ (e: 'preview', attachment: MessageAttachment): void }>()

function findAttachment(doc: MessageDocumentSummary): MessageAttachment | null {
  if (!props.attachments?.length) return null
  const filename = (doc.filename || '').toLowerCase()
  return props.attachments.find((a) => (a.filename || '').toLowerCase() === filename) || null
}

function onDocClick(doc: MessageDocumentSummary) {
  const attachment = findAttachment(doc)
  if (attachment) emit('preview', attachment)
}

function isClickable(doc: MessageDocumentSummary): boolean {
  return findAttachment(doc) !== null
}
</script>

<template>
  <div v-if="summaries?.length" class="apf-doc-list">
    <article
      v-for="doc in summaries" :key="doc.documentId"
      class="apf-doc-card" :class="{ 'apf-clickable': isClickable(doc) }"
      :role="isClickable(doc) ? 'button' : undefined"
      :tabindex="isClickable(doc) ? 0 : undefined"
      @click="onDocClick(doc)"
      @keydown.enter="onDocClick(doc)"
      @keydown.space.prevent="onDocClick(doc)"
    >
      <div class="apf-doc-icon">
        <svg viewBox="0 0 16 16" width="14" height="14">
          <path d="M4 2.5h5.2L12 5.3V13.5H4V2.5Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
          <path d="M9.2 2.5V5.3H12" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="apf-doc-body">
        <strong class="apf-doc-name">{{ doc.filename }}</strong>
        <p class="apf-doc-summary">{{ doc.summary }}</p>
        <span v-if="doc.pageCount" class="apf-doc-meta">{{ doc.pageCount }} 页</span>
      </div>
    </article>
  </div>
</template>

<style scoped>
.apf-doc-list { display: flex; flex-direction: column; gap: 8px; margin-top: 10px; }
.apf-doc-card {
  display: flex; gap: 10px; padding: 10px 12px;
  border: 1px solid var(--c-border); border-radius: var(--radius); background: #f7fafa;
}
.apf-doc-card.apf-clickable { cursor: pointer; transition: border-color .15s ease, box-shadow .15s ease; }
.apf-doc-card.apf-clickable:hover { border-color: var(--c-primary); box-shadow: 0 0 0 2px rgba(13, 107, 103, .08); }
.apf-doc-card.apf-clickable:focus-visible { outline: 2px solid var(--c-primary); outline-offset: 2px; }
.apf-doc-icon {
  flex: none; display: grid; place-items: center; width: 28px; height: 28px;
  border-radius: 6px; background: var(--c-primary-soft); color: var(--c-primary);
}
.apf-doc-body { min-width: 0; flex: 1; }
.apf-doc-name { display: block; font-size: 13px; font-weight: 650; }
.apf-doc-summary { margin: 4px 0 0; font-size: 12px; line-height: 1.5; color: var(--c-text-secondary); }
.apf-doc-meta { display: inline-block; margin-top: 4px; font-size: 11px; color: var(--c-text-muted); }
</style>
