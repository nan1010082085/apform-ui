<script setup>
import { ref } from 'vue'
import { AppDialog } from '@schema-ui/core'

const visible = ref(false)
</script>

<template>
  <div>
    <el-button @click="visible = true">全屏弹框</el-button>
    <AppDialog v-model="visible" title="全屏弹框" width="800px">
      <div style="padding: 20px;">
        <h3>全屏模式</h3>
        <p>点击右上角的全屏按钮可以切换全屏模式。</p>
        <p>全屏模式下弹框会占满整个视口。</p>
      </div>
    </AppDialog>
  </div>
</template>
