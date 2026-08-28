<script setup lang="ts">
/**
 * ProcessingDrawer — 处理详情抽屉（纯展示 + slot）
 */
import type { RunStatusView } from '../../../types'
import { RunStatusBar } from '../RunStatusBar'

defineProps<{
  /** 是否打开 */
  modelValue: boolean
  /** 运行状态 */
  run?: RunStatusView | null
  /** 标题 */
  title?: string
  /** 副标题（如模型名 / 智能体名） */
  subtitle?: string
  /** 透传 RunStatusBar sending */
  sending?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [boolean]
  cancel: []
}>()
</script>

<template>
  <el-drawer
    :model-value="modelValue"
    :title="title || '处理详情'"
    size="380px"
    append-to-body
    @update:model-value="emit('update:modelValue', $event)"
  >
    <p v-if="subtitle" class="apf-processing-drawer__subtitle">{{ subtitle }}</p>
    <RunStatusBar
      v-if="run"
      :run="run"
      :sending="sending ?? false"
      @cancel="emit('cancel')"
    />
    <div class="apf-processing-drawer__body">
      <slot />
    </div>
  </el-drawer>
</template>

<style scoped>
.apf-processing-drawer__subtitle {
  margin: 0 0 var(--spacing-12px, 12px);
  font-size: var(--font-size-13, 13px);
  color: var(--text-color-secondary, #909399);
}

.apf-processing-drawer__body {
  margin-top: var(--spacing-md, 16px);
}
</style>
