<script setup lang="ts">
/**
 * SessionSidebar — 会话侧栏
 */
import { ref } from 'vue'
import { SessionSidebar, type Session } from '@apform-ui/core'

const activeId = ref('s1')
const sessions = ref<Session[]>([
  {
    id: 's1',
    title: 'Schema 生成',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 's2',
    title: '表单校验讨论',
    status: 'active',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 1800000).toISOString(),
  },
])
</script>

<template>
  <div class="wrap">
    <h2>SessionSidebar</h2>
    <p>会话列表、新建与删除。</p>
    <div class="frame">
      <SessionSidebar
        :sessions="sessions"
        :active-id="activeId"
        @select="activeId = $event"
        @create="
          sessions.push({
            id: `s${Date.now()}`,
            title: '新会话',
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
        "
        @delete="sessions = sessions.filter((s) => s.id !== $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.wrap {
  padding: var(--spacing-md, 16px);
}
.frame {
  width: 280px;
  height: 420px;
  border: 1px solid var(--border-color-light, #ebedf3);
  border-radius: 4px;
  overflow: hidden;
  background: var(--bg-color-white, #fff);
}
h2 {
  margin: 0 0 4px;
}
p {
  margin: 0 0 16px;
  color: var(--text-color-secondary, #666);
  font-size: 13px;
}
</style>
