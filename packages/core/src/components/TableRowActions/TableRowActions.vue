<script setup lang="ts">
/**
 * TableRowActions — 表格操作列折叠「更多」
 */
import { computed } from 'vue'
import { AppIcon } from '../AppIcon'

/** 行操作项 */
export interface TableRowAction {
  key: string
  label: string
  /** AppIcon name（仅下拉菜单项） */
  icon?: string
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  loading?: boolean
  onClick: () => void
}

const props = withDefaults(
  defineProps<{
    actions: TableRowAction[]
    /** 达到该数量时折叠 */
    collapseAt?: number
    /** 折叠时直接展示的按钮数 */
    visibleCount?: number
  }>(),
  {
    collapseAt: 5,
    visibleCount: 2,
  },
)

const shouldCollapse = computed(() => props.actions.length >= props.collapseAt)

const visibleActions = computed(() =>
  shouldCollapse.value ? props.actions.slice(0, props.visibleCount) : props.actions,
)

const overflowActions = computed(() =>
  shouldCollapse.value ? props.actions.slice(props.visibleCount) : [],
)

function onCommand(key: string) {
  props.actions.find((a) => a.key === key)?.onClick()
}
</script>

<template>
  <div class="apf-table-row-actions">
    <el-button
      v-for="action in visibleActions"
      :key="action.key"
      link
      :type="action.type ?? 'primary'"
      size="small"
      :loading="action.loading"
      @click="action.onClick"
    >
      {{ action.label }}
    </el-button>

    <el-dropdown v-if="overflowActions.length" trigger="click" @command="onCommand">
      <el-button link type="primary" size="small">
        更多
        <AppIcon name="arrow-down" :size="12" style="margin-left: 2px" />
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="action in overflowActions"
            :key="action.key"
            :command="action.key"
            :style="action.type === 'danger' ? { color: 'var(--el-color-danger)' } : undefined"
          >
            <AppIcon
              v-if="action.icon"
              :name="action.icon"
              :size="14"
              style="margin-right: 6px"
            />
            {{ action.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped>
.apf-table-row-actions {
  display: inline-flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 12px;
  white-space: nowrap;
}
</style>
