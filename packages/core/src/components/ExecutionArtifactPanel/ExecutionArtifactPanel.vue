<script setup lang="ts">
/**
 * ExecutionArtifactPanel — 执行级统一产物面板
 *
 * 汇总文本 / 图片 / 视频 / JSON / 文件，支持按类型筛选与按节点分组。
 * 文档深度预览由宿主处理 preview 事件。
 * 宿主可通过 #gallery 插槽注入鉴权画廊（如 AuthArtifactGallery）。
 */
import { computed, ref } from 'vue'
import type { ArtifactItem, ArtifactGroup, ArtifactKind } from '../../types/artifact'
import ArtifactGallery from '../ArtifactGallery/ArtifactGallery.vue'
import EmptyState from '../EmptyState/EmptyState.vue'

/** 筛选维度（file 含 pdf/office/file） */
type KindFilter = 'all' | 'image' | 'video' | 'text' | 'json' | 'file'

const props = withDefaults(
  defineProps<{
    /** 扁平产物列表（无 groups 时使用） */
    items?: ArtifactItem[]
    /** 按节点分组；优先于 items */
    groups?: ArtifactGroup[]
    title?: string
    max?: number
    /** 是否显示类型筛选 */
    showFilters?: boolean
  }>(),
  {
    items: () => [],
    title: '产物',
    max: 48,
    showFilters: true,
  },
)

const emit = defineEmits<{
  preview: [item: ArtifactItem]
}>()

const kindFilter = ref<KindFilter>('all')

const FILE_KINDS: ArtifactKind[] = ['pdf', 'office', 'file']

/**
 * @param kind - 产物类型
 * @param filter - 当前筛选
 */
function matchKind(kind: ArtifactKind, filter: KindFilter): boolean {
  if (filter === 'all') return true
  if (filter === 'file') return FILE_KINDS.includes(kind) || (kind === 'image')
  return kind === filter
}

/**
 * @param list - 原始列表
 */
function filterItems(list: ArtifactItem[]): ArtifactItem[] {
  const f = kindFilter.value
  if (f === 'all') return list
  if (f === 'file') {
    return list.filter(
      (i) =>
        FILE_KINDS.includes(i.kind)
        || (i.kind === 'image' && !i.url && !!i.documentId),
    )
  }
  if (f === 'image') {
    return list.filter((i) => i.kind === 'image' && (!!i.url || !!i.documentId))
  }
  return list.filter((i) => matchKind(i.kind, f))
}

const flatSource = computed((): ArtifactItem[] => {
  if (props.groups?.length) {
    return props.groups.flatMap((g) => g.items)
  }
  return props.items ?? []
})

const counts = computed(() => {
  const all = flatSource.value
  return {
    all: all.length,
    image: all.filter((i) => i.kind === 'image' && (!!i.url || !!i.documentId)).length,
    video: all.filter((i) => i.kind === 'video' && i.url).length,
    text: all.filter((i) => i.kind === 'text' && i.text?.trim()).length,
    json: all.filter((i) => i.kind === 'json' && i.text?.trim()).length,
    file: all.filter(
      (i) =>
        FILE_KINDS.includes(i.kind)
        || (i.kind === 'image' && !i.url && !!i.documentId),
    ).length,
  }
})

const filterOptions = computed(() => {
  const c = counts.value
  return (
    [
      { value: 'all' as const, label: '全部', count: c.all },
      { value: 'image' as const, label: '图片', count: c.image },
      { value: 'video' as const, label: '视频', count: c.video },
      { value: 'text' as const, label: '文本', count: c.text },
      { value: 'json' as const, label: 'JSON', count: c.json },
      { value: 'file' as const, label: '文件', count: c.file },
    ] as const
  ).filter((o) => o.value === 'all' || o.count > 0)
})

const filteredGroups = computed((): ArtifactGroup[] => {
  if (props.groups?.length) {
    return props.groups
      .map((g) => ({
        ...g,
        items: filterItems(g.items),
      }))
      .filter((g) => g.items.length > 0)
  }
  const items = filterItems(props.items ?? [])
  if (!items.length) return []
  return [{ key: '_all', label: '', items }]
})

const hasAny = computed(() => flatSource.value.length > 0)
const hasFiltered = computed(() => filteredGroups.value.some((g) => g.items.length > 0))
</script>

<template>
  <section class="apf-execution-artifact-panel">
    <header class="apf-execution-artifact-panel__head">
      <div class="apf-execution-artifact-panel__title-row">
        <h3 class="apf-execution-artifact-panel__title">{{ title }}</h3>
        <span v-if="hasAny" class="apf-execution-artifact-panel__count">
          {{ counts.all }} 项
        </span>
      </div>
      <div
        v-if="showFilters && hasAny && filterOptions.length > 1"
        class="apf-execution-artifact-panel__filters"
        role="tablist"
        aria-label="产物类型筛选"
      >
        <button
          v-for="opt in filterOptions"
          :key="opt.value"
          type="button"
          role="tab"
          class="apf-execution-artifact-panel__chip"
          :class="{ 'is-active': kindFilter === opt.value }"
          :aria-selected="kindFilter === opt.value"
          @click="kindFilter = opt.value"
        >
          {{ opt.label }}
          <em>{{ opt.count }}</em>
        </button>
      </div>
    </header>

    <EmptyState
      v-if="!hasAny"
      compact
      icon="folder"
      title="暂无产物"
      description="节点落库文本、图片、视频或文件后，会汇总到这里。"
    />

    <EmptyState
      v-else-if="!hasFiltered"
      compact
      icon="search"
      title="无匹配产物"
      description="换一个类型筛选试试。"
    />

    <div v-else class="apf-execution-artifact-panel__body">
      <div
        v-for="group in filteredGroups"
        :key="group.key"
        class="apf-execution-artifact-panel__group"
      >
        <div
          v-if="group.label"
          class="apf-execution-artifact-panel__group-label"
        >
          {{ group.label }}
          <em>{{ group.items.length }}</em>
        </div>
        <slot name="gallery" :items="group.items" :group="group">
          <ArtifactGallery
            :items="group.items"
            size="default"
            :max="max"
            @preview="emit('preview', $event)"
          />
        </slot>
      </div>
    </div>
  </section>
</template>

<style scoped>
.apf-execution-artifact-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
  height: 100%;
}

.apf-execution-artifact-panel__head {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-shrink: 0;
}

.apf-execution-artifact-panel__title-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.apf-execution-artifact-panel__title {
  margin: 0;
  font-size: 14px;
  font-weight: 650;
  color: var(--apf-text-primary, var(--el-text-color-primary, #303133));
}

.apf-execution-artifact-panel__count {
  font-size: 12px;
  color: var(--apf-text-secondary, var(--el-text-color-secondary, #909399));
}

.apf-execution-artifact-panel__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.apf-execution-artifact-panel__chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 28px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid var(--apf-border-color, var(--el-border-color, #dcdfe6));
  background: var(--apf-bg-color, var(--el-bg-color, #fff));
  color: var(--apf-text-regular, var(--el-text-color-regular, #606266));
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}

.apf-execution-artifact-panel__chip em {
  font-style: normal;
  font-variant-numeric: tabular-nums;
  opacity: 0.7;
}

.apf-execution-artifact-panel__chip.is-active {
  border-color: color-mix(in srgb, var(--el-color-primary) 45%, transparent);
  background: color-mix(in srgb, var(--el-color-primary) 10%, transparent);
  color: var(--el-color-primary);
}

.apf-execution-artifact-panel__body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
  overflow: auto;
}

.apf-execution-artifact-panel__group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.apf-execution-artifact-panel__group-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--apf-text-secondary, var(--el-text-color-secondary, #909399));
}

.apf-execution-artifact-panel__group-label em {
  margin-left: 6px;
  font-style: normal;
  font-weight: 500;
  opacity: 0.75;
}
</style>
