<script setup lang="ts">
/**
 * VariableDiffCard — 工作流变量变更 diff 卡
 *
 * 以 diff 形式展示变量的新增 / 更新 / 删除。
 */
import { computed } from 'vue'
import { AppIcon } from '../../AppIcon'
import type { VariableDiffChange } from './types'

const props = defineProps<{
  /** 关联节点名称 */
  nodeName?: string
  /** 变更列表 */
  changes: VariableDiffChange[]
}>()

const hasChanges = computed(() => props.changes.length > 0)

/**
 * 格式化展示值
 * @param value - 原始值
 */
function formatValue(value: unknown): string {
  if (value === null || value === undefined) return 'null'
  if (typeof value === 'string') return value
  return JSON.stringify(value, null, 2)
}

/**
 * 变更类型对应的图标与文案
 * @param change - 变更项
 */
function getChangeType(change: { type: string }) {
  switch (change.type) {
    case 'add':
      return { icon: 'plus', color: 'var(--el-color-success, #67c23a)', label: '新增' }
    case 'update':
      return { icon: 'edit', color: 'var(--el-color-primary, #409eff)', label: '更新' }
    case 'delete':
      return { icon: 'delete', color: 'var(--el-color-danger, #f56c6c)', label: '删除' }
    default:
      return { icon: 'info-filled', color: 'var(--el-color-info, #909399)', label: '变更' }
  }
}
</script>

<template>
  <div :class="$style.card">
    <div :class="$style.header">
      <div :class="$style.headerLeft">
        <AppIcon name="data-line" :size="14" :class="$style.headerIcon" />
        <span :class="$style.title">变量变更</span>
      </div>
      <span v-if="nodeName" :class="$style.nodeInfo">
        {{ nodeName }}
      </span>
    </div>

    <div v-if="hasChanges" :class="$style.body">
      <div
        v-for="(change, idx) in changes"
        :key="idx"
        :class="$style.change"
      >
        <div :class="$style.changeHeader">
          <div :class="$style.changeType">
            <AppIcon
              :name="getChangeType(change).icon"
              :size="12"
              :style="{ color: getChangeType(change).color }"
            />
            <span :style="{ color: getChangeType(change).color }">
              {{ getChangeType(change).label }}
            </span>
          </div>
          <span :class="$style.varName">{{ change.name }}</span>
        </div>

        <div v-if="change.type === 'update'" :class="$style.diff">
          <div :class="$style.diffOld">
            <span :class="$style.diffLabel">旧值</span>
            <pre :class="$style.diffValue">{{ formatValue(change.oldValue) }}</pre>
          </div>
          <div :class="$style.diffNew">
            <span :class="$style.diffLabel">新值</span>
            <pre :class="$style.diffValue">{{ formatValue(change.newValue) }}</pre>
          </div>
        </div>
        <div v-else-if="change.type === 'add'" :class="$style.singleValue">
          <span :class="$style.diffLabel">值</span>
          <pre :class="$style.diffValue">{{ formatValue(change.newValue) }}</pre>
        </div>
      </div>
    </div>

    <div v-else :class="$style.empty">
      暂无变量变更
    </div>
  </div>
</template>

<style module>
.card {
  border: 1px solid var(--el-border-color-lighter, #e4e7ed);
  border-radius: 8px;
  overflow: hidden;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--el-fill-color-light, #f5f7fa);
  border-bottom: 1px solid var(--el-border-color-lighter, #e4e7ed);
}

.headerLeft {
  display: flex;
  align-items: center;
  gap: 6px;
}

.headerIcon {
  color: var(--el-color-primary, #409eff);
}

.title {
  font-size: 12px;
  font-weight: 500;
  color: var(--el-text-color-primary, #303133);
}

.nodeInfo {
  font-size: 11px;
  color: var(--el-text-color-secondary, #909399);
}

.body {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.change {
  border: 1px solid var(--el-border-color-lighter, #e4e7ed);
  border-radius: 6px;
  overflow: hidden;
}

.changeHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  background: var(--el-fill-color-lighter, #fafafa);
}

.changeType {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 500;
}

.varName {
  font-size: 12px;
  font-weight: 500;
  color: var(--el-text-color-primary, #303133);
}

.diff {
  display: flex;
  flex-direction: column;
}

.diffOld {
  padding: 8px 10px;
  background: var(--el-color-danger-light-9, #fef0f0);
  border-bottom: 1px solid var(--el-border-color-lighter, #e4e7ed);
}

.diffNew {
  padding: 8px 10px;
  background: var(--el-color-success-light-9, #f0f9eb);
}

.singleValue {
  padding: 8px 10px;
}

.diffLabel {
  font-size: 11px;
  color: var(--el-text-color-secondary, #909399);
  display: block;
  margin-bottom: 4px;
}

.diffValue {
  font-size: 12px;
  color: var(--el-text-color-primary, #303133);
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
}

.empty {
  padding: 16px;
  text-align: center;
  font-size: 12px;
  color: var(--el-text-color-secondary, #909399);
}
</style>
