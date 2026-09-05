<script setup lang="ts">
/**
 * AttachmentPreviewModal — 附件预览弹层（图片缩放 / PDF / 降级下载）
 *
 * 数据经 props 注入；预览 URL 使用 attachment.url，禁止依赖业务 API。
 */
import { computed, onUnmounted, ref, watch } from 'vue'
import type { MessageAttachment } from '../../../types'
import { isImage, isPdf, fileKind, formatSize } from '../../../utils/attachmentKind'
import PdfPreviewCard from '../../PdfPreviewCard/PdfPreviewCard.vue'

const props = defineProps<{
  /** 是否显示预览弹层 */
  modelValue: boolean
  /** 当前预览的附件 */
  attachment: MessageAttachment | null
  /** 图片 gallery（仅图片时左右切换） */
  gallery?: MessageAttachment[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'update:attachment': [value: MessageAttachment]
}>()

const SCALE_MIN = 0.5
const SCALE_MAX = 3
const SCALE_STEP = 0.25

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

/** 附件可访问 URL */
function contentUrl(att: MessageAttachment): string {
  return att.url || ''
}

const isCurrentImage = computed(() => (props.attachment ? isImage(props.attachment) : false))
const isCurrentPdf = computed(() => (props.attachment ? isPdf(props.attachment) : false))

const imageGallery = computed(() => {
  const source = props.gallery?.length
    ? props.gallery
    : props.attachment
      ? [props.attachment]
      : []
  return source.filter(isImage)
})

const imageIndex = computed(() => {
  if (!imageGallery.value.length || !props.attachment) return -1
  return imageGallery.value.findIndex((a) => a.id === props.attachment?.id)
})

const hasPrev = computed(() => imageIndex.value > 0)
const hasNext = computed(
  () => imageIndex.value >= 0 && imageIndex.value < imageGallery.value.length - 1,
)

const imageScale = ref(1)

const panelRef = ref<HTMLElement | null>(null)
const closeBtnRef = ref<HTMLElement | null>(null)
const triggerElement = ref<HTMLElement | null>(null)

/** 关闭预览 */
function close() {
  isOpen.value = false
}

/** 上一张图片 */
function goPrev() {
  if (!hasPrev.value) return
  const prev = imageGallery.value[imageIndex.value - 1]
  if (prev) emit('update:attachment', prev)
}

/** 下一张图片 */
function goNext() {
  if (!hasNext.value) return
  const next = imageGallery.value[imageIndex.value + 1]
  if (next) emit('update:attachment', next)
}

function zoomIn() {
  imageScale.value = Math.min(SCALE_MAX, +(imageScale.value + SCALE_STEP).toFixed(2))
}
function zoomOut() {
  imageScale.value = Math.max(SCALE_MIN, +(imageScale.value - SCALE_STEP).toFixed(2))
}
function resetZoom() {
  imageScale.value = 1
}

/**
 * 真正触发浏览器下载（blob 回退）
 * @param att 附件
 */
async function downloadAttachment(att: MessageAttachment) {
  const url = contentUrl(att)
  if (!url) return
  try {
    const resp = await fetch(url)
    const blob = await resp.blob()
    const objectUrl = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = objectUrl
    a.download = att.filename || 'download'
    a.rel = 'noopener'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(objectUrl)
  } catch {
    const a = document.createElement('a')
    a.href = url
    a.download = att.filename || 'download'
    a.target = '_blank'
    a.rel = 'noopener'
    document.body.appendChild(a)
    a.click()
    a.remove()
  }
}

/** 键盘：Esc / 左右 / Tab 陷阱 */
function onKeydown(e: KeyboardEvent) {
  if (!isOpen.value) return
  if (e.key === 'Escape') {
    e.preventDefault()
    close()
    return
  }
  if (e.key === 'ArrowLeft' && hasPrev.value) {
    e.preventDefault()
    goPrev()
    return
  }
  if (e.key === 'ArrowRight' && hasNext.value) {
    e.preventDefault()
    goNext()
    return
  }
  if (e.key === '+' || e.key === '=') {
    if (isCurrentImage.value) {
      e.preventDefault()
      zoomIn()
    }
    return
  }
  if (e.key === '-') {
    if (isCurrentImage.value) {
      e.preventDefault()
      zoomOut()
    }
    return
  }
  if (e.key === '0' && isCurrentImage.value) {
    e.preventDefault()
    resetZoom()
    return
  }
  if (e.key === 'Tab' && panelRef.value) {
    const focusable = panelRef.value.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

watch(isOpen, (val) => {
  if (val) {
    triggerElement.value = document.activeElement as HTMLElement
    requestAnimationFrame(() => closeBtnRef.value?.focus())
    document.addEventListener('keydown', onKeydown)
  } else {
    document.removeEventListener('keydown', onKeydown)
    imageScale.value = 1
    if (triggerElement.value) {
      triggerElement.value.focus()
      triggerElement.value = null
    }
  }
}, { immediate: true })

watch(
  () => props.attachment?.id,
  () => {
    imageScale.value = 1
  },
)

onUnmounted(() => document.removeEventListener('keydown', onKeydown))

function onMaskClick(e: MouseEvent) {
  if (e.target === e.currentTarget) close()
}

function onPanelClick(e: MouseEvent) {
  e.stopPropagation()
}

function onWheel(e: WheelEvent) {
  if (!isCurrentImage.value) return
  e.preventDefault()
  if (e.deltaY < 0) zoomIn()
  else zoomOut()
}
</script>

<template>
  <teleport to="body">
    <div
      v-if="isOpen && attachment"
      class="apf-preview-mask"
      role="dialog"
      aria-modal="true"
      :aria-label="`预览 ${attachment.filename}`"
      @click="onMaskClick"
    >
      <div
        ref="panelRef"
        class="apf-preview-panel"
        :class="{
          'apf-preview-image': isCurrentImage,
          'apf-preview-pdf': isCurrentPdf,
          'apf-preview-degraded': !isCurrentImage && !isCurrentPdf,
        }"
        @click="onPanelClick"
      >
        <header class="apf-preview-head">
          <strong class="apf-preview-title">{{ attachment.filename }}</strong>
          <div class="apf-preview-actions">
            <template v-if="isCurrentImage">
              <button type="button" class="apf-preview-action-btn" aria-label="缩小" @click="zoomOut">−</button>
              <button type="button" class="apf-preview-action-btn" aria-label="重置缩放" @click="resetZoom">
                {{ Math.round(imageScale * 100) }}%
              </button>
              <button type="button" class="apf-preview-action-btn" aria-label="放大" @click="zoomIn">+</button>
            </template>
            <a
              v-if="contentUrl(attachment)"
              :href="contentUrl(attachment)"
              target="_blank"
              rel="noopener"
              class="apf-preview-action-btn"
            >
              {{ isCurrentPdf ? '新窗口打开' : isCurrentImage ? '打开原图' : '打开原文件' }}
            </a>
            <button
              v-if="contentUrl(attachment)"
              type="button"
              class="apf-preview-action-btn"
              @click="downloadAttachment(attachment)"
            >
              下载
            </button>
            <button
              ref="closeBtnRef"
              type="button"
              class="apf-preview-action-btn"
              aria-label="关闭预览"
              @click="close"
            >
              关闭
            </button>
          </div>
        </header>

        <div
          v-if="isCurrentImage"
          class="apf-preview-body apf-preview-body-image"
          @wheel.prevent="onWheel"
        >
          <button
            v-if="hasPrev"
            type="button"
            class="apf-gallery-btn apf-gallery-prev"
            aria-label="上一张图片"
            @click="goPrev"
          >
            ‹
          </button>
          <img
            v-if="contentUrl(attachment)"
            :src="contentUrl(attachment)"
            :alt="attachment.filename"
            class="apf-preview-img"
            :style="{ transform: `scale(${imageScale})` }"
          />
          <button
            v-if="hasNext"
            type="button"
            class="apf-gallery-btn apf-gallery-next"
            aria-label="下一张图片"
            @click="goNext"
          >
            ›
          </button>
          <div v-if="imageGallery.length > 1" class="apf-gallery-counter">
            {{ imageIndex + 1 }} / {{ imageGallery.length }}
          </div>
        </div>

        <div v-else-if="isCurrentPdf" class="apf-preview-body apf-preview-body-pdf">
          <PdfPreviewCard
            v-if="contentUrl(attachment)"
            :url="contentUrl(attachment)"
            :title="attachment.filename"
            min-height="70vh"
          />
        </div>

        <div v-else class="apf-preview-body apf-preview-body-degraded">
          <div class="apf-degraded-content">
            <span class="apf-degraded-badge">{{ fileKind(attachment) }}</span>
            <strong class="apf-degraded-filename">{{ attachment.filename }}</strong>
            <p v-if="attachment.size" class="apf-degraded-size">{{ formatSize(attachment.size) }}</p>
            <p class="apf-degraded-hint">此格式暂不支持应用内预览</p>
            <div class="apf-degraded-actions">
              <a
                v-if="contentUrl(attachment)"
                :href="contentUrl(attachment)"
                target="_blank"
                rel="noopener"
                class="apf-preview-action-btn apf-preview-action-primary"
              >
                打开原文件
              </a>
              <button
                v-if="contentUrl(attachment)"
                type="button"
                class="apf-preview-action-btn apf-preview-action-primary"
                @click="downloadAttachment(attachment)"
              >
                下载
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.apf-preview-mask {
  position: fixed;
  inset: 0;
  z-index: 4000;
  display: grid;
  place-items: center;
  padding: var(--spacing-lg, 24px);
  background: rgba(16, 24, 32, 0.55);
}
.apf-preview-panel {
  width: min(920px, 100%);
  max-height: 90vh;
  overflow: auto;
  border-radius: var(--border-radius-xl, 12px);
  background: #111;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.35);
}
.apf-preview-panel.apf-preview-pdf {
  width: min(1040px, 100%);
  height: min(90vh, 860px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.apf-preview-panel.apf-preview-degraded {
  width: min(480px, 100%);
}
.apf-preview-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-12px, 12px);
  padding: var(--spacing-12px, 12px) 14px;
  color: #fff;
  background: #1b232b;
  border-radius: var(--border-radius-xl, 12px) var(--border-radius-xl, 12px) 0 0;
}
.apf-preview-title {
  font-size: var(--font-size-13, 13px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}
.apf-preview-actions {
  display: flex;
  gap: var(--spacing-sm, 8px);
  flex: none;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.apf-preview-action-btn {
  border: 0;
  border-radius: var(--border-radius-6, 6px);
  padding: var(--spacing-10px, 10px) 14px;
  min-height: var(--control-height-xl, 44px);
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: var(--font-size-12, 12px);
  text-decoration: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}
.apf-preview-action-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}
.apf-preview-action-primary {
  background: var(--c-primary, #0d6b67);
}
.apf-preview-body-image {
  display: grid;
  place-items: center;
  min-height: 200px;
  max-height: calc(90vh - 52px);
  overflow: hidden;
  background: #000;
  position: relative;
}
.apf-preview-img {
  display: block;
  width: 100%;
  max-height: calc(90vh - 52px);
  object-fit: contain;
  transform-origin: center center;
  transition: transform 0.12s ease;
}
.apf-gallery-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: var(--control-height-lg, 40px);
  height: var(--control-height-lg, 40px);
  border: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: var(--font-size-24, 24px);
  cursor: pointer;
  z-index: 10;
}
.apf-gallery-prev {
  left: var(--spacing-12px, 12px);
}
.apf-gallery-next {
  right: var(--spacing-12px, 12px);
}
.apf-gallery-counter {
  position: absolute;
  bottom: var(--spacing-12px, 12px);
  left: 50%;
  transform: translateX(-50%);
  padding: var(--spacing-xs, 4px) var(--spacing-12px, 12px);
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: var(--font-size-12, 12px);
  border-radius: var(--border-radius-full, 999px);
}
.apf-preview-body-pdf {
  flex: 1;
  display: flex;
  overflow: hidden;
  background: #fff;
}
.apf-preview-body-pdf :deep(.apf-pdf-preview) {
  border: 0;
  border-radius: 0;
  flex: 1;
}
.apf-preview-body-degraded {
  padding: var(--spacing-lg, 24px);
  background: #1b232b;
  border-radius: 0 0 var(--border-radius-xl, 12px) var(--border-radius-xl, 12px);
}
.apf-degraded-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-12px, 12px);
  text-align: center;
  color: #fff;
}
.apf-degraded-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}
.apf-degraded-badge {
  padding: 0 var(--spacing-sm, 8px);
  height: var(--control-height-xs, 24px);
  display: grid;
  place-items: center;
  border-radius: var(--border-radius-6, 6px);
  background: rgba(255, 255, 255, 0.15);
  font-size: var(--font-size-11, 11px);
  font-weight: var(--font-weight-bold, 700);
}
.apf-degraded-filename {
  font-size: var(--font-size-14, 14px);
  word-break: break-all;
}
.apf-degraded-size,
.apf-degraded-hint {
  margin: 0;
  color: rgba(255, 255, 255, 0.55);
  font-size: var(--font-size-12, 12px);
}
</style>
