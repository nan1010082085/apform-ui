<script setup lang="ts">
/**
 * JsonDetailDialog — JSON 详情弹框；剧本/分镜优先表格
 */
import { computed } from 'vue'
import { AppDialog } from '../AppDialog'
import { StructuredJsonPreview } from '../StructuredJsonPreview'
import { parseStructuredJsonContent } from '../../utils/structuredJson'

const props = defineProps<{
  modelValue: boolean
  title?: string
  data?: unknown
  content?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [boolean]
}>()

const structured = computed(() => {
  if (props.content) return parseStructuredJsonContent(props.content)
  if (props.data != null) {
    const kind = parseStructuredJsonContent(JSON.stringify(props.data))
    return kind
  }
  return null
})

const display = computed(() => {
  if (props.content) {
    try {
      return JSON.stringify(JSON.parse(props.content), null, 2)
    } catch {
      return props.content
    }
  }
  try {
    return JSON.stringify(props.data ?? null, null, 2)
  } catch {
    return String(props.data)
  }
})

const dialogTitle = computed(() => {
  if (props.title) return props.title
  if (structured.value?.kind === 'script') return '漫剧剧本'
  if (structured.value?.kind === 'storyboard') return '视频分镜'
  return 'JSON 详情'
})
</script>

<template>
  <AppDialog
    :model-value="modelValue"
    :title="dialogTitle"
    :width="structured ? '900px' : '720px'"
    :show-fullscreen-btn="true"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <StructuredJsonPreview
      v-if="structured"
      :content="structured.jsonText"
      :data="structured.data"
    />
    <pre v-else class="apf-json-detail">{{ display }}</pre>
    <template #footer>
      <el-button type="primary" @click="emit('update:modelValue', false)">关闭</el-button>
    </template>
  </AppDialog>
</template>

<style scoped>
.apf-json-detail {
  margin: 0;
  padding: var(--spacing-12px, 12px);
  max-height: 60vh;
  overflow: auto;
  background: var(--bg-color-gray-light, #fafafa);
  border-radius: var(--border-radius-6, 6px);
  font-size: var(--font-size-12, 12px);
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
