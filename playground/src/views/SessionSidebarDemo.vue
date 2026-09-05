<script setup lang="ts">
/**
 * SessionSidebar 会话侧栏文档示例
 */
import { ref } from 'vue'
import { SessionSidebar, type Session } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

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

/**
 * 新建会话
 */
function onCreate() {
  sessions.value.push({
    id: `s${Date.now()}`,
    title: '新会话',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
}

/**
 * 删除会话
 */
function onDelete(id: string) {
  sessions.value = sessions.value.filter((s) => s.id !== id)
}

const basicSource = `<template>
  <SessionSidebar
    :sessions="sessions"
    :active-id="activeId"
    @select="activeId = $event"
    @create="onCreate"
    @delete="onDelete"
  />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="会话列表、新建与删除。"
      :source="basicSource"
    >
      <div class="frame">
        <SessionSidebar
          :sessions="sessions"
          :active-id="activeId"
          @select="activeId = $event"
          @create="onCreate"
          @delete="onDelete"
        />
      </div>
    </DemoBlock>
  </div>
</template>

<style scoped>
.frame {
  width: 280px;
  height: 420px;
  border: 1px solid #ebedf3;
  border-radius: 4px;
  overflow: hidden;
}
</style>
