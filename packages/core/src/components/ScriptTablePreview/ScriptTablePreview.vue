<script setup lang="ts">
/**
 * ScriptTablePreview — 漫剧剧本表格预览（el-table）
 */
import { computed, ref } from 'vue'
import { CardTable } from '../CardTable'
import { detectStructuredJsonKind, extractEmbeddedJson } from '../../utils/structuredJson'

const props = withDefaults(
  defineProps<{
    /** JSON 字符串或混排文本 */
    content?: string
    /** 已解析对象 */
    data?: unknown
    /** 是否显示复制/原始 JSON 操作 */
    showActions?: boolean
  }>(),
  { showActions: true },
)

const emit = defineEmits<{
  copy: [content: string]
}>()

const activeTab = ref<'info' | 'characters' | 'scenes'>('scenes')

const parsed = computed(() => {
  if (props.data != null && typeof props.data === 'object') {
    return props.data as Record<string, unknown>
  }
  if (!props.content) return null
  return extractEmbeddedJson(props.content)?.data as Record<string, unknown> | null
})

const isScript = computed(() => detectStructuredJsonKind(parsed.value) === 'script')

const script = computed(() => {
  const data = parsed.value
  if (!data || !isScript.value) return null
  return {
    title: String(data.title ?? ''),
    genre: String(data.genre ?? ''),
    durationRange: String(data.durationRange ?? ''),
    durationSuggestionSec: Number(data.durationSuggestionSec ?? 0),
    tone: String(data.tone ?? ''),
    clipDurationSec: Number(data.clipDurationSec ?? 0),
    characters: Array.isArray(data.characters) ? data.characters as Array<Record<string, unknown>> : [],
    scenes: Array.isArray(data.scenes) ? data.scenes as Array<Record<string, unknown>> : [],
  }
})

const jsonText = computed(() => {
  if (props.content?.trim()) {
    const extracted = extractEmbeddedJson(props.content)
    return extracted?.jsonText ?? props.content
  }
  try {
    return JSON.stringify(parsed.value ?? null, null, 2)
  } catch {
    return ''
  }
})

/**
 * @param who 角色字段
 */
function formatWho(who: unknown): string {
  if (Array.isArray(who)) return who.map(String).join('、')
  if (typeof who === 'string') return who
  return '—'
}

/** 复制 JSON */
function copyJson(): void {
  if (!jsonText.value) return
  navigator.clipboard?.writeText(jsonText.value)
  emit('copy', jsonText.value)
}
</script>

<template>
  <CardTable v-if="script" class="apf-script-table-preview" padding="0">
    <div class="apf-script-table-preview__header">
      <div class="apf-script-table-preview__title">
        <span aria-hidden="true">📝</span>
        <strong>{{ script.title || '漫剧剧本' }}</strong>
      </div>
      <div class="apf-script-table-preview__meta">
        <span v-if="script.genre">类型: {{ script.genre }}</span>
        <span v-if="script.durationRange">时长: {{ script.durationRange }}s</span>
        <span>角色 {{ script.characters.length }}</span>
        <span>场景 {{ script.scenes.length }}</span>
      </div>
      <button
        v-if="showActions"
        type="button"
        class="apf-script-table-preview__action"
        @click="copyJson"
      >
        复制 JSON
      </button>
    </div>

    <div class="apf-script-table-preview__tabs">
      <button
        type="button"
        :class="{ 'is-active': activeTab === 'info' }"
        @click="activeTab = 'info'"
      >
        基本信息
      </button>
      <button
        type="button"
        :class="{ 'is-active': activeTab === 'characters' }"
        @click="activeTab = 'characters'"
      >
        角色 ({{ script.characters.length }})
      </button>
      <button
        type="button"
        :class="{ 'is-active': activeTab === 'scenes' }"
        @click="activeTab = 'scenes'"
      >
        场景 ({{ script.scenes.length }})
      </button>
    </div>

    <div v-if="activeTab === 'info'" class="apf-script-table-preview__info">
      <div class="apf-script-table-preview__info-item">
        <span>标题</span>
        <strong>{{ script.title || '—' }}</strong>
      </div>
      <div class="apf-script-table-preview__info-item">
        <span>类型</span>
        <strong>{{ script.genre || '—' }}</strong>
      </div>
      <div class="apf-script-table-preview__info-item">
        <span>基调</span>
        <strong>{{ script.tone || '—' }}</strong>
      </div>
      <div class="apf-script-table-preview__info-item">
        <span>成片时长</span>
        <strong>{{ script.clipDurationSec || '—' }}s</strong>
      </div>
    </div>

    <el-table
      v-else-if="activeTab === 'characters'"
      :data="script.characters"
      size="small"
      stripe
      border
      max-height="360"
      empty-text="暂无角色"
    >
      <el-table-column prop="name" label="姓名" min-width="100" />
      <el-table-column prop="gender" label="性别" width="72" />
      <el-table-column prop="age" label="年龄" width="72" />
      <el-table-column label="外貌" min-width="180" show-overflow-tooltip>
        <template #default="{ row }">{{ row.appearance || '—' }}</template>
      </el-table-column>
    </el-table>

    <el-table
      v-else
      :data="script.scenes"
      size="small"
      stripe
      border
      max-height="360"
      empty-text="暂无场景"
    >
      <el-table-column prop="id" label="场景" width="72" />
      <el-table-column prop="heading" label="标题" min-width="120" show-overflow-tooltip />
      <el-table-column label="出场" width="120" show-overflow-tooltip>
        <template #default="{ row }">{{ formatWho(row.who ?? row.characters) }}</template>
      </el-table-column>
      <el-table-column prop="setting" label="场景设置" min-width="120" show-overflow-tooltip />
      <el-table-column prop="action" label="动作" min-width="180" show-overflow-tooltip />
      <el-table-column prop="dialogue" label="对白" min-width="140" show-overflow-tooltip />
    </el-table>
  </CardTable>
</template>

<style scoped>
.apf-script-table-preview {
  width: 100%;
  overflow: hidden;
}

.apf-script-table-preview__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
  padding: 10px 12px;
  background: var(--bg-color-gray-light, #fafafa);
  border-bottom: 1px solid var(--border-color-light, #ebeef5);
}

.apf-script-table-preview__title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--el-text-color-primary, #303133);
}

.apf-script-table-preview__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 12px;
  color: var(--el-text-color-secondary, #909399);
}

.apf-script-table-preview__meta > span {
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--el-fill-color-light, #f5f7fa);
}

.apf-script-table-preview__action {
  margin-left: auto;
  padding: 4px 10px;
  border: 1px solid var(--el-border-color, #dcdfe6);
  border-radius: 4px;
  background: #fff;
  font-size: 12px;
  color: var(--el-text-color-regular, #606266);
  cursor: pointer;
}

.apf-script-table-preview__action:hover {
  border-color: var(--el-color-primary, #409eff);
  color: var(--el-color-primary, #409eff);
}

.apf-script-table-preview__tabs {
  display: flex;
  border-bottom: 1px solid var(--border-color-light, #ebeef5);
}

.apf-script-table-preview__tabs button {
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  font-size: 13px;
  color: var(--el-text-color-regular, #606266);
  cursor: pointer;
}

.apf-script-table-preview__tabs button.is-active {
  color: var(--el-color-primary, #409eff);
  border-bottom-color: var(--el-color-primary, #409eff);
  font-weight: 600;
}

.apf-script-table-preview__info {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 10px;
  padding: 12px;
}

.apf-script-table-preview__info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px;
  border-radius: 6px;
  background: var(--el-fill-color-lighter, #fafafa);
  border: 1px solid var(--el-border-color-lighter, #ebeef5);
}

.apf-script-table-preview__info-item > span {
  font-size: 12px;
  color: var(--el-text-color-secondary, #909399);
}

.apf-script-table-preview__info-item > strong {
  font-size: 13px;
  color: var(--el-text-color-primary, #303133);
}
</style>
