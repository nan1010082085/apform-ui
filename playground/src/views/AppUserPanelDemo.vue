<script setup lang="ts">
/**
 * AppUserPanel 文档示例
 */
import { AppUserPanel } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const user = {
  username: 'alice',
  displayName: 'Alice',
  email: 'alice@example.com',
  tenantId: 'tenant-demo',
}

const basicSource = `<AppUserPanel :user="user" @logout="onLogout" />`
</script>

<template>
  <div>
    <DemoBlock title="基础用法" description="悬停/聚焦展开用户详情，退出由宿主处理。" :source="basicSource">
      <AppUserPanel :user="user" @logout="() => {}" />
    </DemoBlock>
  </div>
</template>
