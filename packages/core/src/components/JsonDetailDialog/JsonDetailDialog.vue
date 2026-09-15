<script setup lang="ts">
/**
 * JsonDetailDialog — 详情弹框；一律走人读 NodeResultPreview，禁止 JSON 墙
 */
import { computed } from 'vue'
import { AppDialog } from '../AppDialog'
import { NodeResultPreview } from '../NodeResultPreview'
import { detectStructuredJsonKind } from '../../utils/structuredJson'
import { extractEmbeddedJson } from '../../utils/structuredJson'

const props = defineProps<{
  modelValue: boolean
  title?: string
  data?: unknown
  content?: string
  nodeType?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [boolean]
}>()

const previewData = computed(() => {
  if (props.data != null) return props.data
  if (!props.content) return null
  const extracted = extractEmbeddedJson(props.content)
  return extracted?.data ?? props.content
})

const dialogTitle = computed(() => {
  if (props.title) return props.title
  const data = previewData.value
  if (data && typeof data === 'object') {
    const kind = detectStructuredJsonKind(data)
    if (kind === 'script') return '漫剧剧本'
    if (kind === 'storyboard') return '视频分镜'
  }
  return '结果详情'
})
</script>

<template>
  <AppDialog
    :model-value="modelValue"
    :title="dialogTitle"
    width="900px"
    :show-fullscreen-btn="true"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <NodeResultPreview :data="previewData" :node-type="nodeType" />
    <template #footer>
      <el-button type="primary" @click="emit('update:modelValue', false)">关闭</el-button>
    </template>
  </AppDialog>
</template>
