<script setup lang="ts">
/**
 * DocumentPreviewPanel — 文档预览面板（纯展示，无 API）
 *
 * PDF / Excel 默认接入 PdfPreviewCard / ExcelPreviewCard（optional peer 增强）；
 * 下载由父组件监听 download 事件处理。
 */
import { computed } from 'vue'
import { formatSize } from '../../utils/attachmentKind'
import type { DocumentPreviewChunk } from './types'
import PdfPreviewCard from '../PdfPreviewCard/PdfPreviewCard.vue'
import ExcelPreviewCard from '../ExcelPreviewCard/ExcelPreviewCard.vue'

const props = withDefaults(
  defineProps<{
    /** 文件名 */
    filename: string
    /** MIME 类型 */
    mimetype?: string
    /** 文件大小（字节） */
    size?: number
    /** 文本分块 */
    chunks?: DocumentPreviewChunk[]
    /** 抽取方法 */
    extractionMethod?: string
    /** 是否有原文件可下载 */
    hasOriginalFile?: boolean
    /** PDF 预览 URL */
    pdfUrl?: string
    /** Excel 预览 URL */
    excelUrl?: string
    /**
     * 图片 / 视频可直接预览的 blob 或公开 URL（由宿主鉴权解析后传入）
     */
    mediaUrl?: string
    /** 透传给 PdfPreviewCard 的鉴权 headers */
    pdfHttpHeaders?: Record<string, string>
    /** 透传给 ExcelPreviewCard 的 fetch headers */
    excelFetchHeaders?: Record<string, string>
    /** 加载中 */
    loading?: boolean
    /** 错误信息 */
    error?: string | null
  }>(),
  {
    chunks: () => [],
    hasOriginalFile: false,
    loading: false,
    error: null,
  },
)

const emit = defineEmits<{
  download: []
  close: []
}>()

const isPdf = computed(() => {
  const mime = (props.mimetype || '').toLowerCase()
  const name = props.filename.toLowerCase()
  return mime.includes('pdf') || name.endsWith('.pdf') || Boolean(props.pdfUrl)
})

const isExcel = computed(() => {
  const mime = (props.mimetype || '').toLowerCase()
  const name = props.filename.toLowerCase()
  return (
    Boolean(props.excelUrl) ||
    mime.includes('sheet') ||
    mime.includes('excel') ||
    name.endsWith('.xls') ||
    name.endsWith('.xlsx')
  )
})

const isImage = computed(() => {
  const mime = (props.mimetype || '').toLowerCase()
  const name = props.filename.toLowerCase()
  return (
    mime.startsWith('image/') ||
    /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(name)
  )
})

const isVideo = computed(() => {
  const mime = (props.mimetype || '').toLowerCase()
  const name = props.filename.toLowerCase()
  return (
    mime.startsWith('video/') ||
    /\.(mp4|webm|mov|m4v)$/i.test(name)
  )
})

const metaText = computed(() => {
  const parts: string[] = []
  if (props.mimetype) parts.push(props.mimetype)
  if (props.size != null) parts.push(formatSize(props.size) || `${props.size} bytes`)
  if (props.chunks?.length) parts.push(`${props.chunks.length} 块`)
  if (props.extractionMethod) parts.push(props.extractionMethod)
  return parts.join(' · ')
})

const plainText = computed(() => {
  if (!props.chunks?.length) return ''
  return props.chunks
    .map((c, i) => {
      const label = c.index != null ? `[${c.index}]` : `[${i + 1}]`
      return `${label}\n${c.text}`
    })
    .join('\n\n')
})

const showPdf = computed(() => Boolean(props.pdfUrl) && isPdf.value)
const showExcel = computed(() => Boolean(props.excelUrl) && isExcel.value && !showPdf.value)
const showMedia = computed(
  () => Boolean(props.mediaUrl) && (isImage.value || isVideo.value) && !showPdf.value && !showExcel.value,
)
const showText = computed(() => !showPdf.value && !showExcel.value && !showMedia.value)
</script>

<template>
  <div class="apf-doc-preview">
    <div v-if="loading" class="apf-doc-preview__loading">加载中...</div>
    <div v-else-if="error" class="apf-doc-preview__error">{{ error }}</div>
    <template v-else>
      <div v-if="metaText" class="apf-doc-preview__meta">{{ metaText }}</div>
      <div v-if="hasOriginalFile" class="apf-doc-preview__actions">
        <el-button size="small" type="primary" plain @click="emit('download')">
          下载原文件
        </el-button>
      </div>

      <div v-if="showPdf" class="apf-doc-preview__viewer">
        <slot name="pdf" :url="pdfUrl">
          <PdfPreviewCard
            :url="pdfUrl!"
            :title="filename"
            :http-headers="pdfHttpHeaders"
            min-height="280px"
          />
        </slot>
      </div>
      <div v-else-if="showExcel" class="apf-doc-preview__viewer">
        <slot name="excel" :url="excelUrl">
          <ExcelPreviewCard :src="excelUrl" :fetch-headers="excelFetchHeaders" />
        </slot>
      </div>
      <div v-else-if="showMedia" class="apf-doc-preview__viewer apf-doc-preview__media">
        <slot name="media" :url="mediaUrl" :mimetype="mimetype">
          <video
            v-if="isVideo"
            class="apf-doc-preview__video"
            :src="mediaUrl!"
            controls
            playsinline
          />
          <img
            v-else
            class="apf-doc-preview__image"
            :src="mediaUrl!"
            :alt="filename"
          />
        </slot>
      </div>
      <el-scrollbar v-else-if="showText" class="apf-doc-preview__scroll">
        <pre class="apf-doc-preview__text">{{ plainText || '暂无预览内容' }}</pre>
      </el-scrollbar>
    </template>
  </div>
</template>

<style scoped>
.apf-doc-preview {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 200px;
}

.apf-doc-preview__loading,
.apf-doc-preview__error {
  padding: var(--spacing-xl, 24px);
  text-align: center;
  color: var(--text-color-secondary, #909399);
}

.apf-doc-preview__error {
  color: var(--color-danger, #e50113);
}

.apf-doc-preview__meta {
  font-size: var(--font-size-12, 12px);
  color: var(--text-color-secondary, #909399);
  margin-bottom: var(--spacing-12px, 12px);
}

.apf-doc-preview__actions {
  margin-bottom: var(--spacing-12px, 12px);
}

.apf-doc-preview__viewer {
  flex: 1;
  min-height: 280px;
}

.apf-doc-preview__media {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--apf-bg-page, var(--el-bg-color-page, #f5f7fa));
  border-radius: 8px;
  overflow: auto;
}

.apf-doc-preview__image {
  max-width: 100%;
  max-height: min(70vh, 720px);
  object-fit: contain;
}

.apf-doc-preview__video {
  width: 100%;
  max-height: min(70vh, 720px);
  background: #000;
}

.apf-doc-preview__scroll {
  flex: 1;
}

.apf-doc-preview__text {
  margin: 0;
  font-size: var(--font-size-13, 13px);
  line-height: 1.7;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: inherit;
  color: var(--text-color-primary, #303133);
}
</style>
