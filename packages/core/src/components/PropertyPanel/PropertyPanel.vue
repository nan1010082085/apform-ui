<script setup lang="ts">
/**
 * PropertyPanel — editor 属性栏完整壳 + schema 分区渲染
 *
 * 金标准：editor `style.module.scss` 整套（玻璃底、主色标题、组件名行、主色分区）。
 * - 默认：完整侧栏壳（title / subject / config / scroll + sections）
 * - nested：仅渲染分区，嵌在外层壳的 scroll 内，不重复玻璃面板
 */
import { computed, provide, type Ref, useSlots } from 'vue'
import { SectionToggle } from '../SectionToggle'
import { EmptyState } from '../EmptyState'
import { PropertyField } from '../PropertyField'
import { TruncatedTooltipText } from '../TruncatedTooltipText'
import { AppIcon } from '../AppIcon'
import {
  PROPERTY_FETCH_REMOTE_KEY,
  type FetchRemoteOptionsFn,
  type PropertyItem,
  type PropertySection,
  type PropertyUpdatePayload,
} from './types'
import { filterVisiblePropertySections } from './visibleOn'

const props = withDefaults(
  defineProps<{
    /** 分区列表 */
    sections?: PropertySection[]
    /** 远程下拉拉取（可选） */
    fetchRemoteOptions?: FetchRemoteOptionsFn
    /** 空态文案 */
    emptyText?: string
    /**
     * 当前属性值字典；传入后按各 item 的 visibleOn 过滤
     */
    values?: Record<string, unknown>
    /** 侧栏标题（如「属性」）；nested 时忽略 */
    title?: string
    /** 主体名（widget / 节点类型名） */
    subjectLabel?: string
    /** 主体说明（悬停问号） */
    subjectHint?: string
    /**
     * 嵌套模式：只渲染分区，不带玻璃壳 / 标题 / 主体行
     * 用于外层已有完整 PropertyPanel 壳时的内层 sections
     */
    nested?: boolean
  }>(),
  {
    sections: () => [],
    nested: false,
  },
)

const emit = defineEmits<{
  /** 字段更新 */
  update: [payload: PropertyUpdatePayload]
  /** 复制主体 ID（若提供 copyId） */
  'copy-id': []
}>()

const slots = useSlots()

provide(
  PROPERTY_FETCH_REMOTE_KEY,
  computed(() => props.fetchRemoteOptions) as Ref<FetchRemoteOptionsFn | undefined>,
)

const displaySections = computed(() => {
  const list = props.sections ?? []
  if (!props.values) return list
  return filterVisiblePropertySections(list, props.values)
})

const hasSections = computed(() =>
  displaySections.value.some((s) => (s.items?.length ?? 0) > 0),
)

const showEmpty = computed(
  () => !hasSections.value && !slots['before-sections'] && !slots['after-sections'] && !slots.default,
)

const showSubject = computed(
  () => !props.nested && Boolean(props.subjectLabel || slots.subject || slots['subject-actions']),
)

/**
 * @param sectionKey 分区键
 * @param key 字段键
 * @param value 新值
 */
function emitUpdate(sectionKey: string, key: string, value: unknown) {
  emit('update', { sectionKey, key, value })
}

/**
 * @param item 字段
 * @param section 分区
 */
function makeItemUpdater(item: PropertyItem, section: PropertySection) {
  return (value: unknown) => emitUpdate(section.key, item.key, value)
}
</script>

<template>
  <div
    class="apf-property-panel"
    :class="{
      'apf-property-panel--shell': !nested,
      'apf-property-panel--nested': nested,
    }"
  >
    <div v-if="!nested && (title || $slots.title)" class="apf-property-panel__header">
      <slot name="title">{{ title }}</slot>
    </div>

    <div v-if="showSubject" class="apf-property-panel__subject">
      <slot name="subject">
        <TruncatedTooltipText
          v-if="subjectLabel"
          :content="subjectLabel"
          class="apf-property-panel__subject-label"
        >
          {{ subjectLabel }}
        </TruncatedTooltipText>
      </slot>
      <el-popover
        v-if="subjectHint"
        :content="subjectHint"
        placement="top"
        :show-after="500"
        trigger="hover"
      >
        <template #reference>
          <AppIcon name="question-filled" class="apf-property-panel__hint-icon" />
        </template>
      </el-popover>
      <slot name="subject-actions" />
    </div>

    <div v-if="!nested && $slots.config" class="apf-property-panel__config">
      <slot name="config" />
    </div>

    <div class="apf-property-panel__scroll" :class="{ 'apf-property-panel__scroll--fill': !nested }">
      <slot name="before-sections" />

      <EmptyState v-if="showEmpty" compact :description="emptyText || '暂无配置项'" />

      <template v-else-if="hasSections">
        <SectionToggle
          v-for="section in displaySections"
          :key="section.key"
          :title="section.label"
          :count="section.items.length"
          :default-open="section.defaultOpen !== false"
        >
          <template v-for="item in section.items" :key="`${section.key}:${item.key}`">
            <slot
              v-if="$slots[`field-${item.type}`]"
              :name="`field-${item.type}`"
              :item="item"
              :section="section"
              :update="makeItemUpdater(item, section)"
            />
            <PropertyField
              v-else
              :key-name="item.key"
              :label="item.label"
              :type="item.type"
              :value="item.value"
              :desc="item.desc"
              :placeholder="item.placeholder"
              :options="item.options"
              :remote-url="item.remoteUrl"
              :label-field="item.labelField"
              :value-field="item.valueField"
              :min="item.min"
              :max="item.max"
              :required="item.required"
              :array-mode="item.arrayMode"
              :fetch-remote-options="fetchRemoteOptions"
              @update="emitUpdate(section.key, item.key, $event)"
            />
          </template>
        </SectionToggle>
      </template>

      <slot name="after-sections" />
      <slot />
    </div>

    <div v-if="!nested && $slots.footer" class="apf-property-panel__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
/* 完整对齐 editor PropertyPanel style.module.scss */
.apf-property-panel--shell {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  height: 100%;
  width: 100%;
  background: var(--glass-bg, rgba(255, 255, 255, 0.85));
  backdrop-filter: var(--glass-blur, blur(20px));
  -webkit-backdrop-filter: var(--glass-blur, blur(20px));
}

.apf-property-panel--nested {
  width: 100%;
  min-width: 0;
}

/* editor-unified-controls：属性栏内 EP 控件统一 32px + 12px 字体 */
.apf-property-panel--shell :deep(.el-input),
.apf-property-panel--shell :deep(.el-select),
.apf-property-panel--shell :deep(.el-input-number),
.apf-property-panel--nested :deep(.el-input),
.apf-property-panel--nested :deep(.el-select),
.apf-property-panel--nested :deep(.el-input-number) {
  --el-component-size: var(--control-height-md, 32px);
  --el-component-size-small: var(--control-height-md, 32px);
  --el-font-size: 12px;
}

.apf-property-panel--shell :deep(.el-textarea),
.apf-property-panel--nested :deep(.el-textarea) {
  --el-font-size: 12px;
}

.apf-property-panel--shell :deep(.el-select__placeholder),
.apf-property-panel--nested :deep(.el-select__placeholder) {
  font-size: 12px;
}

.apf-property-panel--shell :deep(.el-input .el-input__wrapper),
.apf-property-panel--shell :deep(.el-input--small .el-input__wrapper),
.apf-property-panel--nested :deep(.el-input .el-input__wrapper),
.apf-property-panel--nested :deep(.el-input--small .el-input__wrapper) {
  height: var(--control-height-md, 32px);
  min-height: var(--control-height-md, 32px);
}

.apf-property-panel--shell :deep(.el-select .el-select__wrapper),
.apf-property-panel--shell :deep(.el-select--small .el-select__wrapper),
.apf-property-panel--nested :deep(.el-select .el-select__wrapper),
.apf-property-panel--nested :deep(.el-select--small .el-select__wrapper) {
  height: var(--control-height-md, 32px);
  min-height: var(--control-height-md, 32px);
}

.apf-property-panel--shell :deep(.el-input-number),
.apf-property-panel--shell :deep(.el-input-number--small),
.apf-property-panel--nested :deep(.el-input-number),
.apf-property-panel--nested :deep(.el-input-number--small) {
  height: var(--control-height-md, 32px);
}

.apf-property-panel--shell :deep(.el-input-number .el-input__wrapper),
.apf-property-panel--shell :deep(.el-input-number--small .el-input__wrapper),
.apf-property-panel--nested :deep(.el-input-number .el-input__wrapper),
.apf-property-panel--nested :deep(.el-input-number--small .el-input__wrapper) {
  height: var(--control-height-md, 32px);
  min-height: var(--control-height-md, 32px);
}

.apf-property-panel--shell :deep(.el-button:not(.is-text):not(.is-link)),
.apf-property-panel--nested :deep(.el-button:not(.is-text):not(.is-link)) {
  height: var(--control-height-md, 32px);
  min-height: var(--control-height-md, 32px);
}

.apf-property-panel--shell :deep(.el-input-number.is-controls-right .el-input-number__increase),
.apf-property-panel--nested :deep(.el-input-number.is-controls-right .el-input-number__increase) {
  height: 50% !important;
  top: 1px;
  bottom: auto;
  border-bottom: var(--el-border);
  border-left: var(--el-border);
}

.apf-property-panel--shell :deep(.el-input-number.is-controls-right .el-input-number__decrease),
.apf-property-panel--nested :deep(.el-input-number.is-controls-right .el-input-number__decrease) {
  height: 50% !important;
  top: auto;
  bottom: 1px;
  border-left: var(--el-border);
}

.apf-property-panel__header {
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-primary, #409eff);
  flex-shrink: 0;
  border-bottom: 1px solid var(--color-primary-lighter, #d9ecff);
  display: flex;
  align-items: center;
  gap: 6px;
}

.apf-property-panel__subject {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border-bottom: 1px solid var(--color-primary-lighter, #d9ecff);
  flex-shrink: 0;
}

.apf-property-panel__subject-label {
  font-weight: 600;
  font-size: 13px;
  color: var(--text-color-primary, #303133);
  min-width: 0;
  flex: 1;
}

.apf-property-panel__hint-icon {
  color: var(--text-color-placeholder, #c0c4cc);
  cursor: help;
  font-size: 14px;
  flex-shrink: 0;
}

.apf-property-panel__hint-icon:hover {
  color: var(--color-primary, #409eff);
}

.apf-property-panel__config {
  padding: 8px 16px;
  border-bottom: 1px solid var(--color-primary-lighter, #d9ecff);
  flex-shrink: 0;
}

.apf-property-panel__scroll {
  width: 100%;
  min-width: 0;
}

.apf-property-panel__scroll--fill {
  flex: 1;
  min-height: 0;
  height: 0;
  overflow: auto;
}

.apf-property-panel__footer {
  flex-shrink: 0;
  padding: 8px 16px;
  border-top: 1px solid var(--color-primary-lighter, #d9ecff);
}
</style>
