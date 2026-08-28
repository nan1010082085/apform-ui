<script setup lang="ts">
/**
 * SessionSidebar — 会话侧栏（纯 props，无 store/路由）
 */
import type { Session } from '../../types'

defineProps<{
  sessions: Session[]
  activeId?: string | null
  loading?: boolean
  title?: string
}>()

const emit = defineEmits<{
  select: [id: string]
  create: []
  delete: [id: string]
}>()

/** 相对时间 */
function formatTime(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  const diff = (Date.now() - d.getTime()) / 1000
  if (diff < 60) return '刚刚'
  if (diff < 3600) return `${Math.floor(diff / 60)} 分钟前`
  if (diff < 86400) return `${Math.floor(diff / 3600)} 小时前`
  return d.toLocaleDateString('zh-CN')
}
</script>

<template>
  <aside class="apf-session-sidebar" aria-label="会话列表">
    <div class="apf-session-sidebar__head">
      <strong>{{ title || '会话' }}</strong>
      <el-button type="primary" size="small" @click="emit('create')">新建</el-button>
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
        <small>{{ formatTime(s.updatedAt || s.createdAt) }}</small>
        <el-button
          class="apf-session-sidebar__delete"
          link
          type="danger"
          size="small"
          @click.stop="emit('delete', s.id)"
        >
          删除
        </el-button>
      </button>
      <div v-if="!loading && !sessions.length" class="apf-session-sidebar__empty">暂无会话</div>
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
  padding: var(--spacing-12px, 12px) 14px;
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
  padding-right: 36px;
}

.apf-session-sidebar__item small {
  color: var(--text-color-secondary, #909399);
  font-size: var(--font-size-11, 11px);
}

.apf-session-sidebar__delete {
  position: absolute;
  top: var(--spacing-sm, 8px);
  right: 6px;
  opacity: 0;
}

.apf-session-sidebar__item:hover .apf-session-sidebar__delete {
  opacity: 1;
}

.apf-session-sidebar__empty {
  padding: var(--spacing-lg, 24px) var(--spacing-12px, 12px);
  text-align: center;
  color: var(--text-color-secondary, #909399);
  font-size: var(--font-size-13, 13px);
}
</style>
