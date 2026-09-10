<script setup lang="ts">
/**
 * SessionSidebar — 会话侧栏（纯 props，无 store/路由）
 *
 * 支持业务扩展：#toolbar / #item-meta / #item-actions。
 */
import type { Session } from '../../../types'

defineProps<{
  sessions: Session[]
  activeId?: string | null
  loading?: boolean
  title?: string
  /** 隐藏内置新建按钮（业务自管工具栏） */
  hideCreate?: boolean
  /** 隐藏内置删除按钮（改用 #item-actions） */
  hideDelete?: boolean
  emptyText?: string
}>()

const emit = defineEmits<{
  select: [id: string]
  create: []
  delete: [id: string]
}>()

/**
 * @param iso - ISO 时间
 */
function formatTime(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  const now = new Date()
  const diff = now.getTime() - d.getTime()

  if (diff < 86400000 && d.getDate() === now.getDate()) {
    return d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }

  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  if (
    d.getDate() === yesterday.getDate()
    && d.getMonth() === yesterday.getMonth()
    && d.getFullYear() === yesterday.getFullYear()
  ) {
    return '昨天'
  }

  if (diff < 60_000) return '刚刚'
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)} 分钟前`
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)} 小时前`
  return d.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' })
}
</script>

<template>
  <aside class="apf-session-sidebar" aria-label="会话列表">
    <div class="apf-session-sidebar__head">
      <strong>{{ title || '会话' }}</strong>
      <div class="apf-session-sidebar__head-actions">
        <slot name="toolbar" />
        <el-button v-if="!hideCreate" type="primary" size="small" @click="emit('create')">新建</el-button>
      </div>
    </div>
    <div v-if="$slots['below-head']" class="apf-session-sidebar__below-head">
      <slot name="below-head" />
    </div>
    <div v-loading="loading" class="apf-session-sidebar__list">
      <button
        v-for="s in sessions"
        :key="s.id"
        type="button"
        class="apf-session-sidebar__item"
        :class="{ 'is-active': s.id === activeId }"
        @click="emit('select', s.id)"
      >
        <span class="apf-session-sidebar__item-title">{{ s.title || '未命名会话' }}</span>
        <div class="apf-session-sidebar__item-meta">
          <slot name="item-meta" :session="s">
            <small>{{ formatTime(s.updatedAt || s.createdAt) }}</small>
          </slot>
        </div>
        <div class="apf-session-sidebar__item-actions" @click.stop>
          <slot name="item-actions" :session="s">
            <el-button
              v-if="!hideDelete"
              class="apf-session-sidebar__delete"
              link
              type="danger"
              size="small"
              @click="emit('delete', s.id)"
            >
              删除
            </el-button>
          </slot>
        </div>
      </button>
      <div v-if="!loading && !sessions.length" class="apf-session-sidebar__empty">
        {{ emptyText || '暂无会话' }}
      </div>
    </div>
  </aside>
</template>

<style scoped>
.apf-session-sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: var(--sidebar-width, 240px);
  background: var(--bg-color-white, #fff);
  border-right: 1px solid var(--border-color-light, #ebeef5);
}

.apf-session-sidebar__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm, 8px);
  padding: var(--spacing-12px, 12px) 14px;
  border-bottom: 1px solid var(--border-color-light, #ebeef5);
}

.apf-session-sidebar__head-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm, 8px);
}

.apf-session-sidebar__below-head {
  padding: var(--spacing-sm, 8px) var(--spacing-12px, 12px);
  border-bottom: 1px solid var(--border-color-light, #ebeef5);
}

.apf-session-sidebar__list {
  flex: 1;
  overflow: auto;
  padding: var(--spacing-sm, 8px);
}

.apf-session-sidebar__item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-xs, 4px);
  width: 100%;
  padding: var(--spacing-10px, 10px) var(--spacing-12px, 12px);
  margin-bottom: var(--spacing-xs, 4px);
  border: 0;
  border-radius: var(--border-radius-lg, 10px);
  background: transparent;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;
}

.apf-session-sidebar__item:hover,
.apf-session-sidebar__item.is-active {
  background: var(--bg-color-gray-light, #f5f7fa);
}

.apf-session-sidebar__item-title {
  font-size: var(--font-size-13, 13px);
  font-weight: var(--font-weight-semibold, 600);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  padding-right: 56px;
}

.apf-session-sidebar__item-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm, 8px);
  color: var(--text-color-secondary, #909399);
  font-size: var(--font-size-11, 11px);
}

.apf-session-sidebar__item-actions {
  position: absolute;
  top: var(--spacing-sm, 8px);
  right: 6px;
  display: flex;
  align-items: center;
  gap: 2px;
  opacity: 0;
}

.apf-session-sidebar__item:hover .apf-session-sidebar__item-actions {
  opacity: 1;
}

.apf-session-sidebar__empty {
  padding: var(--spacing-lg, 24px) var(--spacing-12px, 12px);
  text-align: center;
  color: var(--text-color-secondary, #909399);
  font-size: var(--font-size-13, 13px);
}
</style>
