<script setup lang="ts">
/**
 * ImagePreviewCard — 图片缩略预览（支持多图 lightbox）
 */
import { computed, ref } from 'vue'
import { ElImageViewer } from 'element-plus'

const props = withDefaults(
  defineProps<{
    /** 单图 */
    url?: string
    /** 多图 */
    urls?: string[]
    /** compact 用于节点条 */
    size?: 'compact' | 'default'
    alt?: string
  }>(),
  { size: 'default', alt: '预览图' },
)

const viewerVisible = ref(false)
const viewerIndex = ref(0)

const list = computed(() => {
  if (props.urls?.length) return props.urls.filter(Boolean)
  return props.url ? [props.url] : []
})

/**
 * @param index 图片下标
 */
function open(index: number) {
  viewerIndex.value = index
  viewerVisible.value = true
}
</script>

<template>
  <div v-if="list.length" class="apf-image-preview" :class="`apf-image-preview--${size}`">
    <button
      v-for="(src, idx) in list"
      :key="`${src}-${idx}`"
      type="button"
      class="apf-image-preview__thumb"
      @click.stop="open(idx)"
    >
      <img :src="src" :alt="`${alt} ${idx + 1}`" loading="lazy" />
    </button>
    <ElImageViewer
      v-if="viewerVisible && list.length"
      :url-list="list"
      :initial-index="viewerIndex"
      teleported
      @close="viewerVisible = false"
    />
  </div>
</template>

<style scoped>
.apf-image-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.apf-image-preview__thumb {
  padding: 0;
  border: 1px solid var(--apf-border-color, var(--el-border-color-lighter, #ebeef5));
  border-radius: 6px;
  overflow: hidden;
  background: var(--apf-bg-page, var(--el-bg-color-page, #f5f7fa));
  cursor: zoom-in;
  width: 96px;
  height: 96px;
}

.apf-image-preview--compact .apf-image-preview__thumb {
  width: 40px;
  height: 40px;
  border-radius: 4px;
}

.apf-image-preview__thumb img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
