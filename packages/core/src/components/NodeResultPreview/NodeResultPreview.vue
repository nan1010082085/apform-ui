<script setup lang="ts">
/**
 * NodeResultPreview — 节点/消息结果人读编排壳（零 JSON 墙）
 */
import { computed } from 'vue'
import type { ArtifactItem } from '../../types/artifact'
import {
  resolveResultBlocks,
  type ResolveResultOptions,
  type ResultBlock,
} from '../../utils/resolveResultBlocks'
import { renderMarkdown } from '../../utils/textParser'
import { useClipboard } from '../../composables/useClipboard'
import { ArtifactGallery } from '../ArtifactGallery'
import { BusinessResultTables } from '../BusinessResultTables'
import { ChartOptionPreview } from '../ChartOptionPreview'
import { CodePreviewBlock } from '../CodePreviewBlock'
import { EmptyState } from '../EmptyState'
import { HitlResultPreview } from '../HitlResultPreview'
import { KeyValuePreview } from '../KeyValuePreview'
import { StructuredJsonPreview } from '../StructuredJsonPreview'
import { TextPreviewCard } from '../TextPreviewCard'
import { ThinkingBlock } from '../Chat/ThinkingBlock'

const props = withDefaults(
  defineProps<{
    /** 已解析块；与 data 二选一 */
    blocks?: ResultBlock[]
    /** 原始 input/output */
    data?: unknown
    nodeType?: string
    streamingText?: string
    streamingReasoning?: string
    role?: 'input' | 'output'
    /**
     * 受众；默认 operator（完整调试字段）。
     * 终端聊天气泡传 user，或用 include* 细粒度覆盖。
     */
    audience?: ResolveResultOptions['audience']
    /** 是否输出剩余「其他字段」；未传时随 audience */
    includeLeftoverFields?: boolean
    /** 是否启用 fallback 字段表；未传时随 audience */
    includeFallbackFieldTables?: boolean
    /** 思考块默认折叠 */
    thinkingCollapsed?: boolean
  }>(),
  {
    thinkingCollapsed: true,
  },
)

const emit = defineEmits<{
  preview: [item: ArtifactItem]
}>()

const { copy } = useClipboard()

const resolveOptions = computed((): ResolveResultOptions => ({
  nodeType: props.nodeType,
  streamingText: props.streamingText,
  streamingReasoning: props.streamingReasoning,
  role: props.role,
  audience: props.audience,
  includeLeftoverFields: props.includeLeftoverFields,
  includeFallbackFieldTables: props.includeFallbackFieldTables,
}))

const resolvedBlocks = computed((): ResultBlock[] => {
  // 显式传入 blocks（含空数组）时尊重调用方，不再回落到 data 解析
  if (props.blocks != null) return props.blocks
  return resolveResultBlocks(props.data, resolveOptions.value)
})

/**
 * Markdown HTML
 * @param text 原文
 */
function mdHtml(text: string): string {
  return renderMarkdown(text)
}

/**
 * unresolved 复制序列化（不展示墙）
 * @param block 块
 */
async function copyUnresolved(block: ResultBlock): Promise<void> {
  const payload = block.copyPayload || block.message || ''
  if (payload) await copy(payload)
}
</script>

<template>
  <div class="apf-node-result-preview" data-testid="node-result-preview">
    <template v-for="(block, idx) in resolvedBlocks" :key="`${block.kind}-${idx}`">
      <section v-if="block.kind === 'thinking' && block.text" class="apf-node-result-preview__block">
        <ThinkingBlock
          :content="block.text"
          :title="block.title || '思考过程'"
          :default-collapsed="thinkingCollapsed"
        />
      </section>

      <section v-else-if="block.kind === 'markdown' && block.text" class="apf-node-result-preview__block">
        <div v-if="block.title" class="apf-node-result-preview__label">{{ block.title }}</div>
        <div class="apf-node-result-preview__md" v-html="mdHtml(block.text)" />
      </section>

      <section v-else-if="block.kind === 'text' && block.text" class="apf-node-result-preview__block">
        <TextPreviewCard :text="block.text" :label="block.title || '文本'" />
      </section>

      <section v-else-if="block.kind === 'code' && block.text" class="apf-node-result-preview__block">
        <CodePreviewBlock
          :text="block.text"
          :title="block.title || '代码输出'"
          :language="block.language || 'text'"
        />
      </section>

      <section
        v-else-if="(block.kind === 'script' || block.kind === 'storyboard')"
        class="apf-node-result-preview__block"
      >
        <div v-if="block.title" class="apf-node-result-preview__label">{{ block.title }}</div>
        <StructuredJsonPreview :content="block.text" :data="block.data" />
      </section>

      <section v-else-if="block.kind === 'table' && block.table" class="apf-node-result-preview__block">
        <BusinessResultTables :tables="[block.table]" />
      </section>

      <section v-else-if="block.kind === 'keyvalue' && block.entries?.length" class="apf-node-result-preview__block">
        <KeyValuePreview :entries="block.entries" :title="block.title" />
      </section>

      <section v-else-if="block.kind === 'chart' && block.chartOption" class="apf-node-result-preview__block">
        <div v-if="block.title" class="apf-node-result-preview__label">{{ block.title }}</div>
        <ChartOptionPreview :option="block.chartOption" :chart-type="block.chartType" />
      </section>

      <section v-else-if="block.kind === 'media' && block.artifacts?.length" class="apf-node-result-preview__block">
        <div v-if="block.title" class="apf-node-result-preview__label">{{ block.title }}</div>
        <ArtifactGallery :items="block.artifacts" @preview="emit('preview', $event)" />
      </section>

      <section v-else-if="block.kind === 'hitl' && block.hitlItems?.length" class="apf-node-result-preview__block">
        <HitlResultPreview
          :items="block.hitlItems"
          :title="block.title"
          :message="block.text"
        />
      </section>

      <section v-else-if="block.kind === 'empty'" class="apf-node-result-preview__block">
        <EmptyState :title="block.title || '无输出'" description="该节点没有可展示的结果" />
      </section>

      <section v-else-if="block.kind === 'unresolved'" class="apf-node-result-preview__block">
        <div class="apf-node-result-preview__unresolved">
          <p>{{ block.message || '暂无匹配的人读预览' }}</p>
          <button
            v-if="block.copyPayload"
            type="button"
            class="apf-node-result-preview__copy"
            @click="copyUnresolved(block)"
          >
            复制数据
          </button>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.apf-node-result-preview {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.apf-node-result-preview__label {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--apf-text-primary, var(--el-text-color-primary, #303133));
}

.apf-node-result-preview__md {
  font-size: 13px;
  line-height: 1.6;
  color: var(--apf-text-primary, var(--el-text-color-primary, #303133));
  white-space: pre-wrap;
  word-break: break-word;
}

.apf-node-result-preview__md :deep(p) {
  margin: 0 0 0.5em;
}

.apf-node-result-preview__md :deep(p:last-child) {
  margin-bottom: 0;
}

.apf-node-result-preview__unresolved {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px dashed var(--apf-border-color, var(--el-border-color, #dcdfe6));
  color: var(--apf-text-secondary, var(--el-text-color-secondary, #909399));
  font-size: 13px;
}

.apf-node-result-preview__copy {
  border: none;
  background: transparent;
  color: var(--el-color-primary, #409eff);
  cursor: pointer;
  font-size: 12px;
  flex-shrink: 0;
}
</style>
