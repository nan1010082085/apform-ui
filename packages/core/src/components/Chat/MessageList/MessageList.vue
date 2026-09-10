<script setup lang="ts">
/**
 * MessageList — 消息列表壳
 *
 * 默认渲染 MessageBubble；业务可通过 #body 注入虚拟列表等自定义实现，#empty 注入空态。
 */
import { computed, nextTick, ref, useSlots, watch } from 'vue'
import type { Message, RunStatusView } from '../../../types'
import MessageBubble from '../MessageBubble/MessageBubble.vue'

const props = defineProps<{
  messages: Message[]
  loading: boolean
  currentRun: RunStatusView | null
  sending?: boolean
  /** 品牌标识组件（可选） */
  brandMark?: any
}>()

const emit = defineEmits<{
  (e: 'resume', action: string, payload?: string): void
  (e: 'cancel'): void
  (e: 'retry'): void
  (e: 'open-process', message: Message): void
  (e: 'preview', attachment: any): void
}>()

const slots = useSlots()
const container = ref<HTMLElement | null>(null)
const hasBodySlot = computed(() => Boolean(slots.body))
const showEmpty = computed(() => !props.loading && props.messages.length === 0 && Boolean(slots.empty))

/**
 * 滚动到底部（默认列表模式；#body 时可被业务忽略）
 */
async function scrollToBottom(): Promise<void> {
  await nextTick()
  if (container.value) container.value.scrollTop = container.value.scrollHeight
}

watch(() => props.messages.length, () => {
  if (!hasBodySlot.value) void scrollToBottom()
}, { flush: 'post' })

watch(
  () => props.messages.map((m) => `${m.id}:${m.status}:${(m.content || '').length}`).join('|'),
  () => {
    if (!hasBodySlot.value) void scrollToBottom()
  },
  { flush: 'post' },
)

/**
 * @param m - 消息
 */
function runForMessage(m: Message): RunStatusView | null {
  if (!props.currentRun || !m.runtimeExecutionId) return null
  return props.currentRun.runtimeExecutionId === m.runtimeExecutionId ? props.currentRun : null
}

defineExpose({ scrollToBottom, container })
</script>

<template>
  <div ref="container" class="apf-message-list">
    <div v-if="loading && !messages.length && !hasBodySlot" class="apf-skeleton-line">
      <div class="apf-skeleton" style="height: var(--icon-size-sm, 14px); width: 60%;"></div>
      <div class="apf-skeleton" style="height: var(--icon-size-sm, 14px); width: 45%; margin-top: var(--spacing-sm, 8px);"></div>
    </div>

    <slot v-else-if="showEmpty" name="empty" />

    <slot
      v-else
      name="body"
      :messages="messages"
      :scroll-to-bottom="scrollToBottom"
    >
      <MessageBubble
        v-for="m in messages"
        :key="m.id"
        :message="m"
        :run="runForMessage(m)"
        :sending="Boolean(sending)"
        :brand-mark="brandMark"
        :session-messages="messages"
        @resume="(a, p) => emit('resume', a, p)"
        @cancel="emit('cancel')"
        @retry="emit('retry')"
        @open-process="emit('open-process', m)"
        @preview="(att) => emit('preview', att)"
      />
    </slot>
  </div>
</template>

<style scoped>
.apf-message-list { flex: 1; overflow-y: auto; padding: var(--spacing-lg, 24px) var(--spacing-xl, 32px); background: transparent; min-height: 0; display: flex; flex-direction: column; }
.apf-skeleton-line { max-width: 960px; margin: 0 auto; padding: var(--spacing-md, 16px); background: var(--c-surface); border: 1px solid var(--c-border-soft); border-radius: var(--radius); }
.apf-skeleton { background: linear-gradient(90deg, var(--c-bg) 25%, var(--c-bg-soft, #f0f0f0) 50%, var(--c-bg) 75%); background-size: 200% 100%; animation: apf-skeleton-loading 1.5s ease infinite; border-radius: var(--border-radius-md, 4px); }
@keyframes apf-skeleton-loading { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
@media (max-width: 767px) { .apf-message-list { padding: var(--spacing-md, 16px); } }
</style>
