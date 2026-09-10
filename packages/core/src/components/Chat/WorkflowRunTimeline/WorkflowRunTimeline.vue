<script setup lang="ts">
/**
 * WorkflowRunTimeline — 工作流执行时间线壳
 *
 * 展示标题、进度与节点步骤；业务媒体等内容通过 #step 插槽注入。
 */
import { computed, ref, watch } from 'vue'
import { AppIcon } from '../../AppIcon'
import type { WorkflowRunStep } from './types'

const props = withDefaults(
  defineProps<{
    /** 头部标题 */
    title: string
    /** 整体执行状态 */
    status: string
    /** 进度文案 */
    progressText?: string
    /** 步骤列表 */
    steps: WorkflowRunStep[]
    /** 初始是否折叠 */
    defaultCollapsed?: boolean
    /** 无步骤时的提示 */
    emptyText?: string
  }>(),
  {
    defaultCollapsed: false,
    emptyText: '等待首个节点开始…',
  },
)

const collapsed = ref(props.defaultCollapsed)

watch(
  () => props.status,
  (status) => {
    if (status === 'running') {
      collapsed.value = false
    }
  },
)

const STATUS_ICON: Record<string, string> = {
  running: 'loading',
  success: 'circle-check',
  error: 'circle-close-filled',
  waiting: 'clock',
  skipped: 'minus',
  pending: 'more-filled',
}

const statusClass = computed(() => {
  const s = props.status
  if (!s) return ''
  return `status${s.charAt(0).toUpperCase()}${s.slice(1)}`
})

/**
 * @param status - 步骤状态
 */
function iconClass(status: string): string {
  return `icon${status.charAt(0).toUpperCase()}${status.slice(1)}`
}

/**
 * @param status - 步骤状态
 */
function statusIcon(status: string): string {
  return STATUS_ICON[status] ?? 'more-filled'
}

function toggleCollapsed(): void {
  collapsed.value = !collapsed.value
}
</script>

<template>
  <div :class="[$style.block, $style[statusClass]]">
    <button type="button" :class="$style.header" @click="toggleCollapsed">
      <span :class="$style.headerLeft">
        <AppIcon
          :name="collapsed ? 'arrow-right' : 'arrow-down'"
          :size="12"
          :class="$style.chevron"
        />
        <span :class="$style.title">{{ title }}</span>
      </span>
      <span v-if="progressText" :class="$style.progress">{{ progressText }}</span>
    </button>

    <div v-if="!collapsed" :class="$style.timeline">
      <div
        v-for="(step, index) in steps"
        :key="step.id"
        :class="[
          $style.item,
          step.status === 'running' && $style.itemRunning,
          step.streaming && $style.itemStreaming,
        ]"
      >
        <div :class="$style.rail">
          <span :class="[$style.iconWrap, $style[iconClass(step.status)]]">
            <AppIcon
              :name="statusIcon(step.status)"
              :size="14"
              :class="step.status === 'running' ? $style.spin : undefined"
            />
          </span>
          <span v-if="index < steps.length - 1" :class="$style.connector" />
        </div>
        <div :class="$style.body">
          <span :class="$style.nodeName">{{ step.label }}</span>
          <span v-if="step.hint" :class="$style.nodeHint">{{ step.hint }}</span>
          <slot name="step" :step="step" />
        </div>
      </div>

      <div v-if="!steps.length" :class="$style.empty">
        {{ emptyText }}
      </div>
    </div>
  </div>
</template>

<style module>
.block {
  margin-bottom: 10px;
  border: 1px solid var(--border-color-light, #e4e7ed);
  border-radius: 10px;
  background: var(--fill-color-lighter, #fafafa);
  overflow: hidden;
}

.statusRunning {
  border-color: color-mix(in srgb, var(--color-primary, #0060a2) 28%, transparent);
}

.statusError {
  border-color: color-mix(in srgb, var(--color-danger, #f56c6c) 35%, transparent);
}

.statusWaiting {
  border-color: color-mix(in srgb, var(--color-warning, #e6a23c) 35%, transparent);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
  padding: 8px 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
}

.header:hover {
  background: color-mix(in srgb, var(--color-primary, #0060a2) 4%, transparent);
}

.headerLeft {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.chevron {
  flex-shrink: 0;
  color: var(--text-color-secondary, #909399);
}

.title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color-title, #303133);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.progress {
  flex-shrink: 0;
  font-size: 12px;
  color: var(--text-color-secondary, #909399);
}

.timeline {
  padding: 4px 12px 10px;
}

.item {
  display: flex;
  gap: 10px;
  min-height: 32px;
}

.itemRunning .nodeName {
  color: var(--color-primary, #0060a2);
  font-weight: 600;
}

.itemStreaming .iconWrap {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary, #0060a2) 12%, transparent);
}

.rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 22px;
  flex-shrink: 0;
}

.iconWrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--fill-color, #f0f2f5);
  color: var(--text-color-secondary, #909399);
}

.iconSuccess {
  background: color-mix(in srgb, var(--color-success, #67c23a) 14%, white);
  color: var(--color-success, #67c23a);
}

.iconError {
  background: color-mix(in srgb, var(--color-danger, #f56c6c) 14%, white);
  color: var(--color-danger, #f56c6c);
}

.iconRunning {
  background: color-mix(in srgb, var(--color-primary, #0060a2) 14%, white);
  color: var(--color-primary, #0060a2);
}

.iconWaiting {
  background: color-mix(in srgb, var(--color-warning, #e6a23c) 14%, white);
  color: var(--color-warning, #e6a23c);
}

.iconSkipped {
  background: var(--fill-color, #f0f2f5);
  color: var(--text-color-placeholder, #c0c4cc);
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.connector {
  flex: 1;
  width: 2px;
  min-height: 8px;
  margin: 2px 0;
  background: var(--border-color-lighter, #ebeef5);
}

.body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  padding-bottom: 8px;
}

.nodeName {
  font-size: 13px;
  line-height: 1.4;
  color: var(--text-color-primary, #303133);
}

.nodeHint {
  font-size: 12px;
  line-height: 1.4;
  color: var(--text-color-secondary, #909399);
}

.empty {
  padding: 6px 0 4px 32px;
  font-size: 12px;
  color: var(--text-color-secondary, #909399);
}
</style>
