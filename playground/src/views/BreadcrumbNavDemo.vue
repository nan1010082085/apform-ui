<script setup lang="ts">
/**
 * BreadcrumbNav 面包屑导航文档示例
 */
import { ref } from 'vue'
import { BreadcrumbNav, type BreadcrumbNavItem } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const items: BreadcrumbNavItem[] = [
  { label: '首页', to: '/' },
  { label: '项目管理', to: '/projects' },
  { label: '详情' },
]

const lastNav = ref('')

/**
 * 导航事件处理
 */
function onNavigate(to: string) {
  lastNav.value = to
}

const basicSource = `<template>
  <BreadcrumbNav :items="items" @navigate="onNavigate" />
</template>

<script setup lang="ts">
import { BreadcrumbNav } from '@apform-ui/core'
const items = [
  { label: '首页', to: '/' },
  { label: '项目管理', to: '/projects' },
  { label: '详情' },
]
<\/script>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="props 驱动面包屑，通过 @navigate 处理跳转（不绑定 vue-router）。"
      :source="basicSource"
    >
      <BreadcrumbNav :items="items" @navigate="onNavigate" />
      <p v-if="lastNav" class="hint">最近导航: {{ lastNav }}</p>
    </DemoBlock>
  </div>
</template>

<style scoped>
.hint {
  margin: 12px 0 0;
  color: #606266;
  font-size: 13px;
}
</style>
