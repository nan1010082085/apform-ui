<script setup lang="ts">
/**
 * ImageGenerateCard — AI 图片生成预览卡片
 *
 * 显示生成结果，支持下载、重新生成、点击放大预览。
 * 与 ImagePreviewCard（缩略图 lightbox）职责不同，请勿混用。
 */
import { ref } from 'vue'
import { ElImageViewer } from 'element-plus'
import { AppIcon } from '../../AppIcon'

const props = defineProps<{
  /** 生成图片 URL */
  imageUrl?: string
  /** 生成 prompt */
  prompt?: string
  /** 模型名 */
  model?: string
  /** 尺寸，如 1024x1024 */
  size?: string
  /** 风格：vivid / natural 等（避免与 Vue 原生 style 属性冲突） */
  imageStyle?: string
  /** 质量：standard / hd 等 */
  quality?: string
  /** 生成中 */
  loading?: boolean
  /** 错误信息 */
  error?: string
}>()

const emit = defineEmits<{
  download: []
  regenerate: []
}>()

const showViewer = ref(false)

/** 下载当前图片 */
function handleDownload() {
  if (!props.imageUrl) return
  const a = document.createElement('a')
  a.href = props.imageUrl
  a.download = `ai-image-${Date.now()}.png`
  a.click()
  emit('download')
}

/** 打开全屏预览 */
function openViewer() {
  if (!props.imageUrl) return
  showViewer.value = true
}

/** 关闭全屏预览 */
function closeViewer() {
  showViewer.value = false
}

/** style 值 → 中文 */
const styleLabel: Record<string, string> = {
  vivid: '鲜艳',
  natural: '自然',
}

/** quality 值 → 中文 */
const qualityLabel: Record<string, string> = {
  standard: '标准',
  hd: '高清',
}
</script>

<template>
  <div class="apf-image-generate">
    <div class="apf-image-generate__header">
      <div class="apf-image-generate__title-row">
        <AppIcon name="picture" :size="16" :style="{ color: '#E6A23C' }" />
        <span class="apf-image-generate__title">AI 图片生成</span>
      </div>
      <div v-if="model" class="apf-image-generate__model">{{ model }}</div>
    </div>

    <div v-if="prompt" class="apf-image-generate__prompt">
      <span class="apf-image-generate__prompt-label">Prompt：</span>{{ prompt }}
    </div>

    <div class="apf-image-generate__image-container">
      <div v-if="loading" class="apf-image-generate__overlay">
        <div class="apf-image-generate__spinner" />
        <span>正在生成图片...</span>
      </div>

      <div v-else-if="error" class="apf-image-generate__overlay apf-image-generate__overlay--error">
        <AppIcon name="warning" :size="24" />
        <span>{{ error }}</span>
      </div>

      <div v-else-if="imageUrl" class="apf-image-generate__image-wrap" @click="openViewer">
        <img
          :src="imageUrl"
          class="apf-image-generate__image"
          alt="AI generated image"
        />
        <div class="apf-image-generate__zoom-hint">
          <AppIcon name="full-screen" :size="16" />
          <span>点击放大</span>
        </div>
      </div>

      <div v-else class="apf-image-generate__placeholder">
        <AppIcon name="picture" :size="32" />
        <span>等待生成</span>
      </div>
    </div>

    <div v-if="size || imageStyle || quality" class="apf-image-generate__meta">
      <span v-if="size">
        <AppIcon name="full-screen" :size="12" />
        {{ size }}
      </span>
      <span v-if="imageStyle">
        <AppIcon name="brush" :size="12" />
        {{ styleLabel[imageStyle] ?? imageStyle }}
      </span>
      <span v-if="quality">
        <AppIcon name="picture" :size="12" />
        {{ qualityLabel[quality] ?? quality }}
      </span>
    </div>

    <div v-if="!loading && imageUrl" class="apf-image-generate__actions">
      <button type="button" class="apf-image-generate__btn apf-image-generate__btn--primary" @click="handleDownload">
        <AppIcon name="download" :size="14" />
        下载图片
      </button>
      <button type="button" class="apf-image-generate__btn" @click="emit('regenerate')">
        <AppIcon name="refresh" :size="14" />
        重新生成
      </button>
    </div>
  </div>

  <ElImageViewer
    v-if="showViewer && imageUrl"
    :url-list="[imageUrl]"
    :initial-index="0"
    :close-on-press-escape="true"
    teleported
    @close="closeViewer"
  />
</template>

<style scoped>
.apf-image-generate {
  border: 1px solid var(--border-color-lighter, #e4e7ed);
  border-radius: 8px;
  overflow: hidden;
  background: var(--bg-color, #fff);
}

.apf-image-generate__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
}

.apf-image-generate__title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.apf-image-generate__title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color-primary, #303133);
}

.apf-image-generate__model {
  font-size: 11px;
  color: var(--text-color-secondary, #909399);
  padding: 2px 8px;
  background: var(--bg-color-page, #f5f7fa);
  border-radius: 4px;
}

.apf-image-generate__prompt {
  padding: 0 16px 12px;
  font-size: 12px;
  color: var(--text-color-regular, #606266);
  line-height: 1.5;
  word-break: break-word;
}

.apf-image-generate__prompt-label {
  font-weight: 500;
  color: var(--text-color-secondary, #909399);
}

.apf-image-generate__image-container {
  position: relative;
  width: 100%;
  min-height: 200px;
  background: var(--bg-color-page, #f5f7fa);
  display: flex;
  align-items: center;
  justify-content: center;
}

.apf-image-generate__image-wrap {
  position: relative;
  width: 100%;
  cursor: pointer;
  line-height: 0;
}

.apf-image-generate__image {
  width: 100%;
  height: auto;
  display: block;
  transition: filter 0.2s;
}

.apf-image-generate__image-wrap:hover .apf-image-generate__image {
  filter: brightness(0.85);
}

.apf-image-generate__zoom-hint {
  position: absolute;
  bottom: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
}

.apf-image-generate__image-wrap:hover .apf-image-generate__zoom-hint {
  opacity: 1;
}

.apf-image-generate__overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 40px 0;
  color: var(--text-color-secondary, #909399);
  font-size: 13px;
}

.apf-image-generate__overlay--error {
  color: var(--color-danger, #f56c6c);
}

.apf-image-generate__spinner {
  width: 24px;
  height: 24px;
  border: 3px solid var(--border-color-lighter, #e4e7ed);
  border-top-color: var(--color-primary, #409eff);
  border-radius: 50%;
  animation: apf-image-generate-spin 0.8s linear infinite;
}

@keyframes apf-image-generate-spin {
  to {
    transform: rotate(360deg);
  }
}

.apf-image-generate__placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 40px 0;
  color: var(--text-color-placeholder, #c0c4cc);
  font-size: 13px;
}

.apf-image-generate__meta {
  display: flex;
  gap: 16px;
  padding: 8px 16px;
  font-size: 12px;
  color: var(--text-color-secondary, #909399);
}

.apf-image-generate__meta span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.apf-image-generate__actions {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid var(--border-color-lighter, #ebeef5);
}

.apf-image-generate__btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  border: 1px solid var(--border-color, #dcdfe6);
  background: transparent;
  color: var(--text-color-regular, #606266);
  transition: all 0.2s;
}

.apf-image-generate__btn:hover {
  border-color: var(--color-primary, #409eff);
  color: var(--color-primary, #409eff);
}

.apf-image-generate__btn--primary {
  background: var(--color-primary, #409eff);
  border-color: var(--color-primary, #409eff);
  color: #fff;
}

.apf-image-generate__btn--primary:hover {
  background: var(--color-primary-light-3, #79bbff);
  color: #fff;
}
</style>
