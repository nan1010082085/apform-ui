<script setup lang="ts">
/**
 * PdfPreviewCard — PDF 预览卡片（iframe 展示，无 pdfjs 依赖）
 *
 * 复杂解析场景请使用默认 slot 注入自定义渲染器。
 */
withDefaults(
  defineProps<{
    /** PDF 可访问 URL */
    url: string
    /** iframe title */
    title?: string
    /** 加载中 */
    loading?: boolean
    /** 错误信息 */
    error?: string | null
    /** 预览区最小高度 */
    minHeight?: string
  }>(),
  {
    title: 'PDF 预览',
    loading: false,
    error: null,
    minHeight: '320px',
  },
)
</script>

<template>
  <div class="apf-pdf-preview">
    <div v-if="loading" class="apf-pdf-preview__state">加载中...</div>
    <div v-else-if="error" class="apf-pdf-preview__state apf-pdf-preview__state--error">{{ error }}</div>
    <slot v-else-if="url" name="default" :url="url">
      <iframe
        class="apf-pdf-preview__frame"
        :src="url"
        :title="title"
        :style="{ minHeight }"
      />
    </slot>
    <div v-else class="apf-pdf-preview__state">未提供 PDF URL</div>
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

.apf-pdf-preview__frame {
  width: 100%;
  border: none;
  background: var(--bg-color-white, #fff);
}

.apf-pdf-preview__state {
  padding: var(--spacing-xl, 24px);
  text-align: center;
  color: var(--text-color-secondary, #909399);
  font-size: var(--font-size-13, 13px);
}

.apf-pdf-preview__state--error {
  color: var(--color-danger, #e50113);
}
</style>
