<script setup lang="ts">
/**
 * StatusTag — 状态标签
 *
 * 用于显示审批状态、工作流状态、数据状态等。
 * 基于 el-tag，预设了常用状态的颜色映射。
 *
 * 用法：
 *   <StatusTag status="approved" />
 *   <StatusTag status="pending" :status-map="customMap" />
 */
import { computed } from 'vue'

export interface StatusConfig {
  label: string
  type: 'success' | 'warning' | 'danger' | 'info' | 'primary' | ''
  effect?: 'dark' | 'light' | 'plain'
}

const DEFAULT_STATUS_MAP: Record<string, StatusConfig> = {
  // 审批状态
  pending: { label: '待审批', type: 'warning', effect: 'light' },
  approved: { label: '已通过', type: 'success', effect: 'light' },
  rejected: { label: '已拒绝', type: 'danger', effect: 'light' },
  delegated: { label: '已转签', type: 'info', effect: 'light' },
  commented: { label: '已评论', type: 'info', effect: 'light' },

  // 通用状态
  active: { label: '启用', type: 'success', effect: 'light' },
  inactive: { label: '停用', type: 'danger', effect: 'light' },
  draft: { label: '草稿', type: 'info', effect: 'light' },
  published: { label: '已发布', type: 'success', effect: 'light' },
  archived: { label: '已归档', type: 'info', effect: 'light' },

  // 流程状态
  running: { label: '运行中', type: 'primary', effect: 'light' },
  completed: { label: '已完成', type: 'success', effect: 'light' },
  failed: { label: '失败', type: 'danger', effect: 'light' },
  cancelled: { label: '已取消', type: 'info', effect: 'light' },
  waiting: { label: '等待中', type: 'warning', effect: 'light' },
}

const props = withDefaults(defineProps<{
  /** 状态值 */
  status: string
  /** 自定义状态映射（合并到默认映射） */
  statusMap?: Record<string, StatusConfig>
  /** 是否使用圆角样式（默认 true） */
  round?: boolean
  /** 尺寸 */
  size?: 'large' | 'default' | 'small'
}>(), {
  round: true,
  size: 'default',
})

const config = computed<StatusConfig>(() => {
  const merged = { ...DEFAULT_STATUS_MAP, ...props.statusMap }
  return merged[props.status] ?? { label: props.status, type: 'info', effect: 'light' }
})
</script>

<template>
  <el-tag
    :type="config.type"
    :effect="config.effect ?? 'light'"
    :round="round"
    :size="size"
  >
    {{ config.label }}
  </el-tag>
</template>
