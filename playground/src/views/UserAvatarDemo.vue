<script setup lang="ts">
/**
 * UserAvatar — 用户头像
 */
import { UserAvatar } from '@apform-ui/core'
</script>

<template>
  <div class="wrap">
    <h2>UserAvatar</h2>
    <p>按名称生成色块头像，或使用图片 URL。</p>

    <div class="block row">
      <UserAvatar name="张三" :size="24" />
      <UserAvatar name="李四" :size="32" />
      <UserAvatar name="王五" :size="40" />
      <UserAvatar name="Alice" :size="48" />
      <UserAvatar name="Bot" src="https://via.placeholder.com/64" :size="40" />
    </div>
  </div>
</template>

<style scoped>
.wrap {
  padding: var(--spacing-md, 16px);
}
.block {
  padding: 16px;
  background: var(--bg-color-white, #fff);
  border: 1px solid var(--border-color-light, #ebedf3);
  border-radius: 4px;
}
.row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
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
