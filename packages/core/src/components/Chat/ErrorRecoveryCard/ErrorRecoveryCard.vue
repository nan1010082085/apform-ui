<script setup lang="ts">
/**
 * ErrorRecoveryCard — 错误恢复策略选择卡
 *
 * 纯展示：展示节点错误信息与可选恢复策略，由调用方计算 strategies。
 */
import { AppIcon } from '../../AppIcon'
import type { ErrorRecoveryStrategy } from './types'

defineProps<{
  /** 错误信息 */
  error: string
  /** 节点名称 */
  nodeName: string
  /** 节点类型 */
  nodeType?: string
  /** 可选恢复策略 */
  strategies: ErrorRecoveryStrategy[]
}>()

const emit = defineEmits<{
  select: [strategy: string]
}>()
</script>

<template>
  <div :class="$style.card">
    <div :class="$style.header">
      <AppIcon name="warning-filled" :size="14" :class="$style.headerIcon" />
      <span :class="$style.title">执行错误</span>
    </div>

    <div :class="$style.body">
      <div :class="$style.errorInfo">
        <div :class="$style.nodeInfo">
          <span :class="$style.nodeLabel">节点：</span>
          <span :class="$style.nodeName">{{ nodeName }}</span>
          <el-tag v-if="nodeType" size="small" type="info">{{ nodeType }}</el-tag>
        </div>
        <div :class="$style.errorMessage">
          <AppIcon name="circle-close-filled" :size="14" />
          <span>{{ error }}</span>
        </div>
      </div>

      <div :class="$style.strategies">
        <div :class="$style.strategyLabel">选择恢复策略：</div>
        <div :class="$style.strategyList">
          <button
            v-for="option in strategies"
            :key="option.value"
            :class="[$style.strategyBtn, option.disabled && $style.strategyDisabled]"
            :disabled="option.disabled"
            @click="emit('select', option.value)"
          >
            <AppIcon :name="option.icon" :size="16" />
            <div :class="$style.strategyInfo">
              <span :class="$style.strategyName">{{ option.label }}</span>
              <span :class="$style.strategyDesc">{{ option.description }}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style module>
.card {
  border: 1px solid var(--el-color-danger-light-5, #fab6b6);
  border-radius: 8px;
  overflow: hidden;
}

.header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: var(--el-color-danger-light-9, #fef0f0);
  border-bottom: 1px solid var(--el-color-danger-light-5, #fab6b6);
}

.headerIcon {
  color: var(--el-color-danger, #f56c6c);
}

.title {
  font-size: 12px;
  font-weight: 500;
  color: var(--el-color-danger, #f56c6c);
}

.body {
  padding: 12px;
}

.errorInfo {
  margin-bottom: 12px;
}

.nodeInfo {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
}

.nodeLabel {
  font-size: 12px;
  color: var(--el-text-color-secondary, #909399);
}

.nodeName {
  font-size: 13px;
  font-weight: 500;
  color: var(--el-text-color-primary, #303133);
}

.errorMessage {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  padding: 8px 10px;
  border-radius: 6px;
  background: var(--el-fill-color-light, #f5f7fa);
  color: var(--el-color-danger, #f56c6c);
  font-size: 12px;
  line-height: 1.6;
}

.strategies {
  border-top: 1px solid var(--el-border-color-lighter, #e4e7ed);
  padding-top: 12px;
}

.strategyLabel {
  font-size: 12px;
  color: var(--el-text-color-secondary, #909399);
  margin-bottom: 8px;
}

.strategyList {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.strategyBtn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid var(--el-border-color-lighter, #e4e7ed);
  border-radius: 6px;
  background: var(--el-fill-color-blank, #fff);
  cursor: pointer;
  transition: all 0.15s;
}

.strategyBtn:hover:not(:disabled) {
  border-color: var(--el-color-primary, #409eff);
  background: var(--el-color-primary-light-9, #ecf5ff);
}

.strategyBtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.strategyDisabled {
  opacity: 0.5;
}

.strategyInfo {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.strategyName {
  font-size: 13px;
  font-weight: 500;
  color: var(--el-text-color-primary, #303133);
}

.strategyDesc {
  font-size: 11px;
  color: var(--el-text-color-secondary, #909399);
}
</style>
