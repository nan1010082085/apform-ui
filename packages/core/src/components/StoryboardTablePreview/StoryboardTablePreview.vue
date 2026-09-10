<script setup lang="ts">
/**
 * StoryboardTablePreview — 视频分镜表格预览（el-table）
 */
import { computed, ref, watch } from 'vue'
import { CardTable } from '../CardTable'
import { detectStructuredJsonKind, extractEmbeddedJson } from '../../utils/structuredJson'

const props = withDefaults(
  defineProps<{
    /** JSON 字符串或混排文本 */
    content?: string
    /** 已解析对象 */
    data?: unknown
    /** 是否显示复制操作 */
    showActions?: boolean
  }>(),
  { showActions: true },
)

const emit = defineEmits<{
  copy: [content: string]
}>()

const activeTab = ref<'shots' | 'seconds'>('shots')

const parsed = computed(() => {
  if (props.data != null && typeof props.data === 'object') {
    return props.data as Record<string, unknown>
  }
  if (!props.content) return null
  return extractEmbeddedJson(props.content)?.data as Record<string, unknown> | null
})

const isStoryboard = computed(() => detectStructuredJsonKind(parsed.value) === 'storyboard')

const storyboard = computed(() => {
  const data = parsed.value
  if (!data || !isStoryboard.value) return null
  return {
    totalDurationSec: Number(data.totalDurationSec ?? 0),
    clipDurationSec: Number(data.clipDurationSec ?? 0),
    shots: Array.isArray(data.shots) ? data.shots as Array<Record<string, unknown>> : [],
    seconds: Array.isArray(data.seconds) ? data.seconds as Array<Record<string, unknown>> : [],
  }
})

watch(
  storyboard,
  (sb) => {
    if (!sb) return
    if (sb.shots.length === 0 && sb.seconds.length > 0) activeTab.value = 'seconds'
  },
  { immediate: true },
)

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
 * @param start 开始秒
 * @param end 结束秒
 */
function formatTimeRange(start: unknown, end: unknown): string {
  if (start == null && end == null) return '—'
  return `${start ?? '?'}s - ${end ?? '?'}s`
}

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
  <CardTable v-if="storyboard" class="apf-storyboard-table-preview" padding="0">
    <div class="apf-storyboard-table-preview__header">
      <div class="apf-storyboard-table-preview__title">
        <span aria-hidden="true">🎬</span>
        <strong>视频分镜</strong>
      </div>
      <div class="apf-storyboard-table-preview__meta">
        <span v-if="storyboard.totalDurationSec">总时长 {{ storyboard.totalDurationSec }}s</span>
        <span v-if="storyboard.clipDurationSec">成片 {{ storyboard.clipDurationSec }}s</span>
        <span>镜头 {{ storyboard.shots.length }}</span>
        <span>逐秒 {{ storyboard.seconds.length }}</span>
      </div>
      <button
        v-if="showActions"
        type="button"
        class="apf-storyboard-table-preview__action"
        @click="copyJson"
      >
        复制 JSON
      </button>
    </div>

    <div class="apf-storyboard-table-preview__tabs">
      <button
        type="button"
        :class="{ 'is-active': activeTab === 'shots' }"
        @click="activeTab = 'shots'"
      >
        镜头列表 ({{ storyboard.shots.length }})
      </button>
      <button
        type="button"
        :class="{ 'is-active': activeTab === 'seconds' }"
        @click="activeTab = 'seconds'"
      >
        逐秒表 ({{ storyboard.seconds.length }})
      </button>
    </div>

    <el-table
      v-if="activeTab === 'shots'"
      :data="storyboard.shots"
      size="small"
      stripe
      border
      max-height="360"
      empty-text="暂无镜头"
    >
      <el-table-column prop="id" label="镜头" width="72" />
      <el-table-column label="时间" width="110">
        <template #default="{ row }">{{ formatTimeRange(row.startSec, row.endSec) }}</template>
      </el-table-column>
      <el-table-column label="角色" min-width="100" show-overflow-tooltip>
        <template #default="{ row }">{{ formatWho(row.who) }}</template>
      </el-table-column>
      <el-table-column prop="does" label="动作" min-width="180" show-overflow-tooltip />
      <el-table-column prop="camera" label="机位" min-width="120" show-overflow-tooltip />
      <el-table-column prop="dialogue" label="对白" min-width="120" show-overflow-tooltip />
    </el-table>

    <el-table
      v-else
      :data="storyboard.seconds"
      size="small"
      stripe
      border
      max-height="360"
      empty-text="暂无逐秒表"
    >
      <el-table-column label="秒" width="64">
        <template #default="{ row }">{{ row.sec ?? row.t ?? '—' }}s</template>
      </el-table-column>
      <el-table-column label="角色" min-width="100" show-overflow-tooltip>
        <template #default="{ row }">{{ formatWho(row.who) }}</template>
      </el-table-column>
      <el-table-column prop="does" label="动作" min-width="180" show-overflow-tooltip />
      <el-table-column prop="camera" label="机位" min-width="120" show-overflow-tooltip />
      <el-table-column prop="dialogue" label="对白" min-width="120" show-overflow-tooltip />
    </el-table>
  </CardTable>
</template>

<style scoped>
.apf-storyboard-table-preview {
  width: 100%;
  overflow: hidden;
}

.apf-storyboard-table-preview__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
  padding: 10px 12px;
  background: var(--bg-color-gray-light, #fafafa);
  border-bottom: 1px solid var(--border-color-light, #ebeef5);
}

.apf-storyboard-table-preview__title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--el-text-color-primary, #303133);
}

.apf-storyboard-table-preview__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 12px;
  color: var(--el-text-color-secondary, #909399);
}

.apf-storyboard-table-preview__meta > span {
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--el-fill-color-light, #f5f7fa);
}

.apf-storyboard-table-preview__action {
  margin-left: auto;
  padding: 4px 10px;
  border: 1px solid var(--el-border-color, #dcdfe6);
  border-radius: 4px;
  background: #fff;
  font-size: 12px;
  color: var(--el-text-color-regular, #606266);
  cursor: pointer;
}

.apf-storyboard-table-preview__action:hover {
  border-color: var(--el-color-primary, #409eff);
  color: var(--el-color-primary, #409eff);
}

.apf-storyboard-table-preview__tabs {
  display: flex;
  border-bottom: 1px solid var(--border-color-light, #ebeef5);
}

.apf-storyboard-table-preview__tabs button {
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  font-size: 13px;
  color: var(--el-text-color-regular, #606266);
  cursor: pointer;
}

.apf-storyboard-table-preview__tabs button.is-active {
  color: var(--el-color-primary, #409eff);
  border-bottom-color: var(--el-color-primary, #409eff);
  font-weight: 600;
}
</style>
