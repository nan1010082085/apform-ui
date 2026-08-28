<script setup lang="ts">
/**
 * DocumentPreviewDrawer — 文档预览抽屉（纯展示，无 API）
 *
 * 包装 el-drawer + DocumentPreviewPanel；数据与 URL 由父组件传入。
 */
import DocumentPreviewPanel from './DocumentPreviewPanel.vue'
import type { DocumentPreviewChunk } from './types'

withDefaults(
  defineProps<{
    /** 是否打开 */
    modelValue: boolean
    /** 文件名 */
    filename?: string
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
    /** 抽屉宽度 */
    sizeDrawer?: string | number
  }>(),
  {
    filename: '',
    chunks: () => [],
    hasOriginalFile: false,
    loading: false,
    error: null,
    sizeDrawer: '50%',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  download: []
  close: []
}>()

/** 关闭抽屉 */
function close() {
  emit('update:modelValue', false)
  emit('close')
}
</script>

<template>
  <el-drawer
    :model-value="modelValue"
    :title="filename || '文档预览'"
    :size="sizeDrawer"
    append-to-body
    @update:model-value="emit('update:modelValue', $event)"
    @close="close"
  >
    <DocumentPreviewPanel
      :filename="filename || '文档预览'"
      :mimetype="mimetype"
      :size="size"
      :chunks="chunks"
      :extraction-method="extractionMethod"
      :has-original-file="hasOriginalFile"
      :pdf-url="pdfUrl"
      :excel-url="excelUrl"
      :loading="loading"
      :error="error"
      @download="emit('download')"
      @close="close"
    >
      <template v-if="$slots.pdf" #pdf="slotProps">
        <slot name="pdf" v-bind="slotProps" />
      </template>
      <template v-if="$slots.excel" #excel="slotProps">
        <slot name="excel" v-bind="slotProps" />
      </template>
    </DocumentPreviewPanel>
  </el-drawer>
</template>
