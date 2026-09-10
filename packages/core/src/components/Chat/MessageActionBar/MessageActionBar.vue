<script setup lang="ts">
/**
 * MessageActionBar — 消息操作栏（复制 / 重生成 / 反馈）
 */
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    content?: string
    feedback?: 'positive' | 'negative' | null
    /** 父级 hover 时显示（带延迟） */
    visible?: boolean
    showCopy?: boolean
    showRegenerate?: boolean
    showFeedback?: boolean
  }>(),
  {
    showCopy: true,
    showRegenerate: true,
    showFeedback: true,
  },
)

const emit = defineEmits<{
  copy: []
  regenerate: []
  feedback: [type: 'positive' | 'negative']
}>()

const show = ref(false)
const currentFeedback = ref<'positive' | 'negative' | null>(props.feedback ?? null)
let hoverTimer: ReturnType<typeof setTimeout> | null = null

watch(
  () => props.feedback,
  (v) => {
    currentFeedback.value = v ?? null
  },
)

watch(
  () => props.visible,
  (hovered) => {
    if (hovered) {
      hoverTimer = setTimeout(() => {
        show.value = true
      }, 300)
      return
    }
    show.value = false
    if (hoverTimer) {
      clearTimeout(hoverTimer)
      hoverTimer = null
    }
  },
  { immediate: true },
)

function handleCopy(): void {
  if (props.content) navigator.clipboard?.writeText(props.content)
  emit('copy')
}

/**
 * @param type - 反馈类型
 */
function handleFeedback(type: 'positive' | 'negative'): void {
  currentFeedback.value = currentFeedback.value === type ? null : type
  emit('feedback', type)
}
</script>

<template>
  <div class="apf-msg-actions" :class="{ 'is-visible': show }">
    <button
      v-if="showCopy"
      type="button"
      class="apf-msg-actions__btn"
      title="复制"
      aria-label="复制"
      @click="handleCopy"
    >
      <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
        <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.4" />
        <path d="M3.5 10.5V3.5h7" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
      </svg>
    </button>
    <button
      v-if="showRegenerate"
      type="button"
      class="apf-msg-actions__btn"
      title="重新生成"
      aria-label="重新生成"
      @click="emit('regenerate')"
    >
      <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
        <path d="M3 8a5 5 0 0 1 8.5-3.5M13 3v3.5H9.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M13 8a5 5 0 0 1-8.5 3.5M3 13v-3.5H6.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <button
      v-if="showFeedback"
      type="button"
      class="apf-msg-actions__btn"
      :class="{ 'is-active': currentFeedback === 'positive' }"
      title="点赞"
      aria-label="点赞"
      @click="handleFeedback('positive')"
    >
      <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
        <path d="M8 2.5 9.6 6l3.9.3-3 2.7.9 3.8L8 10.8 4.6 12.8l.9-3.8-3-2.7L6.4 6 8 2.5Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" />
      </svg>
    </button>
    <button
      v-if="showFeedback"
      type="button"
      class="apf-msg-actions__btn apf-msg-actions__btn--down"
      :class="{ 'is-active': currentFeedback === 'negative' }"
      title="点踩"
      aria-label="点踩"
      @click="handleFeedback('negative')"
    >
      <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
        <path d="M8 2.5 9.6 6l3.9.3-3 2.7.9 3.8L8 10.8 4.6 12.8l.9-3.8-3-2.7L6.4 6 8 2.5Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.apf-msg-actions {
  display: flex;
  gap: 2px;
  margin-top: 8px;
  padding: 4px;
  background: var(--c-surface, #fff);
  border: 1px solid var(--c-border, #ebedf3);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  width: fit-content;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
}

.apf-msg-actions.is-visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.apf-msg-actions__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  color: var(--c-text-secondary, #666);
}

.apf-msg-actions__btn:hover {
  background: var(--c-bg-muted, #e5eff6);
  color: var(--c-primary, #0060a2);
}

.apf-msg-actions__btn.is-active {
  color: var(--c-primary, #0060a2);
  background: var(--c-primary-soft, #eef5ff);
}

.apf-msg-actions__btn--down {
  transform: scaleY(-1);
}
</style>
