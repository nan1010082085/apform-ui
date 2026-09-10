<script setup lang="ts">
/**
 * StructuredJsonPreview — 自动识别剧本/分镜并用表格展示；否则退回插槽/空
 */
import { computed } from 'vue'
import ScriptTablePreview from '../ScriptTablePreview/ScriptTablePreview.vue'
import StoryboardTablePreview from '../StoryboardTablePreview/StoryboardTablePreview.vue'
import {
  detectStructuredJsonKind,
  extractEmbeddedJson,
  type StructuredJsonKind,
} from '../../utils/structuredJson'

const props = withDefaults(
  defineProps<{
    content?: string
    data?: unknown
    showActions?: boolean
  }>(),
  { showActions: true },
)

const emit = defineEmits<{
  copy: [content: string]
}>()

const resolved = computed(() => {
  if (props.data != null) {
    const kind = detectStructuredJsonKind(props.data)
    if (!kind) return null
    return { kind, data: props.data, content: props.content }
  }
  if (!props.content) return null
  const extracted = extractEmbeddedJson(props.content)
  if (!extracted) return null
  const kind = detectStructuredJsonKind(extracted.data)
  if (!kind) return null
  return { kind, data: extracted.data, content: extracted.jsonText }
})

const kind = computed<StructuredJsonKind | null>(() => resolved.value?.kind ?? null)

defineExpose({ kind })
</script>

<template>
  <StoryboardTablePreview
    v-if="kind === 'storyboard' && resolved"
    :content="resolved.content"
    :data="resolved.data"
    :show-actions="showActions"
    @copy="emit('copy', $event)"
  />
  <ScriptTablePreview
    v-else-if="kind === 'script' && resolved"
    :content="resolved.content"
    :data="resolved.data"
    :show-actions="showActions"
    @copy="emit('copy', $event)"
  />
</template>
