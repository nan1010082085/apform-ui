<script setup>
import { UserAvatar } from '@schema-ui/core'
</script>

<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <UserAvatar name="张三" :size="32" />
    <UserAvatar name="李四" :size="40" />
    <UserAvatar name="王五" :size="48" />
    <UserAvatar name="Admin" :size="48" shape="square" />
  </div>
</template>
