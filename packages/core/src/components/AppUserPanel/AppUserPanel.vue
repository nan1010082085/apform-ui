<script setup lang="ts">
/**
 * AppUserPanel — 用户入口面板
 *
 * 默认显示用户名（带头像首字）；hover / focus 弹出详情与退出。
 * 退出由调用方处理。
 */
import { computed } from 'vue'
import { AppIcon } from '../AppIcon'
import type { AppUserPanelUser } from './types'

const props = withDefaults(
  defineProps<{
    /** 当前用户；为空时仍渲染占位触发器 */
    user: AppUserPanelUser | null
    /** 面板弹出方向 */
    placement?: 'bottom' | 'bottom-end' | 'top' | 'top-start'
    /** 侧栏底部时铺满宽度 */
    block?: boolean
    /** 退出按钮文案 */
    logoutLabel?: string
  }>(),
  {
    placement: 'bottom-end',
    block: false,
    logoutLabel: '退出',
  },
)

const emit = defineEmits<{
  logout: []
}>()

const displayName = computed(
  () => props.user?.displayName || props.user?.username || '用户',
)

const initial = computed(() => {
  const name = displayName.value.trim()
  return name ? name.charAt(0).toUpperCase() : '?'
})

const detailRows = computed(() => {
  const u = props.user
  if (!u) return [] as Array<{ label: string; value: string }>
  const rows: Array<{ label: string; value: string }> = [
    { label: '用户名', value: u.username },
  ]
  if (u.email) rows.push({ label: '邮箱', value: u.email })
  if (u.phone) rows.push({ label: '手机', value: u.phone })
  if (u.tenantId) rows.push({ label: '租户', value: u.tenantId })
  return rows
})
</script>

<template>
  <div class="apf-user-panel" :class="{ 'apf-user-panel--block': block }">
    <el-popover
      :placement="placement"
      :trigger="['hover', 'focus']"
      :show-arrow="false"
      :offset="8"
      :show-after="80"
      :hide-after="160"
      :width="260"
      :teleported="true"
    >
      <template #reference>
        <button
          type="button"
          class="apf-user-panel__trigger"
          :class="{ 'apf-user-panel__trigger--block': block }"
          :aria-label="displayName"
        >
          <span class="apf-user-panel__avatar" aria-hidden="true">{{ initial }}</span>
          <span class="apf-user-panel__name">{{ displayName }}</span>
        </button>
      </template>

      <div class="apf-user-panel__body">
        <div class="apf-user-panel__header">
          <span class="apf-user-panel__header-avatar" aria-hidden="true">{{ initial }}</span>
          <div class="apf-user-panel__header-text">
            <div class="apf-user-panel__display">{{ displayName }}</div>
            <div v-if="user?.username" class="apf-user-panel__username">@{{ user.username }}</div>
          </div>
        </div>

        <dl v-if="detailRows.length > 0" class="apf-user-panel__rows">
          <div v-for="row in detailRows" :key="row.label" class="apf-user-panel__row">
            <dt>{{ row.label }}</dt>
            <dd>{{ row.value }}</dd>
          </div>
        </dl>

        <div class="apf-user-panel__divider" />

        <button type="button" class="apf-user-panel__logout" @click="emit('logout')">
          <AppIcon name="switch-button" :size="14" />
          <span>{{ logoutLabel }}</span>
        </button>
      </div>
    </el-popover>
  </div>
</template>

<style scoped>
.apf-user-panel {
  display: inline-flex;
  max-width: 100%;
}
.apf-user-panel--block {
  display: block;
  width: 100%;
}
.apf-user-panel--block :deep(.el-tooltip__trigger) {
  display: block;
  width: 100%;
}
.apf-user-panel__trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  max-width: 180px;
  height: 32px;
  padding: 0 8px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--text-color-regular, #606266);
  font-size: 13px;
  cursor: pointer;
  outline: none;
}
.apf-user-panel__trigger:hover,
.apf-user-panel__trigger:focus-visible {
  background: var(--fill-color-light, #f5f7fa);
}
.apf-user-panel__trigger--block {
  width: 100%;
  max-width: none;
  min-height: 40px;
  padding: 8px 12px;
  justify-content: flex-start;
}
.apf-user-panel__avatar,
.apf-user-panel__header-avatar {
  flex-shrink: 0;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}
.apf-user-panel__avatar {
  width: 24px;
  height: 24px;
  font-size: 11px;
}
.apf-user-panel__header-avatar {
  width: 40px;
  height: 40px;
  font-size: 14px;
}
.apf-user-panel__name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.apf-user-panel__body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 4px 0;
}
.apf-user-panel__header {
  display: flex;
  align-items: center;
  gap: 10px;
}
.apf-user-panel__display {
  font-size: 14px;
  font-weight: 600;
}
.apf-user-panel__username {
  font-size: 12px;
  color: var(--text-color-secondary, #909399);
}
.apf-user-panel__rows {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0;
  padding: 0;
}
.apf-user-panel__row {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 8px;
  font-size: 12px;
}
.apf-user-panel__row dt {
  color: var(--text-color-secondary, #909399);
}
.apf-user-panel__row dd {
  margin: 0;
  word-break: break-all;
}
.apf-user-panel__divider {
  height: 1px;
  background: var(--border-color-lighter, #ebeef5);
}
.apf-user-panel__logout {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--el-color-danger, #f56c6c);
  cursor: pointer;
}
.apf-user-panel__logout:hover {
  background: var(--el-color-danger-light-9, #fef0f0);
}
</style>
