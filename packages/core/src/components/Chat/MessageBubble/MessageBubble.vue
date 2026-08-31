<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Message, RunStatusView, WaitingPayload } from '../../../types'
import MessageParts from '../message/MessageParts.vue'
import MessageAttachmentList from '../message/MessageAttachmentList.vue'
import DocumentSummaryList from '../message/DocumentSummaryList.vue'

const props = defineProps<{
  message: Message
  run: RunStatusView | null
  sending: boolean
  /** 品牌标识组件（可选，如 AppMark） */
  brandMark?: any
}>()

const emit = defineEmits<{
  (e: 'resume', action: string, payload?: string): void
  (e: 'cancel'): void
  (e: 'retry'): void
  (e: 'open-process'): void
  (e: 'preview', attachment: any): void
}>()

const isUser = computed(() => props.message.role === 'user')
const isAssistant = computed(() => props.message.role === 'assistant')

function statusLabel(status: string): string {
  return {
    PENDING: '排队中', RUNNING: '正在处理', WAITING_INPUT: '等待你的确认',
    COMPLETED: '已完成', FAILED: '处理失败', CANCELLED: '已取消',
  }[status] || status
}

function statusClass(status: string): string {
  return {
    RUNNING: 'apf-chip-running', WAITING_INPUT: 'apf-chip-waiting',
    COMPLETED: 'apf-chip-success', FAILED: 'apf-chip-failed', CANCELLED: 'apf-chip-cancelled',
  }[status] || 'apf-chip-cancelled'
}

const DEFAULT_WAITING_ACTIONS = [
  { action: 'approve', label: '确认继续', style: 'primary' },
  { action: 'reject', label: '需要修改', style: 'danger' },
]

const waiting = computed<WaitingPayload | null>(() => {
  if (props.message.status !== 'WAITING_INPUT') return null
  const fromRun = props.run?.waiting
  if (fromRun) {
    const actions = fromRun.actions?.length ? fromRun.actions : DEFAULT_WAITING_ACTIONS
    return { prompt: fromRun.prompt || '请确认后继续。', fields: fromRun.fields || [], actions, dangerous: Boolean(fromRun.dangerous) }
  }
  return { prompt: '请确认后继续。', fields: [], actions: DEFAULT_WAITING_ACTIONS, dangerous: false }
})

const displayContent = computed(() => props.message.content || '')

const showTyping = computed(() =>
  isAssistant.value && props.message.status === 'RUNNING' && !displayContent.value && !props.message.attachments?.length,
)

const showBody = computed(() =>
  Boolean(displayContent.value) || Boolean(props.message.documentSummaries?.length) || Boolean(props.message.attachments?.length),
)

const bubbleTone = computed(() => {
  if (isUser.value) return 'apf-user'
  if (props.message.status === 'WAITING_INPUT') return 'apf-waiting'
  if (props.message.status === 'FAILED') return 'apf-failed'
  return ''
})

const inputValue = ref('')

function submit(action: string) {
  emit('resume', action, inputValue.value || undefined)
  inputValue.value = ''
}

function copyContent() {
  const text = displayContent.value || props.message.content
  if (text) navigator.clipboard?.writeText(text)
}

function downloadContent() {
  const text = displayContent.value || props.message.content
  if (!text) return
  const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'reply.md'
  a.click()
  URL.revokeObjectURL(url)
}

function toolStatus(tool: { error?: string; result?: unknown }): string {
  if (tool.error) return '失败'
  if (tool.result !== undefined) return '已完成'
  return '处理中'
}

const thinkingOpen = ref(false)
const thinkingUserToggled = ref(false)
const toolsOpen = ref(false)

const isThinkingStream = computed(() =>
  isAssistant.value && props.message.status === 'RUNNING' && Boolean(props.message.thinking),
)

watch(
  () => [props.message.status, Boolean(props.message.thinking?.trim())] as const,
  ([status, hasThinking]) => {
    if (!hasThinking) { thinkingOpen.value = false; thinkingUserToggled.value = false; return }
    if (status === 'RUNNING') { thinkingOpen.value = true; thinkingUserToggled.value = false; return }
    if (!thinkingUserToggled.value) thinkingOpen.value = false
  },
  { immediate: true },
)

function toggleThinking() { thinkingOpen.value = !thinkingOpen.value; thinkingUserToggled.value = true }
function toggleTools() { toolsOpen.value = !toolsOpen.value }
</script>

<template>
  <div class="apf-message" :class="[message.role, message.status && isAssistant ? `apf-st-${message.status}` : '']">
    <component v-if="isAssistant && brandMark" :is="brandMark" variant="ai" size="sm" />
    <div class="apf-bubble-wrap">
      <p v-if="isAssistant && message.tip" class="apf-tip">{{ message.tip }}</p>

      <!-- 正文 -->
      <div v-if="showTyping" class="apf-typing">
        <span class="apf-status-text">正在处理</span>
        <span class="apf-dots"><i /><i /><i /></span>
      </div>

      <div v-else-if="showBody" class="apf-result-wrap">
        <div class="apf-bubble apf-message-content" :class="bubbleTone">
          <MessageAttachmentList
            v-if="message.attachments?.length"
            :attachments="message.attachments"
            @preview="(att) => emit('preview', att)"
          />
          <MessageParts v-if="displayContent" :content="displayContent" />
          <DocumentSummaryList
            v-if="message.documentSummaries?.length"
            :summaries="message.documentSummaries"
            @preview="(att) => emit('preview', att)"
          />
          <p v-if="isAssistant && message.status === 'RUNNING' && displayContent" class="apf-inline-progress">仍在处理…</p>
        </div>

        <div v-if="isAssistant && message.status === 'COMPLETED'" class="apf-result-actions">
          <button class="apf-icon-btn" type="button" aria-label="复制" @click="copyContent">
            <svg viewBox="0 0 16 16" width="14" height="14"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M3.5 10.5V3.5h7" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
          </button>
          <button class="apf-icon-btn" type="button" aria-label="下载" @click="downloadContent">
            <svg viewBox="0 0 16 16" width="14" height="14"><path d="M8 2.5v7.2M5.2 7.5 8 10.3l2.8-2.8M3.5 13h9" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <button v-if="message.thinking || message.toolCalls?.length" class="apf-text-link" type="button" @click="emit('open-process')">处理信息</button>
        </div>

        <div v-if="isAssistant && message.status === 'FAILED'" class="apf-fail-actions">
          <button class="apf-icon-btn" type="button" aria-label="重试" @click="emit('retry')">
            <svg viewBox="0 0 16 16" width="14" height="14"><path d="M3.2 8a4.8 4.8 0 0 1 8.3-3.2" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M12.8 8a4.8 4.8 0 0 1-8.3 3.2" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M11.2 2.6v2.6h-2.6M4.8 13.4v-2.6h2.6" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
      </div>

      <div v-else-if="isAssistant && message.status === 'WAITING_INPUT' && !showBody" class="apf-bubble apf-waiting-hint">请在下方确认后继续。</div>
      <div v-else-if="isAssistant && message.status === 'FAILED' && !showBody" class="apf-bubble apf-failed-hint">处理失败</div>
      <div v-else-if="isAssistant && message.status === 'CANCELLED' && !showBody" class="apf-bubble apf-cancelled-hint">已取消</div>

      <!-- 思考过程 -->
      <div v-if="isAssistant && message.thinking?.trim()" class="apf-detail-block" :class="{ open: thinkingOpen, streaming: isThinkingStream }">
        <button type="button" class="apf-detail-summary" :aria-expanded="thinkingOpen" @click="toggleThinking">
          <span class="apf-chevron" /><span>思考过程</span>
          <span v-if="isThinkingStream" class="apf-live-dot" />
        </button>
        <div class="apf-detail-collapse">
          <div class="apf-detail-collapse-inner">
            <div class="apf-detail-content" :class="{ streaming: isThinkingStream }">{{ message.thinking }}</div>
          </div>
        </div>
      </div>

      <!-- 处理步骤 -->
      <div v-if="isAssistant && message.toolCalls?.length" class="apf-detail-block" :class="{ open: toolsOpen }">
        <button type="button" class="apf-detail-summary" :aria-expanded="toolsOpen" @click="toggleTools">
          <span class="apf-chevron" /><span>处理步骤（{{ message.toolCalls.length }}）</span>
        </button>
        <div class="apf-detail-collapse">
          <div class="apf-detail-collapse-inner">
            <div v-for="tool in message.toolCalls" :key="tool.id || tool.name" class="apf-tool-row">
              <strong>{{ tool.name }}</strong>
              <span :class="{ 'apf-err': Boolean(tool.error) }">{{ toolStatus(tool) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 状态芯片 -->
      <span v-if="isAssistant && message.status !== 'COMPLETED' && message.status !== 'CANCELLED'" class="apf-chip" :class="statusClass(message.status)">
        <i />{{ statusLabel(message.status) }}
      </span>
      <span v-else-if="isAssistant && message.status === 'COMPLETED'" class="apf-chip apf-chip-success"><i />已完成</span>

      <!-- 确认操作 -->
      <div v-if="waiting" class="apf-inline-approval" :class="{ 'apf-dangerous-approval': waiting.dangerous }">
        <div class="apf-approval-head">
          <span class="apf-approval-title">需要你的确认</span>
          <span v-if="waiting.dangerous" class="apf-approval-danger-tag">需谨慎</span>
        </div>
        <p class="apf-approval-prompt">{{ waiting.prompt }}</p>
        <div class="apf-approval-actions">
          <button v-for="a in waiting.actions" :key="a.action" type="button" class="apf-approval-btn" :class="a.style === 'danger' ? 'apf-approval-btn-danger' : 'apf-approval-btn-primary'" :disabled="sending" @click="submit(a.action)">{{ a.label }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.apf-message { display: flex; gap: var(--spacing-12px, 12px); max-width: 1040px; margin: 0 auto 22px; align-items: flex-start; }
.apf-message.user { justify-content: flex-end; }
.apf-bubble-wrap { display: flex; flex-direction: column; gap: var(--spacing-sm, 8px); max-width: 880px; min-width: 0; width: 100%; }
.apf-message.user .apf-bubble-wrap { align-items: flex-end; max-width: 720px; }
.apf-result-wrap { display: flex; flex-direction: column; align-items: stretch; width: fit-content; max-width: 100%; animation: apf-msg-in .28s ease both; }
.apf-message.user .apf-result-wrap { align-items: flex-end; }
@keyframes apf-msg-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
.apf-tip { margin: 0; padding: 0 2px; color: var(--c-text-muted); font-size: var(--font-size-12, 12px); }
.apf-bubble {
  margin: 0; padding: var(--spacing-12px, 12px) var(--spacing-md, 16px); width: fit-content; max-width: 100%;
  font-size: var(--font-size-14, 14px); line-height: 1.7; background: var(--c-surface);
  border: 1px solid var(--c-border); border-radius: 14px; word-break: break-word;
  box-shadow: 0 1px 2px rgba(20, 40, 40, .04);
}
.apf-bubble.apf-user { background: #e8f3f2; border-color: #cfe3e1; }
.apf-bubble.apf-waiting { border-color: #f0d9a8; background: linear-gradient(180deg, #fffdf8 0%, #fff 48%); }
.apf-bubble.apf-failed { border-color: #f0c4be; background: #fff8f7; }
.apf-message-content > :first-child { margin-top: 0; }
.apf-message-content > :last-child { margin-bottom: 0; }
.apf-inline-progress { margin: var(--spacing-10px, 10px) 0 0; font-size: var(--font-size-12, 12px); color: var(--c-running, #0060A2); }
.apf-detail-block {
  width: fit-content; max-width: 100%; color: var(--c-text-muted); font-size: var(--font-size-12, 12px);
  border: 1px solid var(--c-border-soft, var(--c-border)); border-radius: var(--border-radius-8, 8px);
  background: rgba(255, 255, 255, .55); padding: 0 var(--spacing-sm, 8px);
  transition: width .28s ease, background .22s ease, border-color .22s ease, box-shadow .22s ease;
}
.apf-detail-block.open { width: 100%; background: rgba(255, 255, 255, .72); }
.apf-detail-block.streaming { border-color: color-mix(in srgb, var(--c-running, #0060A2) 28%, var(--c-border)); box-shadow: 0 0 0 1px color-mix(in srgb, var(--c-running, #0060A2) 10%, transparent); }
.apf-detail-summary {
  display: inline-flex; align-items: center; gap: var(--form-field-gap, 6px); width: 100%;
  margin: 0; padding: 5px 2px; border: 0; background: transparent;
  color: inherit; font: inherit; font-weight: var(--font-weight-semibold, 600); cursor: pointer; text-align: left; border-radius: var(--border-radius-6, 6px);
}
.apf-detail-summary:hover { color: var(--c-text-secondary); }
.apf-chevron {
  display: inline-block; width: 0; height: 0; border-style: solid;
  border-width: 4px 0 4px 6px; border-color: transparent transparent transparent currentColor;
  opacity: .7; transition: transform .22s ease; flex: none;
}
.apf-detail-block.open .apf-chevron { transform: rotate(90deg); }
.apf-live-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--c-running, #0060A2); animation: apf-blink 1.4s infinite both; margin-left: 2px; }
.apf-detail-collapse { display: grid; grid-template-rows: 0fr; overflow: hidden; transition: grid-template-rows .3s ease; }
.apf-detail-block.open .apf-detail-collapse { grid-template-rows: 1fr; }
.apf-detail-collapse-inner { overflow: hidden; min-height: 0; }
.apf-detail-content {
  margin: 0; padding: 0; background: transparent; border-radius: var(--border-radius-8, 8px); white-space: pre-wrap;
  line-height: 1.55; color: var(--c-text-secondary); max-height: 14em; overflow: hidden;
  opacity: 0; transform: translateY(-4px);
  transition: opacity .22s ease, transform .22s ease, padding .22s ease, margin .22s ease, background-color .22s ease;
}
.apf-detail-block.open .apf-detail-content {
  margin: 0 0 var(--spacing-sm, 8px); padding: var(--spacing-sm, 8px) var(--spacing-10px, 10px); background: var(--c-bg);
  overflow-y: auto; opacity: 1; transform: none; transition-delay: .04s;
}
.apf-detail-block.open .apf-detail-content.streaming {
  max-height: 6.4em;
  mask-image: linear-gradient(180deg, transparent 0%, #000 22%, #000 100%);
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 22%, #000 100%);
}
.apf-tool-row { display: flex; justify-content: space-between; gap: var(--spacing-md, 16px); margin: 0 0 var(--spacing-sm, 8px); padding: 6px var(--spacing-sm, 8px); background: var(--c-bg); border-radius: var(--border-radius-8, 8px); }
.apf-err { color: var(--c-danger, #E50113); }
.apf-waiting-hint { color: var(--c-warning, #F09700); background: #fdf2df; border-color: #f0d9a8; }
.apf-failed-hint { color: var(--c-danger, #E50113); background: var(--c-danger-soft, #fff8f7); border-color: #f0c4be; }
.apf-cancelled-hint { color: var(--c-text-muted, #909399); background: #eef2f2; border-color: var(--c-border); }
.apf-typing { display: flex; align-items: center; gap: var(--spacing-10px, 10px); padding: var(--spacing-12px, 12px) 15px; background: var(--c-surface); border: 1px solid var(--c-border); border-radius: 14px; }
.apf-status-text { font-size: var(--font-size-13, 13px); color: var(--c-text-muted); }
.apf-dots { display: inline-flex; gap: var(--spacing-xs, 4px); }
.apf-dots i { width: 6px; height: 6px; background: var(--c-running, #0060A2); border-radius: 50%; animation: apf-blink 1.4s infinite both; }
.apf-dots i:nth-child(2) { animation-delay: .2s; }
.apf-dots i:nth-child(3) { animation-delay: .4s; }
@keyframes apf-blink { 0%, 80%, 100% { opacity: .3; } 40% { opacity: 1; } }
.apf-result-actions, .apf-fail-actions { display: flex; align-items: center; gap: var(--spacing-xs, 4px); margin-top: var(--spacing-xs, 4px); }
.apf-text-link { border: 0; background: transparent; color: var(--c-text-muted); font-size: var(--font-size-12, 12px); cursor: pointer; padding: var(--spacing-xs, 4px) 6px; border-radius: var(--border-radius-6, 6px); }
.apf-text-link:hover { color: var(--c-primary, #0060A2); background: var(--c-primary-soft, #e8f4ff); }
.apf-icon-btn { display: inline-grid; place-items: center; width: var(--control-height-sm, 28px); height: var(--control-height-sm, 28px); padding: 0; border: 0; border-radius: var(--border-radius-6, 6px); background: transparent; color: var(--c-text-muted); cursor: pointer; }
.apf-icon-btn:hover { color: var(--c-primary, #0060A2); background: var(--c-primary-soft, #e8f4ff); }
.apf-inline-approval { margin-top: var(--spacing-xs, 4px); padding: 14px; width: min(100%, 520px); background: var(--c-surface); border: 1px solid var(--c-border); border-left: 3px solid var(--c-warning, #F09700); border-radius: var(--radius); box-shadow: 0 4px 14px rgba(40, 30, 10, .04); }
.apf-inline-approval.apf-dangerous-approval { border-left-color: var(--c-danger, #E50113); background: var(--c-danger-soft, #fff8f7); }
.apf-approval-head { display: flex; align-items: center; gap: var(--spacing-sm, 8px); margin-bottom: var(--form-field-gap, 6px); }
.apf-approval-title { font-weight: var(--font-weight-bold, 700); font-size: var(--font-size-13, 13px); }
.apf-approval-danger-tag { font-size: var(--font-size-10, 10px); font-weight: var(--font-weight-bold, 700); color: #fff; background: var(--c-danger, #E50113); padding: 1px 6px; border-radius: 3px; }
.apf-approval-prompt { margin: 0 0 var(--spacing-10px, 10px); font-size: var(--font-size-13, 13px); line-height: 1.55; color: var(--c-text-secondary); }
.apf-approval-actions { display: flex; gap: var(--spacing-sm, 8px); justify-content: flex-end; flex-wrap: wrap; }
.apf-approval-btn { padding: 6px var(--spacing-md, 16px); border-radius: var(--radius); font-size: var(--font-size-13, 13px); cursor: pointer; border: 1px solid transparent; }
.apf-approval-btn-primary { background: var(--c-primary, #0060A2); color: #fff; }
.apf-approval-btn-primary:hover { background: var(--c-primary-hover, #4581E9); }
.apf-approval-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
.apf-approval-btn-danger { background: var(--c-danger, #E50113); color: #fff; }
.apf-approval-btn-danger:hover { opacity: 0.9; }
.apf-approval-btn-danger:disabled { opacity: 0.5; cursor: not-allowed; }
.apf-chip {
  display: inline-flex; align-items: center; gap: var(--form-field-gap, 6px); width: fit-content;
  padding: 3px var(--spacing-sm, 8px); border-radius: var(--border-radius-full, 999px); font-size: var(--font-size-11, 11px); font-weight: var(--font-weight-semibold, 600);
  background: #eef2f2; color: var(--c-text-secondary); animation: apf-chip-in .24s ease both;
}
.apf-chip i { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.apf-chip-running { color: var(--c-running, #0060A2); background: #e8f4ff; }
.apf-chip-waiting { color: var(--c-warning, #F09700); background: #fdf2df; }
.apf-chip-success { color: var(--c-primary, #0060A2); background: var(--c-primary-soft, #e8f4ff); }
.apf-chip-failed { color: var(--c-danger, #E50113); background: var(--c-danger-soft, #fff8f7); }
.apf-chip-cancelled { color: var(--c-text-muted, #909399); }
@keyframes apf-chip-in { from { opacity: 0; transform: translateY(3px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .apf-result-wrap, .apf-chip, .apf-live-dot, .apf-dots i { animation: none; }
  .apf-detail-block, .apf-detail-collapse, .apf-detail-content, .apf-chevron { transition: none; }
}
</style>