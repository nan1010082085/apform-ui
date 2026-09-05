<script setup lang="ts">
/**
 * PdfPreviewCard — PDF 预览卡片
 *
 * 安装 optional peer `pdfjs-dist` 时启用 canvas 翻页/缩放；
 * 否则回退 iframe / 默认 slot。
 */
import { computed, onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { tryLoadPdfjs, type PdfjsModule } from '../../utils/optionalPeers'

const props = withDefaults(
  defineProps<{
    /** PDF 可访问 URL */
    url: string
    /** iframe / canvas title */
    title?: string
    /** 外部加载态（iframe 模式） */
    loading?: boolean
    /** 外部错误（iframe 模式） */
    error?: string | null
    /** 预览区最小高度 */
    minHeight?: string
    /** 强制禁用 pdfjs，仅用 iframe */
    forceIframe?: boolean
  }>(),
  {
    title: 'PDF 预览',
    loading: false,
    error: null,
    minHeight: '320px',
    forceIframe: false,
  },
)

const SCALE_MIN = 0.5
const SCALE_MAX = 3
const SCALE_STEP = 0.2

const richReady = ref(false)
const internalLoading = ref(false)
const internalError = ref<string | null>(null)
const currentPage = ref(1)
const totalPages = ref(0)
const scale = ref(1.2)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const pdfjsRef = shallowRef<PdfjsModule | null>(null)
const pdfDoc = shallowRef<any>(null)

const showRich = computed(() => richReady.value && !props.forceIframe)
const displayLoading = computed(() =>
  showRich.value ? internalLoading.value : props.loading,
)
const displayError = computed(() =>
  showRich.value ? internalError.value : props.error,
)

/**
 * 渲染指定页
 * @param pageNum 页码（1-based）
 */
async function renderPage(pageNum: number): Promise<void> {
  if (!pdfDoc.value || !canvasRef.value) return
  internalLoading.value = true
  internalError.value = null
  try {
    const page = await pdfDoc.value.getPage(pageNum)
    const viewport = page.getViewport({ scale: scale.value })
    const canvas = canvasRef.value
    const context = canvas.getContext('2d')
    if (!context) throw new Error('Canvas 不可用')
    const dpr = window.devicePixelRatio || 1
    canvas.width = viewport.width * dpr
    canvas.height = viewport.height * dpr
    canvas.style.width = `${viewport.width}px`
    canvas.style.height = `${viewport.height}px`
    context.setTransform(dpr, 0, 0, dpr, 0, 0)
    const task = page.render({
      canvasContext: context,
      viewport,
      canvas,
    })
    await task.promise
    currentPage.value = pageNum
  } catch (err) {
    internalError.value = err instanceof Error ? err.message : '页面渲染失败'
  } finally {
    internalLoading.value = false
  }
}

/** 加载 PDF 文档 */
async function loadDocument(): Promise<void> {
  if (!props.url || !pdfjsRef.value) return
  internalLoading.value = true
  internalError.value = null
  pdfDoc.value?.cleanup()
  pdfDoc.value = null
  currentPage.value = 1
  scale.value = 1.2
  try {
    const doc = await pdfjsRef.value.getDocument({ url: props.url }).promise
    pdfDoc.value = doc
    totalPages.value = doc.numPages
    await renderPage(1)
  } catch (err) {
    internalError.value = err instanceof Error ? err.message : 'PDF 加载失败'
  } finally {
    internalLoading.value = false
  }
}

function prevPage() {
  if (currentPage.value > 1) void renderPage(currentPage.value - 1)
}
function nextPage() {
  if (currentPage.value < totalPages.value) void renderPage(currentPage.value + 1)
}
function zoomIn() {
  if (scale.value >= SCALE_MAX) return
  scale.value = Math.min(SCALE_MAX, +(scale.value + SCALE_STEP).toFixed(1))
  void renderPage(currentPage.value)
}
function zoomOut() {
  if (scale.value <= SCALE_MIN) return
  scale.value = Math.max(SCALE_MIN, +(scale.value - SCALE_STEP).toFixed(1))
  void renderPage(currentPage.value)
}
function resetZoom() {
  scale.value = 1.2
  void renderPage(currentPage.value)
}

watch(
  () => [props.url, props.forceIframe] as const,
  async ([url, forceIframe]) => {
    if (forceIframe || !url) {
      richReady.value = false
      return
    }
    const pdfjs = await tryLoadPdfjs()
    pdfjsRef.value = pdfjs
    richReady.value = Boolean(pdfjs)
    if (pdfjs) await loadDocument()
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  pdfDoc.value?.cleanup()
  pdfDoc.value = null
})
</script>

<template>
  <div class="apf-pdf-preview">
    <template v-if="showRich">
      <div class="apf-pdf-preview__toolbar">
        <div class="apf-pdf-preview__nav">
          <button type="button" :disabled="currentPage <= 1 || displayLoading" @click="prevPage">上一页</button>
          <span>{{ currentPage }} / {{ totalPages || '—' }}</span>
          <button type="button" :disabled="currentPage >= totalPages || displayLoading" @click="nextPage">下一页</button>
        </div>
        <div class="apf-pdf-preview__zoom">
          <button type="button" :disabled="displayLoading" @click="zoomOut">−</button>
          <button type="button" :disabled="displayLoading" @click="resetZoom">{{ Math.round(scale * 100) }}%</button>
          <button type="button" :disabled="displayLoading" @click="zoomIn">+</button>
        </div>
      </div>
      <div v-if="displayLoading" class="apf-pdf-preview__state">加载中...</div>
      <div v-else-if="displayError" class="apf-pdf-preview__state apf-pdf-preview__state--error">{{ displayError }}</div>
      <div v-else class="apf-pdf-preview__canvas-wrap" :style="{ minHeight }">
        <canvas ref="canvasRef" :aria-label="title" />
      </div>
    </template>
    <template v-else>
      <div v-if="displayLoading" class="apf-pdf-preview__state">加载中...</div>
      <div v-else-if="displayError" class="apf-pdf-preview__state apf-pdf-preview__state--error">{{ displayError }}</div>
      <slot v-else-if="url" name="default" :url="url">
        <iframe
          class="apf-pdf-preview__frame"
          :src="url"
          :title="title"
          :style="{ minHeight }"
        />
      </slot>
      <div v-else class="apf-pdf-preview__state">未提供 PDF URL</div>
    </template>
  </div>
</template>

<style scoped>
.apf-pdf-preview {
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid var(--border-color, #e4e7ed);
  border-radius: var(--border-radius-8, 8px);
  overflow: hidden;
  background: var(--bg-color-white, #fff);
}
.apf-pdf-preview__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--border-color-light, #ebeef5);
  background: var(--bg-color-gray-light, #fafafa);
  font-size: 12px;
}
.apf-pdf-preview__nav,
.apf-pdf-preview__zoom {
  display: flex;
  align-items: center;
  gap: 6px;
}
.apf-pdf-preview__toolbar button {
  border: 1px solid var(--border-color, #e4e7ed);
  background: #fff;
  border-radius: 6px;
  padding: 2px 8px;
  cursor: pointer;
}
.apf-pdf-preview__toolbar button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.apf-pdf-preview__canvas-wrap {
  overflow: auto;
  display: grid;
  place-items: start center;
  padding: 12px;
  background: #525659;
}
.apf-pdf-preview__frame {
  width: 100%;
  border: none;
  background: #fff;
}
.apf-pdf-preview__state {
  padding: 24px;
  text-align: center;
  color: var(--text-color-secondary, #909399);
  font-size: 13px;
}
.apf-pdf-preview__state--error {
  color: var(--color-danger, #e50113);
}
</style>
