<script setup lang="ts">
/**
 * ArtifactGallery — 统一产物画廊（图 / 视频 / JSON / 文本 / 文件）
 *
 * 不含 audio / 3D / PPT。文档预览由父层挂 DocumentPreviewDrawer。
 * 剧本 / 分镜 JSON 走表格预览；其它 JSON 走 JsonCard + 详情弹层。
 */
import { computed, ref } from 'vue'
import type { ArtifactItem, ArtifactGallerySize } from '../../types/artifact'
import ImagePreviewCard from '../ImagePreviewCard/ImagePreviewCard.vue'
import VideoPreviewCard from '../VideoPreviewCard/VideoPreviewCard.vue'
import TextPreviewCard from '../TextPreviewCard/TextPreviewCard.vue'
import FileChip from '../FileChip/FileChip.vue'
import { JsonCard } from '../JsonCard'
import { JsonDetailDialog } from '../JsonDetailDialog'
import { StructuredJsonPreview } from '../StructuredJsonPreview'
import { parseStructuredJsonContent } from '../../utils/structuredJson'

const props = withDefaults(
  defineProps<{
    items: ArtifactItem[]
    size?: ArtifactGallerySize
    /** 最多展示条数 */
    max?: number
  }>(),
  { size: 'default', max: 12 },
)

const emit = defineEmits<{
  /** pdf / office / file 点击时抛出，由宿主打开抽屉 */
  preview: [item: ArtifactItem]
}>()

const jsonDialogVisible = ref(false)
const activeJson = ref<ArtifactItem | null>(null)

const sliced = computed(() => props.items.slice(0, props.max))

const images = computed(() =>
  sliced.value.filter((i) => i.kind === 'image' && i.url).map((i) => i.url!),
)
const videos = computed(() => sliced.value.filter((i) => i.kind === 'video' && i.url))
const structuredJsons = computed(() =>
  sliced.value.filter((i) => i.kind === 'json' && i.text?.trim() && parseStructuredJsonContent(i.text!)),
)
const plainJsons = computed(() =>
  sliced.value.filter(
    (i) => i.kind === 'json' && i.text?.trim() && !parseStructuredJsonContent(i.text!),
  ),
)
const texts = computed(() => sliced.value.filter((i) => i.kind === 'text' && i.text?.trim()))
const files = computed(() =>
  sliced.value.filter(
    (i) =>
      i.kind === 'pdf'
      || i.kind === 'office'
      || i.kind === 'file'
      || (i.kind === 'image' && !i.url && i.documentId),
  ),
)

const hasContent = computed(
  () =>
    images.value.length > 0
    || videos.value.length > 0
    || structuredJsons.value.length > 0
    || plainJsons.value.length > 0
    || texts.value.length > 0
    || files.value.length > 0,
)

/**
 * @param item 被点击的文件产物
 */
function onFilePreview(item: ArtifactItem) {
  emit('preview', item)
}

/**
 * @param item JSON 产物
 */
function openJson(item: ArtifactItem) {
  activeJson.value = item
  jsonDialogVisible.value = true
}
</script>

<template>
  <div v-if="hasContent" class="apf-artifact-gallery" :class="`apf-artifact-gallery--${size}`">
    <ImagePreviewCard v-if="images.length" :urls="images" :size="size" />

    <div v-if="videos.length" class="apf-artifact-gallery__videos">
      <VideoPreviewCard
        v-for="vid in videos"
        :key="vid.id"
        :url="vid.url!"
        :size="size"
      />
    </div>

    <div v-if="structuredJsons.length" class="apf-artifact-gallery__structured">
      <StructuredJsonPreview
        v-for="j in structuredJsons"
        :key="j.id"
        :content="j.text"
      />
    </div>

    <div v-if="plainJsons.length" class="apf-artifact-gallery__jsons">
      <JsonCard
        v-for="j in plainJsons"
        :key="j.id"
        :title="j.label || 'JSON 输出'"
        :content="j.text"
        @open-detail="openJson(j)"
      />
    </div>

    <div v-if="files.length" class="apf-artifact-gallery__files">
      <FileChip
        v-for="f in files"
        :key="f.id"
        :item="f"
        @preview="onFilePreview"
      />
    </div>

    <div v-if="texts.length" class="apf-artifact-gallery__texts">
      <TextPreviewCard
        v-for="t in texts"
        :key="t.id"
        :text="t.text!"
        :label="t.label"
        :size="size"
      />
    </div>

    <JsonDetailDialog
      v-model="jsonDialogVisible"
      :title="activeJson?.label || 'JSON 详情'"
      :content="activeJson?.text"
    />
  </div>
</template>

<style scoped>
.apf-artifact-gallery {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.apf-artifact-gallery__videos,
.apf-artifact-gallery__files,
.apf-artifact-gallery__texts,
.apf-artifact-gallery__jsons,
.apf-artifact-gallery__structured {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
  min-width: 0;
}

.apf-artifact-gallery__jsons,
.apf-artifact-gallery__files,
.apf-artifact-gallery__videos {
  flex-direction: row;
}

.apf-artifact-gallery--compact {
  gap: 4px;
}

.apf-artifact-gallery--compact .apf-artifact-gallery__files,
.apf-artifact-gallery--compact .apf-artifact-gallery__videos,
.apf-artifact-gallery--compact .apf-artifact-gallery__jsons {
  gap: 4px;
}
</style>
