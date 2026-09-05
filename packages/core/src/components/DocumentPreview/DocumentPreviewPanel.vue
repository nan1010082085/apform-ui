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
const showText = computed(() => !showPdf.value && !showExcel.value)
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
          <PdfPreviewCard :url="pdfUrl!" :title="filename" min-height="280px" />
        </slot>
      </div>
      <div v-else-if="showExcel" class="apf-doc-preview__viewer">
        <slot name="excel" :url="excelUrl">
          <ExcelPreviewCard :src="excelUrl" />
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
