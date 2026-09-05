<script setup lang="ts">
/**
 * UserAvatar 文档示例
 */
import { UserAvatar } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const basicSource = `<template>
  <UserAvatar name="张三" :size="24" />
  <UserAvatar name="李四" :size="32" />
  <UserAvatar name="王五" :size="40" />
  <UserAvatar name="Alice" :size="48" />
</template>`

const imgSource = `<template>
  <UserAvatar name="Bot" src="https://api.dicebear.com/7.x/avataaars/svg?seed=bot" :size="40" />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="按名称生成色块头像，不同尺寸可调。"
      :source="basicSource"
    >
      <div class="row">
        <UserAvatar name="张三" :size="24" />
        <UserAvatar name="李四" :size="32" />
        <UserAvatar name="王五" :size="40" />
        <UserAvatar name="Alice" :size="48" />
      </div>
    </DemoBlock>

    <DemoBlock
      title="图片头像"
      description="传入 src 时优先显示图片，失败时回退到名称色块。"
      :source="imgSource"
    >
      <div class="row">
        <UserAvatar
          name="Bot"
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=bot"
          :size="40"
        />
      </div>
    </DemoBlock>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
