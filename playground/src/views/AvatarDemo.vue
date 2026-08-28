<script setup lang="ts">
import { UserAvatar } from '@apform-ui/core'
</script>

<template>
  <div>
    <h2>UserAvatar 用户头像</h2>
    <p>支持图片和首字母两种模式。</p>

    <div class="demo-section">
      <div class="demo-title">首字母模式</div>
      <div class="demo-block">
        <div class="demo-row">
          <UserAvatar name="张三" :size="32" />
          <UserAvatar name="李四" :size="40" />
          <UserAvatar name="王五" :size="48" />
          <UserAvatar name="赵六" :size="56" />
        </div>
      </div>
    </div>

    <div class="demo-section">
      <div class="demo-title">方形头像</div>
      <div class="demo-block">
        <div class="demo-row">
          <UserAvatar name="A" :size="40" shape="square" />
          <UserAvatar name="B" :size="40" shape="square" />
          <UserAvatar name="C" :size="40" shape="square" />
        </div>
      </div>
    </div>
  </div>
</template>
