<script setup lang="ts">
import { computed, onBeforeUnmount, ref, nextTick } from 'vue'
import type { PendingAttachment } from '../../../types'

const props = defineProps<{
  disabled: boolean
  placeholder?: string
  supportedInputs?: string[]
  hitlCapable?: boolean
  /** WebSocket 状态（可选） */
  wsStatus?: 'ok' | 'pending' | 'streaming' | 'warn' | 'err' | 'idle'
  wsLabel?: string
}>()

const emit = defineEmits<{
  (e: 'send', content: string, attachmentIds: string[]): void
  (e: 'upload', file: File): void
  (e: 'remove-attachment', id: string): void
  (e: 'ws-click'): void
}>()

const input = ref('')
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)
const pending = ref<PendingAttachment[]>([])
const uploading = ref(false)

const inputs = computed(() => props.supportedInputs || ['text'])
const supportsFile = computed(() => inputs.value.some((i) => i === 'file' || i === 'image' || i === 'document'))

const canSend = computed(() => {
  if (props.disabled || uploading.value) return false
  const hasText = Boolean(input.value.trim())
  const hasDone = pending.value.some((p) => p.status === 'done')
  const hasBusy = pending.value.some((p) => p.status === 'uploading')
  return (hasText || hasDone) && !hasBusy
})

function triggerUpload() {
  if (props.disabled || !supportsFile.value) return
  fileInputRef.value?.click()
}

function onFileChange(event: Event) {
  const el = event.target as HTMLInputElement
  const files = el.files
  if (!files?.length) return
  for (const file of Array.from(files)) {
    emit('upload', file)
  }
  el.value = ''
}

function removePending(id: string) {
  const item = pending.value.find((p) => p.id === id)
  if (item?.previewUrl) URL.revokeObjectURL(item.previewUrl)
  pending.value = pending.value.filter((p) => p.id !== id)
  emit('remove-attachment', id)
}

async function send() {
  if (!canSend.value) return
  const content = input.value.trim()
  const attachmentIds = pending.value.filter((p) => p.status === 'done').map((p) => p.id)
  emit('send', content, attachmentIds)
  input.value = ''
  pending.value.forEach((p) => { if (p.previewUrl) URL.revokeObjectURL(p.previewUrl) })
  pending.value = []
  await nextTick()
  if (textareaRef.value) textareaRef.value.style.height = 'auto'
}

function autoResize(e: Event) {
  const el = e.target as HTMLTextAreaElement
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 220) + 'px'
}

function onEnter(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    send()
  }
}

onBeforeUnmount(() => {
  pending.value.forEach((p) => { if (p.previewUrl) URL.revokeObjectURL(p.previewUrl) })
})
</script>

<template>
  <form class="apf-composer" @submit.prevent="send">
    <div class="apf-composer-field" :class="{ 'apf-disabled': disabled }">
      <div v-if="pending.length" class="apf-pending-list">
        <div v-for="att in pending" :key="att.id" class="apf-pending-chip" :class="att.status">
          <img v-if="att.previewUrl" :src="att.previewUrl" alt="" class="apf-pending-thumb" />
          <span class="apf-pending-name">{{ att.filename }}</span>
          <span v-if="att.status === 'uploading'" class="apf-pending-status">上传中</span>
          <span v-else-if="att.status === 'error'" class="apf-pending-status apf-error">{{ att.error || '失败' }}</span>
          <button type="button" class="apf-pending-remove" @click="removePending(att.id)">×</button>
        </div>
      </div>
      <textarea ref="textareaRef" v-model="input" :placeholder="placeholder || '输入消息…'" :disabled="disabled" @input="autoResize" @keydown="onEnter" />
      <div class="apf-composer-footer">
        <div class="apf-composer-tools">
          <slot name="tools" />
          <input ref="fileInputRef" type="file" class="apf-file-input" multiple accept="image/*,.pdf,.txt,.md,.csv,.json,.doc,.docx,.xls,.xlsx" @change="onFileChange" />
          <button v-if="supportsFile" class="apf-cap-btn" type="button" aria-label="添加文件" :disabled="disabled || uploading" @click="triggerUpload">
            <svg viewBox="0 0 16 16" width="14" height="14"><path d="M9.2 2.8 4.4 7.6a2.6 2.6 0 0 0 3.7 3.7l5.2-5.2a1.8 1.8 0 0 0-2.5-2.5L5.6 8.8" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
        <button type="submit" class="apf-send-btn" :disabled="!canSend" title="发送">↗</button>
      </div>
    </div>
    <div class="apf-composer-meta">
      <div class="apf-cap-row">
        <span class="apf-cap-chip">文本</span>
        <span v-if="supportsFile" class="apf-cap-chip">文件</span>
        <span v-if="hitlCapable" class="apf-cap-chip">需要确认</span>
      </div>
      <div class="apf-meta-right">
        <button v-if="wsStatus" type="button" class="apf-ws-status" :class="wsStatus" @click="emit('ws-click')">
          <i class="apf-ws-dot" />
        </button>
        <small class="apf-hint">Enter 发送 · Shift+Enter 换行</small>
      </div>
    </div>
  </form>
</template>

<style scoped>
.apf-composer { position: relative; flex: none; width: min(960px, calc(100% - 48px)); margin: 0 auto var(--spacing-20px, 20px); padding-top: 14px; }
.apf-composer-field {
  position: relative; display: flex; flex-direction: column;
  border: 1.5px solid var(--c-border); border-radius: var(--radius-lg, 12px);
  background: var(--c-surface); overflow: hidden;
  transition: border-color .2s ease, box-shadow .2s ease;
}
.apf-composer-field:focus-within, .apf-composer-field:hover:not(.apf-disabled) {
  border-color: var(--c-primary, #0060A2);
  box-shadow: 0 0 0 3px rgba(13, 107, 103, .08), 0 0 20px rgba(94, 184, 176, .16);
}
.apf-composer-field.apf-disabled { background: #f4f6f6; }
.apf-pending-list { display: flex; flex-wrap: wrap; gap: var(--spacing-sm, 8px); padding: var(--spacing-12px, 12px) 14px 0; }
.apf-pending-chip {
  display: inline-flex; align-items: center; gap: var(--form-field-gap, 6px); max-width: 100%;
  padding: var(--spacing-xs, 4px) var(--spacing-sm, 8px); border: 1px solid var(--c-border); border-radius: var(--border-radius-full, 999px);
  background: #f4f6f6; font-size: var(--font-size-12, 12px);
}
.apf-pending-chip.error { border-color: #e8b4b4; color: #a33; }
.apf-pending-thumb { width: var(--icon-size-xl, 24px); height: var(--icon-size-xl, 24px); border-radius: var(--border-radius-md, 4px); object-fit: cover; }
.apf-pending-name { max-width: 160px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.apf-pending-status { color: var(--c-text-muted); font-size: var(--font-size-11, 11px); }
.apf-pending-status.apf-error { color: #a33; }
.apf-pending-remove { border: 0; background: transparent; color: var(--c-text-muted); cursor: pointer; font-size: var(--font-size-14, 14px); line-height: 1; padding: 0 2px; }
.apf-file-input { display: none; }
textarea {
  display: block; width: 100%; min-height: var(--composer-textarea-min-height, 96px); max-height: var(--composer-textarea-max-height, 220px); resize: none;
  padding: var(--spacing-md, 16px) 18px var(--spacing-10px, 10px); border: 0; border-radius: 0; outline: none;
  background: transparent; line-height: var(--line-height-normal, 1.5); font-size: var(--font-size-14, 14px); box-shadow: none;
}
textarea:disabled { color: var(--c-text-muted); }
.apf-composer-footer {
  display: flex; align-items: center; justify-content: space-between; gap: var(--spacing-10px, 10px);
  flex: none; min-height: var(--toolbar-height, 48px); padding: 6px var(--spacing-12px, 12px) var(--spacing-10px, 10px); border-top: 1px solid transparent;
}
.apf-composer-tools { display: flex; align-items: center; gap: var(--spacing-sm, 8px); min-width: 0; flex: 1; }
.apf-cap-btn {
  display: inline-grid; place-items: center;
  width: var(--control-height-sm, 28px); height: var(--control-height-sm, 28px); padding: 0;
  border: 1px solid var(--c-border); border-radius: 50%;
  background: var(--c-surface); color: var(--c-text-secondary); cursor: pointer;
}
.apf-cap-btn:hover:not(:disabled) { border-color: var(--c-primary, #0060A2); color: var(--c-primary, #0060A2); }
.apf-cap-btn:disabled { cursor: not-allowed; opacity: .55; }
.apf-send-btn {
  flex: none; width: var(--control-height-md, 32px); height: var(--control-height-md, 32px); display: grid; place-items: center;
  padding: 0; border: 0; border-radius: 50%;
  background: var(--c-primary, #0060A2); color: #fff; cursor: pointer; font-size: var(--font-size-18, 18px); line-height: 1;
}
.apf-send-btn:hover:not(:disabled) { background: var(--c-primary-hover, #4581E9); }
.apf-send-btn:disabled { background: var(--c-border); cursor: not-allowed; }
.apf-composer-meta {
  display: flex; align-items: center; justify-content: space-between; gap: var(--spacing-12px, 12px);
  margin-top: var(--spacing-sm, 8px); padding: 0 2px;
}
.apf-cap-row { display: flex; flex-wrap: wrap; gap: var(--form-field-gap, 6px); min-width: 0; }
.apf-cap-chip {
  display: inline-flex; align-items: center; padding: 2px var(--spacing-sm, 8px);
  border-radius: var(--border-radius-full, 999px); border: 1px solid var(--c-border);
  background: var(--c-surface); color: var(--c-text-secondary); font-size: var(--font-size-11, 11px);
}
.apf-meta-right { display: flex; align-items: center; gap: var(--spacing-10px, 10px); flex: none; min-width: 0; }
.apf-ws-status {
  display: inline-flex; align-items: center; justify-content: center;
  width: var(--icon-size-lg, 20px); height: var(--icon-size-lg, 20px); padding: 0; border: 0; border-radius: 50%;
  background: transparent; cursor: pointer;
}
.apf-ws-dot { display: block; width: 8px; height: 8px; border-radius: 50%; background: #b7c2c1; }
.apf-ws-status.ok .apf-ws-dot { background: #2f9e8f; box-shadow: 0 0 0 3px rgba(47, 158, 143, .16); }
.apf-ws-status.pending .apf-ws-dot { background: #d4a017; animation: apf-ws-pulse 1.1s ease-in-out infinite; }
.apf-ws-status.streaming .apf-ws-dot { background: #5ecfc4; box-shadow: 0 0 0 3px rgba(94, 207, 196, .18); animation: apf-ws-pulse 0.9s ease-in-out infinite; }
.apf-ws-status.warn .apf-ws-dot { background: #d4a017; }
.apf-ws-status.err .apf-ws-dot { background: #c44; box-shadow: 0 0 0 3px rgba(204, 68, 68, .14); }
.apf-ws-status.idle .apf-ws-dot { background: #b7c2c1; }
@keyframes apf-ws-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: .45; transform: scale(.85); } }
.apf-hint { flex: none; color: var(--c-text-muted); font-size: var(--font-size-11, 11px); text-align: right; white-space: nowrap; }
@media (max-width: 600px) {
  .apf-composer-tools { gap: var(--spacing-xs, 4px); }
  textarea { min-height: var(--composer-textarea-min-height-mobile, 84px); padding: 14px 14px var(--spacing-sm, 8px); }
  .apf-composer-meta { flex-direction: column; align-items: flex-start; }
  .apf-meta-right { width: 100%; justify-content: space-between; }
  .apf-hint { display: none; }
}
</style>
