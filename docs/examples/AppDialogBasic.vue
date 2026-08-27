<script setup>
import { ref } from 'vue'
import { AppDialog } from '@apform-ui/core'

const visible = ref(false)
</script>

<template>
  <div>
    <el-button type="primary" @click="visible = true">打开弹框</el-button>
    <AppDialog v-model="visible" title="基础弹框">
      <p>这是一个基础弹框，支持拖拽和全屏切换。</p>
    </AppDialog>
  </div>
</template>
