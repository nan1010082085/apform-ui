<script setup lang="ts">
/**
 * AppIcon 文档示例 — 使用 iconRegistry 已注册名称
 */
import { APP_ICON_NAMES, AppIcon } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const basics = ['home-filled', 'search', 'setting', 'user', 'bell', 'star'] as const
const showcase = APP_ICON_NAMES.slice(0, 24)

const basicSource = `<template>
  <AppIcon name="home-filled" />
  <AppIcon name="search" />
  <AppIcon name="setting" />
  <AppIcon name="user" />
  <AppIcon name="bell" />
  <AppIcon name="star" />
</template>

<script setup lang="ts">
import { AppIcon } from '@apform-ui/core'
<\/script>`

const sizeSource = `<template>
  <AppIcon name="home-filled" :size="12" />
  <AppIcon name="home-filled" :size="16" />
  <AppIcon name="home-filled" :size="20" />
  <AppIcon name="home-filled" :size="24" />
  <AppIcon name="home-filled" :size="32" />
</template>`

const colorSource = `<template>
  <AppIcon name="home-filled" color="#0060A2" />
  <AppIcon name="home-filled" color="#67c23a" />
  <AppIcon name="home-filled" color="#e6a23c" />
  <AppIcon name="home-filled" color="#f56c6c" />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="name 必须是 iconRegistry 已注册的 kebab-case 名称，禁止使用 ep: 前缀或未注册名。"
      :source="basicSource"
    >
      <div class="row">
        <div v-for="name in basics" :key="name" class="cell">
          <AppIcon :name="name" :size="22" />
          <code>{{ name }}</code>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock title="不同尺寸" description="通过 size 设置像素大小。" :source="sizeSource">
      <div class="row align">
        <AppIcon name="home-filled" :size="12" />
        <AppIcon name="home-filled" :size="16" />
        <AppIcon name="home-filled" :size="20" />
        <AppIcon name="home-filled" :size="24" />
        <AppIcon name="home-filled" :size="32" />
      </div>
    </DemoBlock>

    <DemoBlock title="不同颜色" description="通过 color 设置图标颜色。" :source="colorSource">
      <div class="row align">
        <AppIcon name="home-filled" :size="22" color="#0060A2" />
        <AppIcon name="home-filled" :size="22" color="#67c23a" />
        <AppIcon name="home-filled" :size="22" color="#e6a23c" />
        <AppIcon name="home-filled" :size="22" color="#f56c6c" />
      </div>
    </DemoBlock>

    <DemoBlock
      title="已注册图标（节选）"
      description="完整清单见 @apform-ui/core 的 APP_ICON_NAMES。"
    >
      <div class="row">
        <div v-for="name in showcase" :key="name" class="cell">
          <AppIcon :name="name" :size="20" color="#303133" />
          <code>{{ name }}</code>
        </div>
      </div>
    </DemoBlock>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 20px;
}

.row.align {
  align-items: center;
}

.cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 72px;
}

.cell code {
  font-size: 11px;
  color: #909399;
}
</style>
